const InspectionPlan = require("../models/inspectionplan");

exports.createInspectionPlan = async (req, res) => {
  try {
    const { vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, mid_control_responsible, mid_control_date, final_control_responsible, final_control_date, delivery_date, status, state } = req.body;
    const newInspectionPlan = await InspectionPlan.create(vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, mid_control_responsible, mid_control_date, final_control_responsible, final_control_date, delivery_date, status, state);
    res.status(201).send({ message: "InspectionPlan created successfully", inspectionPlan: newInspectionPlan });
  } catch (error) {
    res.status(500).send({ message: "Error creating InspectionPlan", error: error.message });
  }
};
