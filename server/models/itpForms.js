const db = require("../config/db");

const ItpForm = {
  tableName: "itp_forms",
  columns: {
    id: "id",
    product_id: "product_id",
    vendor_id: "vendor_id",
  },

  create: async (product_id, vendor_id) => {
    const result = await db.one(
      `INSERT INTO ${ItpForm.tableName} (product_id, vendor_id) VALUES ($1, $2) RETURNING *`,
      [product_id, vendor_id]
    );
    return result;
  },

  findById: async (id) => {
    const result = await db.oneOrNone(
      `SELECT * FROM ${ItpForm.tableName} WHERE id = $1`,
      [id]
    );
    return result;
  },

  getAllItps: async () => {
    const result = await db.any(`SELECT * FROM ${ItpForm.tableName}`);
    return result;
  },
};

module.exports = ItpForm;