const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");


const {
  getProfile,
  updateProfile,
  addExperience,
  addEducation,
  uploadResume,
  getPublicProfile,
  searchUsers,
  uploadProfilePicture 
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

router.post("/experience", authMiddleware, addExperience);

router.post("/education", authMiddleware, addEducation);

router.post(
  "/resume",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

router.get("/search", searchUsers);

router.get(
  "/profile/:username",
  getPublicProfile
);


router.post(
  "/profile-picture",
  authMiddleware,
  upload.single("image"),
  uploadProfilePicture
);


module.exports = router;