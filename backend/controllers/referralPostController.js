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
    // Check Redis first
    const cachedPosts = await redisClient.get(
      REFERRAL_POSTS_CACHE_KEY
    );

    if (cachedPosts) {
      console.log("Referral posts served from Redis");

      const posts = JSON.parse(cachedPosts);

      return res.status(200).json({
        success: true,
        count: posts.length,
        posts,
        source: "redis",
      });
    }

    // Cache miss → MongoDB
    console.log("Referral posts served from MongoDB");

    const posts = await ReferralPost.find()
      .populate("postedBy", "name company");

    // Cache for 60 seconds
    await redisClient.setEx(
      REFERRAL_POSTS_CACHE_KEY,
      60,
      JSON.stringify(posts)
    );

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
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