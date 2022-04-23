const apis = require("./apis");

exports.showAvailableStartTime = async (say) => {
    const currentDate = new Date();
  const blockData = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Start Time",
        },
        accessory: {
          type: "timepicker",
          initial_time: "12:00",
          placeholder: {
            type: "plain_text",
            text: "Select time",
            emoji: true,
          },
          action_id: "start_selected",
        },
      },
    ],
    text: `Available Start Times`,
  };

  await say(blockData);
};
