const mongoose = require("mongoose");

const referralPostSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  jobRole: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model(
  "ReferralPost",
  referralPostSchema
);