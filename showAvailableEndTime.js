const apis = require("./apis");

exports.showAvailableEndTime = async (say) => {
  //get data
  const resp = await apis.getConferences();
  let roomOptions = [];
  resp.map((cr) => {
    roomOptions.push({
      text: {
        type: "plain_text",
        text: `time here`,
        emoji: true,
      },
      value: cr._id,
    });
  });

  const currentDate = new Date();
  const blockData = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "End Time",
        },
        accessory: {
          type: "timepicker",
          initial_time: "12:00",
          placeholder: {
            type: "plain_text",
            text: "Select End time",
            emoji: true,
          },
          action_id: "end_selected",
        },
      },
    ],
    text: `Available End Time`,
  };

  await say(blockData);

}
