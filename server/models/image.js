const db = require("../config/db");

const Image = {
  tableName: "images",

  create: async (image_url, quality_control_id, status) => {
    const result = await db.one(
      `INSERT INTO ${Image.tableName} (image_url, quality_control_id, status) VALUES ($1, $2, $3, $4) RETURNING *`,
      [image_url, quality_control_id, status]
    );
    return result;
  },

  findByQualityControlId: async (quality_control_id) => {
    const result = await db.any(
      `SELECT * FROM ${Image.tableName} WHERE quality_control_id = $1`,
      [quality_control_id]
    );
    return result;
  },
};

module.exports = Image;
