const db = require("../config/db");

const Work = {
  tableName: "works",

  create: async (order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date) => {
    const result = await db.one(
      `INSERT INTO ${Work.tableName} (order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date]
    );
    return result;
  },

  getAll: async () => {
    const result = await db.any(`SELECT * FROM ${Work.tableName}`);
    return result;
  },
  
  findById: async (id) => {
    const result = await db.oneOrNone(`SELECT * FROM ${Work.tableName} WHERE id = $1`, [id]);
    return result;
  },
  
  
  delete: async (id) => {
    await db.none(`DELETE FROM ${Work.tableName} WHERE id = $1`, [id]);
  },
};

module.exports = Work;
