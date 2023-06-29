const axios = require('axios');
const Work = require("../models/work");
const API_URL = "https://portal-test.yenaengineering.nl/api";

exports.createWork = async (req, reply) => {
  try {
    const { order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_name, creation_date } = req.body;
    const newWork = await Work.create(order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_name, creation_date);

    // For each product, make a request to create a new WorkProduct
    for (let productId of req.body.ControlForms) {
      await axios.post(`${API_URL}/workproducts`, { work_id: newWork.id, product_id: productId });
    }

    // After all WorkProducts have been created, create a new WorkStep
    await axios.post(`${API_URL}/worksteps`, {
      work_id: newWork.id,
      step_name: 'New Work',
      timestamp: new Date().toISOString(),
      state: 'New Work',
      status: 'Open',
    });

    reply.status(201).send({ message: "Work created successfully", work: newWork });
  } catch (error) {
    console.error("Error in createWork:", error);
    reply.status(500).send({ message: "Error creating work", error: error.message });
  }
};