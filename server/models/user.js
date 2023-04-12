const db = require("../config/db");

const User = {
  tableName: "users",
  columns: {
    id: "id",
    password: "password",
    email: "email",
    phone: "phone",
  },

  findByEmail: async (email) => {
    const result = await db.oneOrNone("SELECT * FROM ${table:name} WHERE email = ${email}", {
      table: User.tableName,
      email,
    });
    return result;
  },

  create: async (email, password, phone) => {
    const result = await db.one(
      "INSERT INTO ${table:name} (email, password, phone) VALUES (${email}, ${password}, ${phone}) RETURNING *",
      {
        table: User.tableName,
        email,
        password,
        phone,
      }
    );
    return result;
  },
};

module.exports = User;
