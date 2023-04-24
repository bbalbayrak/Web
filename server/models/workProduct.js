const db = require("../config/db");

const WorkProduct = {
  tableName: "work_products",

  create: async (work_id, product_id) => {
    const result = await db.one(
      `INSERT INTO ${WorkProduct.tableName} (work_id, product_id) VALUES ($1, $2) RETURNING *`,
      [work_id, product_id]
    );
    return result;
  },

  findByWorkId: async (work_id) => {
    const result = await db.any(`SELECT * FROM ${WorkProduct.tableName} WHERE work_id = $1`, [work_id]);
    return result;
  },
};

module.exports = WorkProduct;
