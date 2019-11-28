exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    //primary key
    users.increments();
    users
      .string("username", 255)
      .notNullable()
      .unique();
    users.string("firstName", 255).notNullable();
    users.string("lastName", 255).notNullable();
    users.string("password", 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
