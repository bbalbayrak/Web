const db = require("../config/db");

const Product = {
  tableName: "products",
  columns: {
    id: "id",
    name: "name",
    odooid: "odooid",
    customer: "customer",
    technical_drawing: "technical_drawing",
    guide: "guide",
  },

  create: async (name, odooid, customer, technical_drawing, guide) => {
    const result = await db.one(
      `INSERT INTO ${Product.tableName} (name, odooid, customer, technical_drawing, guide) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, odooid, customer, technical_drawing, guide]
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
