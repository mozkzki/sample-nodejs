// ------------------------
// WebSocket Server Sample
// ------------------------
//
// 1. start server
//     > node./ test.js
//
// 2. call from client
//     [ws]
//     > wscat ws://192.168.1.16:8081
//     [wss]
//     > wscat wss://192.168.1.16:8081
//     [wss (pass self signed certificate)]
//     オレオレ証明書だとはじかれるので --no-check が必要
//     > wscat wss://192.168.1.16:8081 --no-check

const fs = require("fs");
const httpServer = require("https");
const websocketServer = require("ws").Server;

const port = 8081;

var processRequest = function (req, res) {
  console.log("Request received.");
};

var app = httpServer
  .createServer(
    {
      key: fs.readFileSync("/etc/cert/server.key").toString(),
      cert: fs.readFileSync("/etc/cert/server.crt").toString(),
    },
    processRequest
  )
  .listen(port);

// [ws]
// const wsServer = new websocketServer({ port: 8081 });

// [wss]
const wsServer = new websocketServer({ server: app });

wsServer.on("connection", (socket) => {
  console.log("connected!");

  socket.on("message", (ms) => {
    console.log(ms);
  });

  socket.on("close", () => {
    console.log("good bye.");
  });
});

console.log("websocket server start. port=" + port);
