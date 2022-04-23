const app = require("./app");

exports.showFacilities = async (say) => {
  const blockData = {
    blocks: [
      {
        type: "section",
        block_id: "facilitiesSection",
        text: {
          type: "mrkdwn",
          text: "Pick a Facility you need help with",
        },
        accessory: {
          action_id: "facility_selected",
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select an facility",
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "Conference Room Info And Booking",
              },
              value: "crops",
            },
            {
              text: {
                type: "plain_text",
                text: "Table Tennis",
              },
              value: "ttops",
            },
            {
              text: {
                type: "plain_text",
                text: "Cafeteria",
              },
              value: "cafeops",
            },
          ],
        },
      },
    ],
    text: `Available Facilities`,
  };

  await say(blockData);
};

