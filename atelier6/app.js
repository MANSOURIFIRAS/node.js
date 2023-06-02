const express = require("express");
const app = express();
var path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json())
io.on("connection", (socket) => {
  console.log('a user connected');
  io.emit("user connected");

  socket.on('chat message', (message) => {
    socket.broadcast.emit("chat message", message);
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing');
  });

  socket.on('stopped typing', () => {
    socket.broadcast.emit('stopped typing');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit("user disconnected");
  });
});

app.get('/', (req, res) => {
  res.json({"message": "message"});
})

app.get("/chat", (req, res) => {
  res.render("chat.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
