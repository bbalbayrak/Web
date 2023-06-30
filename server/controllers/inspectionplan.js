// server\controllers\inspectionplan.js
const InspectionPlan = require("../models/inspectionplan");

exports.createInspectionPlan = async (req, res) => {
  try {
    const inspectionPlans = req.body;

    // Her bir plan için ayrı ayrı oluşturma işlemi
    const createdPlans = await Promise.all(inspectionPlans.map(async plan => {
      const { vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, mid_control_responsible, mid_control_date, final_control_responsible, final_control_date, delivery_date, status, state } = plan;
      const newInspectionPlan = await InspectionPlan.create(vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, mid_control_responsible, mid_control_date, final_control_responsible, final_control_date, delivery_date, status, state);
      return newInspectionPlan;
    }));

    res.status(201).send({ message: "InspectionPlans created successfully", inspectionPlans: createdPlans });
  } catch (error) {
    res.status(500).send({ message: "Error creating InspectionPlans", error: error.message });
  }
};
