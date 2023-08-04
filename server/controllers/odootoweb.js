// server\controllers\odootoweb.js
const axios = require('axios');
const OdooToWebWork = require("../models/odootoweb");
const Vendor = require("../models/vendor");
const Customer = require("../models/customer");
const Product = require("../models/product");
const API_URL = process.env.REACT_APP_API_URL;

exports.createWork = async (req, reply) => {
  try {
    const { order_number, project_number, vendor_id, vendor_name, customer_id, customer_name, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_name, creation_date, order_id } = req.body;

    // Check and create vendor, customer and product if they do not exist
    const vendor = await Vendor.findOrCreate(vendor_id, vendor_name);
    const customer = await Customer.findOrCreate(customer_id, customer_name);
    for (let productData of req.body.ControlForms) {
      await Product.findOrCreate(productData.id, productData.name, customer_name, customer_id);
    }

    const newWork = await OdooToWebWork.create(order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_name, creation_date, order_id);

    // For each product, make a request to create a new WorkProduct
    for (let productData of req.body.ControlForms) {
      await axios.post(`${API_URL}/workproducts`, { work_id: newWork.id, product_id: productData.id });
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
