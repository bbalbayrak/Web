const db = require("../config/db");

const Work = {
  tableName: "works",

  create: async (order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date, product_id) => {
    const result = await db.one(
      `INSERT INTO ${Work.tableName} (order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date, product_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date, product_id]
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
  
  update: async (id, order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date, product_id) => {
    const result = await db.one(
      `UPDATE ${Work.tableName} SET order_number = $1, project_number = $2, vendor_id = $3, customer_id = $4, quality_responsible_id = $5, inspector_id = $6, foreman_id = $7, work_type = $8, state = $9, status = $10, creator_id = $11, creation_date = $12, product_id = $13 WHERE id = $14 RETURNING *`,
      [order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date, id, product_id]
    );
    return result;
  },
  
  delete: async (id) => {
    await db.none(`DELETE FROM ${Work.tableName} WHERE id = $1`, [id]);
  },
};

module.exports = Work;
