const ReferralPost =
require("../models/ReferralPost");

const createReferralPost = async (req, res) => {
  try {

    const post = await ReferralPost.create({
      ...req.body,
      postedBy: req.user.id,
    });

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

    const posts =
      await ReferralPost.find()
      .populate("postedBy", "name company");

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
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