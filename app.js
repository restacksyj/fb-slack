const { App, ExpressReceiver } = require("@slack/bolt");
const apis = require("./apis");
const { showConferenceRooms } = require("./conferece");
const { showFacilities } = require("./facilities");
const { showAvailableEndTime } = require("./showAvailableEndTime");
const { showAvailableStartTime } = require("./showAvailableStartTime");
const { showDatePicker } = require("./showDatePicker");

require("dotenv").config();

let currentUserData = {};

const app = new App({
  token: process.env.BOT_TOKEN,

  signingSecret: process.env.SIGNING_SECRET,

  appToken: process.env.APP_LEVEL_TOKEN,

  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: process.env.PORT || 9002,
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();

app.command("/hi", async ({ command, ack, respond, payload }) => {
  // Acknowledge command request
  await ack();

  await respond(`${payload.user_name}`);
});

app.event("app_home_opened", async ({ event, client, logger, say }) => {
  try {
    const result = await client.views.publish({
      // Use the user ID associated with the event
      user_id: event.user,
      view: {
        // Home tabs must be enabled in your app configuration page under "App Home"
        type: "home",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "*Welcome to Freightify Office Suite, <@" +
                event.user +
                "> :house:*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>.",
            },
          },
        ],
      },
    });

    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

//for conference status
app.command("/cnf", async (res) => {
  await res.ack();

  await res.respond(`Here is your conference status`);
});

//for tt status
app.command("/tt", async (res) => {
  await res.ack();

  await res.respond(`Here is your tt status`);
});

app.command("/cafe", async ({ ack, body, client, logger }) => {
  await ack();
  const resp = await apis.getCafeterias();
  let elements = [];
  for (let index = 0; index < resp.length; index++) {
    const element = resp[index];
    elements.push({
      value: `A${index + 1}`,
      text: {
        type: "plain_text",
        text: element["name"],
      },
    });
  }
  try {
    // Call views.open with the built-in client
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Cafe Available",
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
              type: "plain_text",
              text: "Pick your cafe",
            },
            accessory: {
              type: "radio_buttons",
              action_id: "cafe_selected",
              initial_option: elements[0],
              options: elements,
            },
          },
        ],
      },
    });
    // await res.respond(result)
    // logger.info(result);
    // console.log(body);
  } catch (error) {
    logger.error(error);
  }
});

app.action("cafe_selected", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

// Listens to incoming messages that contain "hello"
app.message("Hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await showFacilities(say);
});

app.action("facility_selected", async ({ body, ack, say, client }) => {
  await ack();
  console.log("f s");
  currentUserData[body.user.id] = {};
  await showConferenceRooms(say);
});

app.action("cr_selected", async ({ body, ack, say, client }) => {
  await ack();
  console.log("f s", body);
  currentUserData[body.user.id] = {};
  currentUserData[body.user.id].conferenceRoomId =
    body.actions[0].selected_option.value;
  currentUserData[body.user.id].username = body.user.username;
  await showDatePicker(say);
});

app.action("date_selected", async ({ body, ack, say, client }) => {
  await ack();
  currentUserData[body.user.id].date = new Date(body.actions[0].selected_date);
  await showAvailableStartTime(say);
});

app.action("start_selected", async ({ body, ack, say, client }) => {
  await ack();
  console.log("start time ");
  console.log("date selected", JSON.stringify(body.actions));
  currentUserData[body.user.id].startTime = body.actions[0].selected_time;
  console.log("cd ", currentUserData);
  await showAvailableEndTime(say);
});

app.action("end_selected", async ({ body, ack, say, client }) => {
  await ack();
  currentUserData[body.user.id].endTime = body.actions[0].selected_time;
  console.log("end time , do booking", currentUserData);

  //book conference
  const res = await apis.bookConference(currentUserData[body.user.id]);
  console.log("res ", res);

  delete currentUserData[body.user.id];

  await say("Booking Created Succesfully");

  // await showAvailableEndTime(say);
});

app.action("cafeteria_selected", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  console.log("body ", body.actions[0]);
  await say(`<@${body.user.id}> clicked the button`);
});

app.view(
  { callback_id: "subview", type: "view_submission" },
  async ({ ack, body }) => {
    console.log("view submission body");
    await ack();
    return { response_action: "clear" };
  }
);

app.view({ type: "view_closed" }, async ({ ack, body }) => {
  console.log("view closed body");
  await ack();
  return { response_action: "clear" };
});
