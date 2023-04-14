const db = require("../config/db");
const Customer = require('./customer'); // customer.js dosyasını dahil edin

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
    return result;
  },

  findAll: async () => {
    const result = await db.any(`SELECT * FROM ${Product.tableName}`);
    return result;
  },

  findById: async (id) => {
    const result = await db.oneOrNone(`SELECT * FROM ${Product.tableName} WHERE id = $1`, [id]);
    return result;
  },

  findByName: async (name) => {
    const result = await db.any("SELECT * FROM ${table:name} WHERE name ILIKE ${name}", {
      table: Product.tableName,
      name: `%${name}%`,
    });
    return result;
  },
  // Diğer CRUD işlemleri (güncelleme, silme vb.) için gerekli fonksiyonları buraya ekleyebilirsin.
};

module.exports = Product;
