const jwt = require("jsonwebtoken");
const secret = require("../../config/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
};
