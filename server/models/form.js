const db = require("../config/db");

const Form = {
  tableName: "forms",

  create: async (product_id, vendor_id) => {
    const result = await db.one(
      `INSERT INTO ${Form.tableName} (product_id, vendor_id) VALUES ($1, $2) RETURNING *`,
      [product_id, vendor_id]
    );
    return result;
  },

  findById: async (id) => {
    const result = await db.oneOrNone(`SELECT * FROM ${Form.tableName} WHERE id = $1`, [id]);
    return result;
  },

  findByProductIdAndVendorId: async (product_id, vendor_id) => {
    const result = await db.oneOrNone(`SELECT * FROM ${Form.tableName} WHERE product_id = $1 AND vendor_id = $2`, [product_id, vendor_id]);
    return result;
  },
};

module.exports = Form;
