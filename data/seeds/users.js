const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        {
          username: "admin",
          password: bcrypt.hashSync("password"),
          firstName: "Dennis",
          lastName: "Mercado"
        }
      ]);
    });
};
