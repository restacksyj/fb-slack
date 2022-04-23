const apis = require("./apis");

exports.showDatePicker = async (say) => {
    const currentDate = new Date();
  const blockData = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Pick a date",
        },
        accessory: {
          type: "datepicker",
          initial_date: `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`,//"1990-04-28",
          placeholder: {
            type: "plain_text",
            text: "Select a date",
            emoji: true,
          },
          action_id: "date_selected",
        },
      },
    ],
    text: `Available Start Date`,
  };

  await say(blockData);
};
