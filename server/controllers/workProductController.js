const WorkProduct = require("../models/workProduct");

exports.createWorkProduct = async (req, res) => {
  try {
    const { work_id, product_id } = req.body;
    const newWorkProduct = await WorkProduct.create(work_id, product_id);
    res.status(201).send({ message: "Work product created successfully", workProduct: newWorkProduct });
  } catch (error) {
    console.error("Error in createWorkProduct:", error);
    res.status(500).send({ message: "Error creating work product", error: error.message });
  }
};

exports.getWorkProductsByWorkId = async (req, res) => {
  try {
    const workId = req.params.work_id;
    const workProducts = await WorkProduct.findByWorkId(workId);
    res.status(200).send({ data: workProducts });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving work products", error: error.message });
  }
};
