const { App, ExpressReceiver } = require("@slack/bolt");
const apis = require("./apis");
// const express = require('express')
require("dotenv").config();
// console.log(process.env);

// const receiver = new ExpressReceiver({
//     signingSecret: process.env.SIGNING_SECRET,
// });

const app = new App({
  token: process.env.BOT_TOKEN,

  signingSecret: process.env.SIGNING_SECRET,

  appToken: process.env.APP_LEVEL_TOKEN,

  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: process.env.PORT || 9002,
});

// app.use(receiver.app)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Listens to incoming messages that contain "hello"
// app.message("hello", async ({ message, say }) => {
//   await say(`Hello, <@${message.user}>`);
// });

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();

// app.message("hello", async ({message, say}) => {
//     console.log("message ", message);
//     await say(`Hey there <@${message.user}>!`);
// })

app.command("/hi", async ({ command, ack, respond, payload }) => {
  // Acknowledge command request
  await ack();

  await respond(`${payload.user_name}`);
});

// app.event('app_home_opened', async({event, say}) => {
//     console.log("event ", event);
//     await say(`Hey there`);
// })
app.event("app_home_opened", async ({ event, client, logger }) => {
  try {
    // console.log("event is ", event);
    // Call views.publish with the built-in client
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

// app.action(
//     { action_id: 'app-home-nav-completed', type: 'block_actions' },
//     async({ body, ack, client }) => {

//     },
// );

app.action("cafe_selected", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: "section",
        block_id: "cafeteriaSection",
        text: {
          type: "mrkdwn",
          text: "Pick a cafeteria from the dropdown list",
        },
        accessory: {
          action_id: "cafeteria_selected",
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select an cafeteria",
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "Chennai Cafeteria",
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                text: "Mumbai Cafeteria",
              },
              value: "value-1",
            },
          ],
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

// app.action("button_click", async ({ body, ack, say }) => {
//   // Acknowledge the action
//   await ack();
//   await say(`<@${body.user.id}> clicked the button`);
// });

app.action("cafeteria_selected", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  console.log("body ", body.actions[0]);
  await say(`<@${body.user.id}> clicked the button`);
});

//cafe popup
//cafe selected
//cafe status
//cafe book

//cnf status
//cnf 1 sems empty wanna book
//book cnf 1
//done time slot
