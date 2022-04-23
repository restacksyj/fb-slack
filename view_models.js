let conference_view = {
    "type": "modal",
    "title": {
        "type": "plain_text",
        "text": "FB- Conference Rooms",
        "emoji": true
    },
    "submit": {
        "type": "plain_text",
        "text": "Submit",
        "emoji": true
    },
    "close": {
        "type": "plain_text",
        "text": "Cancel",
        "emoji": true
    },
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Select the conference room"
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select room",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "CF1",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "CF2",
                            "emoji": true
                        },
                        "value": "value-1"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "CF3",
                            "emoji": true
                        },
                        "value": "value-2"
                    }
                ],
                "action_id": "static_select-action"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "input",
            "element": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select the duration",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        "value": "value-1"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        "value": "value-2"
                    }
                ],
                "action_id": "static_select-action"
            },
            "label": {
                "type": "plain_text",
                "text": "Duration",
                "emoji": true
            }
        },
        {
            "type": "input",
            "element": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select the time",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        "value": "value-1"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        "value": "value-2"
                    }
                ],
                "action_id": "static_select-action"
            },
            "label": {
                "type": "plain_text",
                "text": "Available Times",
                "emoji": true
            }
        },
        {
            "type": "input",
            "element": {
                "type": "plain_text_input",
                "multiline": true,
                "action_id": "plain_text_input-action"
            },
            "label": {
                "type": "plain_text",
                "text": "Description (optional)",
                "emoji": true
            }
        }
    ]
}

module.exports = {
    conference_view
}