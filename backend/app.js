const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const referralRoutes = require("./routes/referralRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const referralPostRoutes = require("./routes/referralPostRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const rateLimit = require("./middleware/rateLimitMiddleware");
const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimit);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/referrals", referralRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use(
  "/api/applications",
  applicationRoutes
);

app.use(
  "/api/referral-posts",
  referralPostRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

module.exports = app;