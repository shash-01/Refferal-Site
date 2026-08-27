require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");
const { connectRabbitMQ } = require("./config/rabbitmq");
const {
  startReferralConsumer,
} = require("./utils/rabbitmqConsumer");

const startServer = async () => {
  try {
    await connectDB();

    await connectRedis();

    await connectRabbitMQ();

    await startReferralConsumer();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();