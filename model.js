const { Schema, model } = require("mongoose");

const messageSchema = Schema(
  {
    name: String,
    text: String,
  },
  { timestamp: true }
);
const Message = model("message", messageSchema);
module.exports = Message;
