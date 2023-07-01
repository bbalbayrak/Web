const db = require("../config/db");
const Customer = require('./customer'); // customer.js dosyasını dahil edin
const AuditLog = require("./auditLog");
const Product = {
  tableName: "products",
  columns: {
    id: "id",
    name: "name",
    odooid: "odooid",
    customer: "customer",
    customerid: "customerid",
    technicaldrawingurl: "technicaldrawingurl",
    guideurl: "guideurl",
  },

  create: async (name, odooid, customerid, technicaldrawingurl, guideurl) => {
    const customer_name = await Customer.findById(customerid);
    const result = await db.one(
      `INSERT INTO ${Product.tableName} (name, odooid, customerid, customer, technicaldrawingurl, guideurl) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, odooid, customerid, customer_name, technicaldrawingurl, guideurl]
    );
    await AuditLog.create(
      "create",
      "products",
      result.id,
      null,
      JSON.stringify(result)
    );
    return result;
  },

  findAll: async () => {
    const result = await db.any(`SELECT * FROM ${Product.tableName}`);
    return result;
  },

  findByOdooId: async (odooid) => {
    const result = await db.oneOrNone(`SELECT * FROM ${Product.tableName} WHERE odooid = $1`, [odooid]);
    return result;
  },
  
  findByName: async (name) => {
    const result = await db.any("SELECT * FROM ${table:name} WHERE name ILIKE ${name}", {
      table: Product.tableName,
      name: `%${name}%`,
    });
    return result;
  },

  findOrCreate: async (odooid, name, customer_name, customerid) => {
    let product = await db.oneOrNone(`SELECT * FROM ${Product.tableName} WHERE odooid = $1`, [odooid]);

    if (!product) {
      product = await db.one(`INSERT INTO ${Product.tableName} (odooid, name, customer, customerid) VALUES ($1, $2, $3, $4) RETURNING *`, [odooid, name, customer_name, customerid]);
    }

    return product;
  },
};

module.exports = Product;
