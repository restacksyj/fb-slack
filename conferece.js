const apis = require("./apis");

exports.showConferenceRooms = async (client, body) => {
  //get data
  const resp = await apis.getConferences();
  let roomOptions = [];
  console.log("resp ", resp);
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

//   let conference_view = {
//     type: "modal",
//     callback_id: "subview",
//     notify_on_close: true,
//     title: {
//       type: "plain_text",
//       text: "FB - Conference Rooms",
//       emoji: true,
//     },
//     submit: {
//       type: "plain_text",
//       text: "Submit",
//       emoji: true,
//     },
//     close: {
//       type: "plain_text",
//       text: "Cancel",
//       emoji: true,
//     },
//     blocks: [
//       {
//         type: "section",
//         text: {
//           type: "mrkdwn",
//           text: "Select the conference room",
//         },
//         accessory: {
//           type: "static_select",
//           placeholder: {
//             type: "plain_text",
//             text: "Select room",
//             emoji: true,
//           },
//           options: roomOptions,
//           action_id: "conferenceroom-action",
//         },
//       },
//       {
//         type: "divider",
//       },
//       {
//         type: "section",
//         text: {
//           type: "mrkdwn",
//           text: "From",
//         },
//         accessory: {
//           type: "datepicker",
//           initial_date: new Date().toISOString,
//           placeholder: {
//             type: "plain_text",
//             text: "Select a date",
//             emoji: true,
//           },
//           action_id: "datepicker-action",
//         },
//       },
//       {
//         type: "section",
//         text: {
//           type: "mrkdwn",
//           text: "Start time",
//         },
//         accessory: {
//           type: "timepicker",
//           initial_time: `12:00`,
//           placeholder: {
//             type: "plain_text",
//             text: "Select time",
//             emoji: true,
//           },
//           action_id: "starttimepicker-action",
//         },
//       },
//       {
//         type: "section",
//         text: {
//           type: "mrkdwn",
//           text: "End time",
//         },
//         accessory: {
//           type: "timepicker",
//           initial_time: `12:30`,
//           placeholder: {
//             type: "plain_text",
//             text: "Select End time",
//             emoji: true,
//           },
//           action_id: "endtimepicker-action",
//         },
//       },
//     ],
//   };

//   const result = await client.views.open({
//     // Pass a valid trigger_id within 3 seconds of receiving it
//     trigger_id: body.trigger_id,
//     // View payload
//     view: conference_view,
//   });
// };

try {
    // Call views.open with the built-in client
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: 'modal',
        // View identifier
        callback_id: 'subview',
        title: {
          type: 'plain_text',
          text: 'Modal title'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Welcome to a modal with _blocks_'
            },
            accessory: {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Click me!'
              },
              action_id: 'button_abc'
            }
          },
          {
            type: 'input',
            block_id: 'input_c',
            label: {
              type: 'plain_text',
              text: 'What are your hopes and dreams?'
            },
            element: {
              type: 'plain_text_input',
              action_id: 'dreamy_input',
              multiline: true
            }
          }
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit'
        }
      }
    });
    // logger.info(result);
  }
  catch (error) {
    // logger.error(error);
  }


}






//   {
//     type: "input",
//     element: {
//       type: "static_select",
//       placeholder: {
//         type: "plain_text",
//         text: "Select the duration",
//         emoji: true,
//       },
//       options: [
//         {
//           text: {
//             type: "plain_text",
//             text: "30 minutes",
//             emoji: true,
//           },
//           value: "30m",
//         },
//         {
//           text: {
//             type: "plain_text",
//             text: "60 minutes",
//             emoji: true,
//           },
//           value: "60m",
//         },
//         {
//           text: {
//             type: "plain_text",
//             text: "90 minutes",
//             emoji: true,
//           },
//           value: "90m",
//         },
//         {
//           text: {
//             type: "plain_text",
//             text: "120 minutes",
//             emoji: true,
//           },
//           value: "120m",
//         },
//       ],
//       action_id: "duration-action",
//     },
//     label: {
//       type: "plain_text",
//       text: "Duration",
//       emoji: true,
//     },
//   },
