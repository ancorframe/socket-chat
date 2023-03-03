const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const { addMessage, getAllMessage } = require("./service");

const { PORT, MONGO_URL } = process.env;


const app = express();
const http = require("http").Server(app);
const socket = require("socket.io")(http, {
  cors: { origin: "https://socket-front.onrender.com" },
});
global.onlineUsers = new Map();

mongoose.connect(MONGO_URL)

socket.on("connection", (user) => {
  user.emit("changeOnline", onlineUsers.size);
  user.on("addUser", async (data) => {
    onlineUsers.set(user.id, data.name);
    user.broadcast.emit("changeOnline", onlineUsers.size);
      user.emit("changeOnline", onlineUsers.size);
      user.emit("allMessages", await getAllMessage());
      console.log(await getAllMessage());
  });
  user.on("newMessage", async (data) => {
    const newMessage = await addMessage(data);
    user.broadcast.emit("addMessage", newMessage);
  });
  user.on("disconnect", () => {
    onlineUsers.delete(user.id);
    user.broadcast.emit("changeOnline", onlineUsers.size);
  });
});

http.listen(PORT,()=> {
    console.log('server start');
})