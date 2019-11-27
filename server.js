const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.json({ api: "Server is running" });
});

module.exports = server;
