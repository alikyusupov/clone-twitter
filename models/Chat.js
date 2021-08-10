const { Schema, model } = require("mongoose");

const Chat = new Schema({
    chat_id: { type: String, required: true },
    users: [{ type: String, required: true }],
    chat_fields: [{ type: String }]
});

module.exports = model("Chat", Chat);
