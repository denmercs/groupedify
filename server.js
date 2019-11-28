const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// ROUTES
const usersRouter = require("./api/users/users-router");

const server = express();

// USE
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/auth", usersRouter);

// GENERAL ROUTE
server.get("/", (req, res) => {
  res.json({ api: "Server is running" });
});

module.exports = server;
