const db = require("../config/db");

const User = {
  tableName: "users",
  columns: {
    id: "id",
    password: "password",
    email: "email",
    phone: "phone",
    role: "role",
    name: "name",
    username: "username", 
    related_company: "related_company",
  },

  findByEmail: async (email) => {
    const result = await db.oneOrNone("SELECT * FROM ${table:name} WHERE email = ${email}", {
      table: User.tableName,
      email,
    });
    return result;
  },

  create: async (email, password, phone, role, name, username, related_company) => {
    const result = await db.one(
      "INSERT INTO ${table:name} (email, password, phone, role, name, username, related_company) VALUES (${email}, ${password}, ${phone}, ${role}, ${name}, ${username}, ${related_company}) RETURNING *",
      {
        table: User.tableName,
        email,
        password,
        phone,
        role,
        name,
        username,
        related_company,
      }
    );
    return result;
  },
  
  findAll: async () => {
    const result = await db.any("SELECT * FROM ${table:name}", {
      table: User.tableName,
    });
    return result;
  },
};

module.exports = User;
