const db = require("../config/db");

const Work = {
  tableName: "works",

  create: async (order_number, project_number, vendor_id, customer_id, control_forms, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date) => {
    const result = await db.one(
      `INSERT INTO ${Work.tableName} (order_number, project_number, vendor_id, customer_id, control_forms, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [order_number, project_number, vendor_id, customer_id, control_forms, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date]
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
  
  update: async (id, order_number, project_number, vendor_id, customer_id, control_forms, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date) => {
    const result = await db.one(
      `UPDATE ${Work.tableName} SET order_number = $1, project_number = $2, vendor_id = $3, customer_id = $4, control_forms = $5, quality_responsible_id = $6, inspector_id = $7, foreman_id = $8, work_type = $9, state = $10, status = $11, creator_id = $12, creation_date = $13 WHERE id = $14 RETURNING *`,
      [order_number, project_number, vendor_id, customer_id, control_forms, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date, id]
    );
    return result;
  },
  
  delete: async (id) => {
    await db.none(`DELETE FROM ${Work.tableName} WHERE id = $1`, [id]);
  },
};

module.exports = Work;
