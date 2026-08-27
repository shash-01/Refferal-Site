const amqp = require("amqplib");

let connection = null;
let channel = null;

const connectRabbitMQ = async () => {
  try {
    console.log("RabbitMQ connecting...");

    connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://localhost:5672"
    );

    channel = await connection.createChannel();

    console.log("RabbitMQ connected and ready");

    connection.on("error", (error) => {
      console.error(
        "RabbitMQ connection error:",
        error.message
      );
    });

    connection.on("close", async () => {
      console.log("RabbitMQ connection closed");

      connection = null;
      channel = null;
    });

    channel.on("error", (error) => {
      console.error(
        "RabbitMQ channel error:",
        error.message
      );
    });

    channel.on("close", () => {
      console.log("RabbitMQ channel closed");
      channel = null;
    });

    return channel;
  } catch (error) {
    console.error(
      "RabbitMQ connection failed:",
      error.message
    );

    connection = null;
    channel = null;

    throw error;
  }
};

const getRabbitChannel = () => {
  if (!channel) {
    throw new Error(
      "RabbitMQ channel is not initialized or has been closed"
    );
  }

  return channel;
};

module.exports = {
  connectRabbitMQ,
  getRabbitChannel,
};