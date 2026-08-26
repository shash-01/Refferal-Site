const { redisClient } = require("../config/redis");

const rateLimit = async (req, res, next) => {
  try {
    const ip = req.ip.replace("::ffff:", "");

    const key = `rate_limit:${ip}`;

    const requests = await redisClient.incr(key);

    if (requests === 1) {
      await redisClient.expire(key, 60);
    }

    if (requests > 100) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);

    // Redis failure should not bring down the API
    next();
  }
};

module.exports = rateLimit;