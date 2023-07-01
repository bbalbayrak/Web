const db = require("../config/db");

const InspectionPlan = {
  tableName: "inspectionplan",

  create: async (vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, control_responsible, control_date, delivery_date, status, state, control_type) => {
    const result = await db.one(
      `INSERT INTO ${InspectionPlan.tableName} (vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, control_responsible, control_date, delivery_date, status, state, control_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, control_responsible, control_date, delivery_date, status, state, control_type]
    );
    return result;
  },

  getAll: async () => {
    const result = await db.any(`SELECT * FROM ${InspectionPlan.tableName}`);
    return result;
  },
  
  getByState: async (state) => {
    const result = await db.any(`SELECT * FROM ${InspectionPlan.tableName} WHERE state = $1`, [state]);
    return result;
  },
  
  delete: async (id) => {
    await db.none(`DELETE FROM ${InspectionPlan.tableName} WHERE id = $1`, [id]);
  },

  update: async (id, fieldsToUpdate) => {
    const setClauses = Object.keys(fieldsToUpdate).map((fieldName, index) => `${fieldName} = $${index + 2}`).join(', ');
    const query = `UPDATE ${InspectionPlan.tableName} SET ${setClauses} WHERE id = $1 RETURNING *`;
    const values = [id, ...Object.values(fieldsToUpdate)];
    const result = await db.one(query, values);
    return result;
  },
  
};

module.exports = InspectionPlan;
