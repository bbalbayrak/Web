const db = require("../config/db");

const Vendor = {
  tableName: "vendors",
  columns: {
    id: "id",
    name: "name",
    odooid: "odooid",
  },

  create: async (name, odooid) => {
    const result = await db.one(
      `INSERT INTO ${Vendor.tableName} (name, odooid) VALUES ($1, $2) RETURNING *`,
      [name, odooid]
    );
    return result;
  },

  findAll: async () => {
    const result = await db.any(`SELECT * FROM ${Vendor.tableName}`);
    return result;
  },

  findByName: async (name) => {
    const result = await db.any("SELECT * FROM ${table:name} WHERE name ILIKE ${name}", {
      table: Vendor.tableName,
      name: `%${name}%`,
    });
    return result;
  },
  
};

module.exports = Vendor;
