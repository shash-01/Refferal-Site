const { getRabbitChannel } = require("../config/rabbitmq");

const REFERRAL_EXCHANGE = "referral_events";

const publishReferralCreated = async (post) => {
  try {
    const channel = getRabbitChannel();

    await channel.assertExchange(REFERRAL_EXCHANGE, "topic", {
      durable: true,
    });

    const message = {
      event: "referral.created",
      data: {
        postId: post._id.toString(),
        title: post.title,
        company: post.company,
        jobRole: post.jobRole,
        postedBy: post.postedBy.toString(),
      },
      timestamp: new Date().toISOString(),
    };

    channel.publish(
      REFERRAL_EXCHANGE,
      "referral.created",
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      }
    );

    console.log("RabbitMQ event published: referral.created");
  } catch (error) {
    console.error(
      "Failed to publish referral.created:",
      error.message
    );
  }
};

module.exports = {
  publishReferralCreated,
};