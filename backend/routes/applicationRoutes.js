const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  applyToPost,
  getMyApplications,
  getApplicantsForPost,
  updateApplicationStatus
} = require("../controllers/applicationController");

router.post(
  "/:postId",
  protect,
  applyToPost
);

router.get(
  "/my",
  protect,
  getMyApplications
);

router.get(
  "/post/:postId",
  protect,
  getApplicantsForPost
);

router.put(
  "/:id/status",
  protect,
  updateApplicationStatus
);
module.exports = router;