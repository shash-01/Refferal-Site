const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createReferral,
  getMyReferrals,
} = require("../controllers/referralController");

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