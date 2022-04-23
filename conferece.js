const apis = require("./apis");

exports.showConferenceRooms = async (say) => {
  //get data
  const resp = await apis.getConferences();
  let roomOptions = [];
  resp.map((cr) => {
    roomOptions.push({
      text: {
        type: "plain_text",
        text: `Room No ${cr.roomNumber}, Floor ${cr.floorNumber}, Building ${cr.buildingName}, City ${cr.city}`,
        emoji: true,
      },
      value: cr._id,
    });
  });

  const blockData = {
    blocks: [
      {
        type: "section",
        block_id: "crSection",
        text: {
          type: "mrkdwn",
          text: "Pick a Conference Room you want book",
        },
        accessory: {
          action_id: "cr_selected",
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select an Conference Room",
          },
          options: roomOptions,
        },
      },
    ],
    text: `Available Conference Rooms`,
  };

  await say(blockData);

}
