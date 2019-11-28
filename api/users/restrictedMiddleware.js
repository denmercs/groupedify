const jwt = require("jsonwebtoken");
const secret = require("../../config/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        // token expired or is invalid
        res.status(401).json({ message: "Invalid token or expired" });
      } else {
        // token is valid
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};
