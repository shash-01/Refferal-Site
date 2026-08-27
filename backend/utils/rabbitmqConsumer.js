const { getRabbitChannel } = require("../config/rabbitmq");
const User = require("../models/User");
const Notification = require("../models/Notification");

const REFERRAL_EXCHANGE = "referral_events";
const REFERRAL_QUEUE = "referral_notifications";

const startReferralConsumer = async () => {
  try {
    const channel = getRabbitChannel();

    await channel.assertExchange(REFERRAL_EXCHANGE, "topic", {
      durable: true,
    });

    await channel.assertQueue(REFERRAL_QUEUE, {
      durable: true,
    });

    await channel.bindQueue(
      REFERRAL_QUEUE,
      REFERRAL_EXCHANGE,
      "referral.created"
    );

    console.log(
      `RabbitMQ consumer listening on queue: ${REFERRAL_QUEUE}`
    );

    await channel.consume(REFERRAL_QUEUE, async (message) => {
      if (!message) {
        return;
      }

      try {
        const event = JSON.parse(message.content.toString());

        console.log("RabbitMQ event received:");
        console.log(event);

        if (event.event === "referral.created") {
          const { postId, title, company, jobRole, postedBy } =
            event.data;

          console.log(
            `Processing new referral: ${title}`
          );

          // Find all users except the person who created the referral
          const users = await User.find({
            _id: { $ne: postedBy },
          }).select("_id");

          // Create a notification for each user
          const notifications = users.map((user) => ({
            recipient: user._id,
            message: `New referral available: ${title} at ${company}`,
            type: "REFERRAL",
            isRead: false,
          }));

          if (notifications.length > 0) {
            await Notification.insertMany(notifications);
          }

          console.log(
            `Created ${notifications.length} referral notification(s)`
          );
        }

        // Tell RabbitMQ the message was successfully processed
        channel.ack(message);
      } catch (error) {
        console.error(
          "Error processing RabbitMQ message:",
          error.message
        );

        // Reject the message without requeueing
        channel.nack(message, false, false);
      }
    });
  } catch (error) {
    console.error(
      "Failed to start RabbitMQ consumer:",
      error.message
    );

    throw error;
  }
};

module.exports = {
  startReferralConsumer,
};