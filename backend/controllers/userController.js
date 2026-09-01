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
    const {
      name,
      company,
      role,
      skills,
      bio,
      linkedinUrl,
      githubUrl,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        company,
        role,
        skills,
        bio,
        linkedinUrl,
        githubUrl,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

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
// ==================== SEARCH USERS ====================

const searchUsers = async (req, res) => {
  try {
    const {
      name,
      company,
      role,
      skill,
    } = req.query;

    const filter = {};


    // ==================== SEARCH BY NAME ====================

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      };
    }


    // ==================== SEARCH BY COMPANY ====================

    if (company) {
      filter.company = company;
    }


    // ==================== SEARCH BY ROLE ====================

    if (role) {
      filter.role = role;
    }


    // ==================== SEARCH BY SKILL ====================

    if (skill) {
      filter.skills = {
        $elemMatch: {
          $regex: skill,
          $options: "i",
        },
      };
    }


    // ==================== FIND USERS ====================

    const users = await User.find(filter)
      .select("-password");


    // ==================== RESPONSE ====================

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

const getSkillMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).select("skills");

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!currentUser.skills || currentUser.skills.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        matches: [],
        message: "Add skills to your profile to get matches",
      });
    }

    const currentSkills = currentUser.skills.map((skill) =>
      skill.toLowerCase().trim()
    );

    const users = await User.find({
      _id: { $ne: req.user.id },
      skills: { $exists: true, $ne: [] },
    }).select(
      "name username company role skills profilePicture bio"
    );

    const matches = users
      .map((user) => {
        const matchingSkills = user.skills.filter((skill) =>
          currentSkills.includes(skill.toLowerCase().trim())
        );

        const matchScore = Math.round(
          (matchingSkills.length / currentSkills.length) * 100
        );

        return {
          user,
          matchingSkills,
          matchScore,
        };
      })
      .filter((match) => match.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      count: matches.length,
      matches,
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
  getSkillMatches,
  uploadProfilePicture,
};