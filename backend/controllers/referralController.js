const Referral = require("../models/Referral");
const Notification = require("../models/Notification");

const createReferral = async (req, res) => {
  try {
    const { referrer, company, jobRole, jobLink } = req.body;

    const referral = await Referral.create({
  requester: req.user.id,
  referrer,
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


const getReceivedReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find({
      referrer: req.user.id,
    }).populate("requester", "name username email");

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

const updateReferralStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Accepted or Rejected",
      });
    }

    const referral = await Referral.findById(req.params.id);

    if (!referral) {
      return res.status(404).json({
        success: false,
        message: "Referral not found",
      });
    }

    if (referral.referrer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this referral",
      });
    }

    if (referral.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Referral has already been processed",
      });
    }

    referral.status = status;

    await referral.save();

    const notificationMessage =
      status === "Accepted"
        ? `Your referral request for ${referral.company} has been accepted.`
        : `Your referral request for ${referral.company} has been rejected.`;

    await Notification.create({
      recipient: referral.requester,
      message: notificationMessage,
      type: status === "Accepted" ? "ACCEPTED" : "REJECTED",
      isRead: false,
    });

    res.status(200).json({
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

module.exports = {
  createReferral,
  getMyReferrals,
  getReceivedReferrals,
  updateReferralStatus,
};