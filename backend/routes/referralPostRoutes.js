const express = require("express");
const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {
  createReferralPost,
  getReferralPosts,
} = require(
  "../controllers/referralPostController"
);

router.post(
  "/",
  protect,
  createReferralPost
);

router.get(
  "/",
  getReferralPosts
);

module.exports = router;