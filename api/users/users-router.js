const router = require("express").Router();
const bcrypt = require("bcrypt");
const token = require("jsonwebtoken");
const Users = require("./users-model");
const secret = require("../../config/secrets");

router.post("/register", validateUsername, async (req, res) => {
  try {
    let user = req.body;

    await Users.addUser(user);
    res.status(200).json({ message: "User created" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  let registeredUser = await Users.findUser(username);
  let user = registeredUser[0];

  if (registeredUser.length === 0) {
    res
      .status(404)
      .json({ message: "Something is wrong, can't find data on the server" });
  } else if (user && bcrypt.compareSync(password, registeredUser.password)) {
    console.log("true");
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

module.exports = router;
