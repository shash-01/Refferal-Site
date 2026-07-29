const Referral = require("../models/Referral");

const createReferral = async (req, res) => {
  try {
    const { company, jobRole, jobLink } = req.body;

    const referral = await Referral.create({
      requester: req.user.id,
      company,
      jobRole,
      jobLink,
    });

    res.status(201).json({
      success: true,
      referral,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMyReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find({
      requester: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: referrals.length,
      referrals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createReferral,
  getMyReferrals,
};