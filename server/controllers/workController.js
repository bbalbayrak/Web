const Work = require("../models/work");

exports.createWork = async (req, res) => {
  try {
    const { order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date } = req.body;
    const newWork = await Work.create(order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date);
    res.status(201).send({ message: "Work created successfully", work: newWork });
  } catch (error) {
    console.error("Error in createWork:", error);
    res.status(500).send({ message: "Error creating work", error: error.message });
  }
};

exports.getWorks = async (req, res) => {
    try {
      const works = await Work.getAll();
      res.status(200).send({ data: works });
    } catch (error) {
      res.status(500).send({ message: "Error retrieving works", error: error.message });
    }
  };

exports.getWorkById = async (req, res) => {
    try {
      const workId = req.params.id;
      const work = await Work.findById(workId);
      if (!work) {
        res.status(404).send({ message: "Work not found" });
        return;
      }
      res.status(200).send({ data: work });
    } catch (error) {
      res.status(500).send({ message: "Error retrieving work", error: error.message });
    }
};  

exports.updateWork = async (req, res) => {
    try {
      const workId = req.params.id;
      const { order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date, product_id } = req.body;
      const updatedWork = await Work.update(workId, order_number, project_number, vendor_id, customer_id, quality_responsible_id, inspector_id, foreman_id, work_type, state, status, creator_id, creation_date, product_id);
      if (!updatedWork) {
        res.status(404).send({ message: "Work not found" });
        return;
      }
      res.status(200).send({ message: "Work updated successfully", data: updatedWork });
    } catch (error) {
      res.status(500).send({ message: "Error updating work", error: error.message });
    }
  };
  
exports.deleteWork = async (req, res) => {
    try {
      const workId = req.params.id;
      await Work.delete(workId);
      res.status(200).send({ message: "Work deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting work", error: error.message });
    }
  };