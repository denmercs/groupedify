const router = require("express").Router();
const bcrypt = require("bcryptjs");
const token = require("jsonwebtoken");
const Users = require("./users-model");
const secret = require("../../config/secrets");
const restricted = require("./restrictedMiddleware");

router.post("/register", validateUsername, async (req, res) => {
  try {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, 10);
    await Users.addUser(user);
    res.status(200).json({ message: "User created" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    let registeredUser = await Users.findUser(username);

    if (
      registeredUser &&
      bcrypt.compareSync(password, registeredUser.password)
    ) {
      const token = generateToken(registeredUser);
      res.status(200).json({
        message: `Welcome ${registeredUser.username}, this is your token:`,
        token
      });
    } else {
      res.status(500).json({
        message: "Server can't find the data. Please enter the right value"
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    let users = await Users.getUsers();

    res.status(200).json({ users });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Please fill up all the information needed" });
  }
});

async function validateUsername(req, res, next) {
  const { username } = req.body;

  let validateUser = await Users.findUser(username);

  if (validateUser.length) {
    res
      .status(409)
      .json({ message: "Username already exist. Please register another" });
  } else {
    next();
  }
}

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return token.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
