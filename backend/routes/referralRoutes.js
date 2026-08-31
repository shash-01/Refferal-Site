const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createReferral,
  getMyReferrals,
  getReceivedReferrals,
  updateReferralStatus,
} = require("../controllers/referralController");

router.put(
  "/:id/status",
  authMiddleware,
  updateReferralStatus
);

router.get(
  "/received",
  authMiddleware,
  getReceivedReferrals
);

router.post(
  "/",
  authMiddleware,
  createReferral
);

router.get(
  "/my",
  authMiddleware,
  getMyReferrals
);

module.exports = router;