const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, company, role, skills, bio, linkedinUrl, githubUrl,} = req.body;


    user.company = company || user.company;
    user.role = role || user.role;
    user.skills = skills || user.skills;
    user.bio = bio || user.bio;
    user.linkedinUrl = linkedinUrl || user.linkedinUrl;
    user.githubUrl = githubUrl || user.githubUrl;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        company,
        role,
        skills,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addExperience = async (req, res) => {
  try {
    const { company, role, duration } = req.body;

    const user = await User.findById(req.user.id);

    user.experience.push({
      company,
      role,
      duration,
    });

    await user.save();

    res.status(200).json({
      success: true,
      experience: user.experience,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addEducation = async (req, res) => {
  try {
    const { college, degree, year } = req.body;

    const user = await User.findById(req.user.id);

    user.education.push({
      college,
      degree,
      year,
    });

    await user.save();

    res.status(200).json({
      success: true,
      education: user.education,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// -----------uploadResume---------
const uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const fileString =
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(
      fileString,
      {
        resource_type: "raw",
        folder: "resumes",
      }
    );

    const user = await User.findById(req.user.id);
    user.resume = result.secure_url;
    await user.save();

    user.resumeUrl = result.secure_url;

    await user.save();

    res.status(200).json({
      success: true,
      resumeUrl: result.secure_url,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

//------------------- Public Profile Page --------------------
const getPublicProfile = async (req, res) => {
  try {

    const user = await User.findOne({
      username: req.params.username,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//-------------------- Search Users -------------------------
const searchUsers = async (req, res) => {
  try {

    const {
      name,
      company,
      role,
      skill,
    } = req.query;

    const filter = {};

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      };
    }

    if (company) {
      filter.company = company;
    }

    if (role) {
      filter.role = role;
    }

    if (skill) {
      filter.skills = {
        $in: [skill],
      };
    }

    const users = await User.find(filter)
      .select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {

    const fileString =
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result =
      await cloudinary.uploader.upload(
        fileString,
        {
          folder: "profile-pictures"
        }
      );

    const user =
      await User.findById(req.user.id);

    user.profilePicture =
      result.secure_url;

    await user.save();

    res.status(200).json({
      success: true,
      profilePicture:
        result.secure_url
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
module.exports = {
  getProfile,
  updateProfile,
  addExperience,
  addEducation,
  uploadResume,
  getPublicProfile,
  searchUsers,
  uploadProfilePicture,
};