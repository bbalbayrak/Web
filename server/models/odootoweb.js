const db = require('../config/db');

const OdooToWebWork = {
  tableName: 'works',

  create: async (
    order_number,
    project_number,
    vendor_id,
    customer_id,
    quality_responsible_id,
    inspector_id,
    foreman_id,
    work_type,
    state,
    status,
    creator_name,
    creation_date,
    order_id
  ) => {
    const result = await db.one(
      `INSERT INTO ${OdooToWebWork.tableName} (order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_name, creation_date, order_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
      ON CONFLICT (purchase_id, product_id) DO NOTHING RETURNING *`,
      [
        order_number,
        project_number,
        vendor_id,
        customer_id,
        quality_responsible_id,
        inspector_id,
        foreman_id,
        work_type,
        state,
        status,
        creator_name,
        creation_date,
        order_id,
      ]
    );
    return result;
  },
};

module.exports = OdooToWebWork;
