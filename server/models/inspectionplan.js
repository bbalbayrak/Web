const db = require("../config/db");

const InspectionPlan = {
  tableName: "inspectionplan",

  create: async (vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, mid_control_responsible, mid_control_date, final_control_responsible, final_control_date, delivery_date, status, state) => {
    const result = await db.one(
      `INSERT INTO ${InspectionPlan.tableName} (vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, mid_control_responsible, mid_control_date, final_control_responsible, final_control_date, delivery_date, status, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
      [vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, mid_control_responsible, mid_control_date, final_control_responsible, final_control_date, delivery_date, status, state]
    );
    return result;
  },
};

module.exports = InspectionPlan;
