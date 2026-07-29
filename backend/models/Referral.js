const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
{
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  jobLink: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Referral", referralSchema);