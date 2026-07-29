const Application = require("../models/Application");
const Notification = require("../models/Notification");
const ReferralPost = require("../models/ReferralPost");
const User = require("../models/User");
// Apply for a referral post
const applyToPost = async (req, res) => {
  try {

    const existing =
await Application.findOne({
  referralPost: req.params.postId,
  applicant: req.user.id,
});

if (existing) {
  return res.status(400).json({
    success: false,
    message: "Already applied",
  });
}

   const application = await Application.create({
  referralPost: req.params.postId,
  applicant: req.user.id,
});

const post = await ReferralPost.findById(req.params.postId);
const applicant = await User.findById(req.user.id);

await Notification.create({
  recipient: post.postedBy,
  message: `${applicant.name} applied for your referral "${post.title}"`,
  type: "APPLICATION",
});

res.status(201).json({
  success: true,
  application,
});
  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get my applications
const getMyApplications = async (req, res) => {
  try {

    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("referralPost");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const getApplicantsForPost = async (req, res) => {
  try {

    const applications = await Application.find({
      referralPost: req.params.postId
    })
    .populate("applicant", "name email company role skills resumeUrl")
    .populate("referralPost");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const updateApplicationStatus = async (req, res) => {
  try {

    const application =
      await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    application.status = req.body.status;

    await application.save();

    const post = await ReferralPost.findById(application.referralPost);

await Notification.create({
  recipient: application.applicant,
  message:
    application.status === "Accepted"
      ? `Congratulations! Your application for "${post.title}" has been accepted.`
      : `Your application for "${post.title}" has been rejected.`,
  type:
    application.status === "Accepted"
      ? "ACCEPTED"
      : "REJECTED",
});
    res.status(200).json({
      success: true,
      application
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  applyToPost,
  getMyApplications,
  getApplicantsForPost,
  updateApplicationStatus,
};