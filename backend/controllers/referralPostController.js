const ReferralPost = require("../models/ReferralPost");
const { redisClient } = require("../config/redis");
const {
  publishReferralCreated,
} = require("../utils/rabbitmqProducer");

const REFERRAL_POSTS_CACHE_KEY = "referral_posts";

const createReferralPost = async (req, res) => {
  try {
    const post = await ReferralPost.create({
      ...req.body,
      postedBy: req.user.id,
    });
    await publishReferralCreated(post);
    // Clear cached referral posts
    await redisClient.del(REFERRAL_POSTS_CACHE_KEY);

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReferralPosts = async (req, res) => {
  try {
    const {
      company,
      jobRole,
      page = 1,
      limit = 10,
    } = req.query;

    const pageNumber = Math.max(parseInt(page), 1);
    const limitNumber = Math.min(Math.max(parseInt(limit), 1), 50);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = {};

    if (company) {
      filter.company = {
        $regex: company,
        $options: "i",
      };
    }

    if (jobRole) {
      filter.jobRole = {
        $regex: jobRole,
        $options: "i",
      };
    }

    const cacheKey = `referral_posts:${company || "all"}:${jobRole || "all"}:${pageNumber}:${limitNumber}`;

    // Check Redis first
    const cachedPosts = await redisClient.get(cacheKey);

    if (cachedPosts) {
      console.log("Referral posts served from Redis");

      const cachedData = JSON.parse(cachedPosts);

      return res.status(200).json({
        success: true,
        ...cachedData,
        source: "redis",
      });
    }

    console.log("Referral posts served from MongoDB");

    const [posts, total] = await Promise.all([
      ReferralPost.find(filter)
        .populate("postedBy", "name company")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),

      ReferralPost.countDocuments(filter),
    ]);

    const responseData = {
      count: posts.length,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      posts,
    };

    // Cache for 60 seconds
    await redisClient.setEx(
      cacheKey,
      60,
      JSON.stringify(responseData)
    );

    res.status(200).json({
      success: true,
      ...responseData,
      source: "mongodb",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReferralPost,
  getReferralPosts,
};