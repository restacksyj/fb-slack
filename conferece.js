const apis = require("./apis");

exports.showConferenceRooms = async (client, body) => {
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

  //duration

  let conference_view = {
    type: "modal",
    title: {
      type: "plain_text",
      text: "FB- Conference Rooms",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Select the conference room",
        },
        accessory: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select room",
            emoji: true,
          },
          options: roomOptions,
          action_id: "static_select-action",
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "From",
        },
        accessory: {
          type: "datepicker",
          initial_date: new Date().toISOString,
          placeholder: {
            type: "plain_text",
            text: "Select a date",
            emoji: true,
          },
          action_id: "datepicker-action",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Section start time",
        },
        accessory: {
          type: "timepicker",
          initial_time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          placeholder: {
            type: "plain_text",
            text: "Select time",
            emoji: true,
          },
          action_id: "timepicker-action",
        },
      },
      {
        type: "input",
        element: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select the duration",
            emoji: true,
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "30 minutes",
                emoji: true,
              },
              value: "30m",
            },
            {
              text: {
                type: "plain_text",
                text: "60 minutes",
                emoji: true,
              },
              value: "60m",
            },
            {
              text: {
                type: "plain_text",
                text: "90 minutes",
                emoji: true,
              },
              value: "90m",
            },
            {
              text: {
                type: "plain_text",
                text: "120 minutes",
                emoji: true,
              },
              value: "120m",
            },
          ],
          action_id: "static_select-action",
        },
        label: {
          type: "plain_text",
          text: "Duration",
          emoji: true,
        },
      },
    ],
  };

  const result = await client.views.open({
    // Pass a valid trigger_id within 3 seconds of receiving it
    trigger_id: body.trigger_id,
    // View payload
    view: conference_view,
  });
};
