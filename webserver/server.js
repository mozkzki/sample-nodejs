"use strict";

var express = require("express");
var app = express();
app.use(express.static("webserver/wwwroot"));
app.get("/", function (req, res) {
  res.sendFile("webserver/wwwroot/index.html");
});

let port1 = 3000;
let port2 = 3001;

// http サーバ
var http = require("http").Server(app);
http.listen(port1, function () {
  console.log(
    "\tサーバがポート%dで起動しました。モード:%s",
    port1,
    app.settings.env
  );
});

// https サーバ
var fs = require("fs");
var opt = {
  key: fs.readFileSync("/etc/cert/server.key"),
  cert: fs.readFileSync("/etc/cert/server.crt"),
};
var https = require("https").Server(opt, app); // https サーバを立てる
https.listen(port2, function () {
  console.log(
    "\tサーバがポート%dで起動しました。モード:%s",
    port2,
    app.settings.env
  );
});
