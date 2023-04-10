const db = require("../config/db");

const User = {
  tableName: "users2",
  columns: {
    id: "id",
    password: "password",
    email: "email",
  },

  findByEmail: async (email) => {
    const result = await db.oneOrNone("SELECT * FROM ${table:name} WHERE email = ${email}", {
      table: User.tableName,
      email,
    });
    return result;
  },

  create: async (email, password) => {
    const result = await db.one("INSERT INTO ${table:name} (email, password) VALUES (${email}, ${password}) RETURNING *", {
      table: User.tableName,
      email,
      password,
    });
    return result;
  },
};

module.exports = User;
