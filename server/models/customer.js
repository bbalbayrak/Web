const db = require("../config/db");

const Customer = {
  tableName: "customers",
  columns: {
    id: "id",
    name: "name",
    odooid: "odooid",
  },

  create: async (name, odooid) => {
    const result = await db.one(
      `INSERT INTO ${Customer.tableName} (name, odooid) VALUES ($1, $2) RETURNING *`,
      [name, odooid]
    );
    return result;
  },

  findAll: async () => {
    const result = await db.any(`SELECT * FROM ${Customer.tableName}`);
    return result;
  },

  findByName: async (name) => {
    const result = await db.any("SELECT * FROM ${table:name} WHERE name ILIKE ${name}", {
      table: Customer.tableName,
      name: `%${name}%`,
    });
    return result;
  },

  findById: async (id) => {
    const result = await db.oneOrNone(`SELECT * FROM ${Customer.tableName} WHERE id = $1`, [id]);
    return result ? result.name : null;
  },  
  
  findOrCreate: async (odooid, name) => {
    let customer = await db.oneOrNone(`SELECT * FROM ${Customer.tableName} WHERE odooid = $1`, [odooid]);

    if (!customer) {
      customer = await db.one(`INSERT INTO ${Customer.tableName} (odooid, name) VALUES ($1, $2) RETURNING *`, [odooid, name]);
    }

    return customer;
  },
};

module.exports = Customer;
