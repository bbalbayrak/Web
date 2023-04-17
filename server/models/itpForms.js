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
};

module.exports = ItpForm;
