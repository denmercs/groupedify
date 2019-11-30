const db = require("../../data/dbConfig");

module.exports = {
  addUser,
  getUsers,
  findUser
};

async function addUser(data) {
  let user = await db("users")
    .insert(data, "id")
    .select("id", "username", "firstName", "lastName");
  return user;
}

async function getUsers() {
  let users = await db("users").select("*");
  return users;
}

async function findUser(username) {
  let userExist = await db("users")
    .where({ username })
    .select("username", "password", "firstName", "lastName")
    .first();
  return userExist;
}
