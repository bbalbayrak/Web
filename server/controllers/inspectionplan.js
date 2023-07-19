// server\controllers\inspectionplan.js
const InspectionPlan = require("../models/inspectionplan");

exports.createInspectionPlan = async (req, res) => {
  try {
    const inspectionPlans = req.body;

    // Her bir plan için ayrı ayrı oluşturma işlemi
    const createdPlans = await Promise.all(inspectionPlans.map(async plan => {
      const { vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, control_responsible, control_date, delivery_date, status, state, control_type, project_number, note, control_method } = plan;
      const newInspectionPlan = await InspectionPlan.create(vendor_odooid, vendor_name, customer_odooid, customer_name, product_odooid, product_name, order_id, order_number, quantity, control_responsible, control_date, delivery_date, status, state, control_type, project_number, note, control_method );
      return newInspectionPlan;
    }));

    res.status(201).send({ message: "InspectionPlans created successfully", inspectionPlans: createdPlans });
  } catch (error) {
    res.status(500).send({ message: "Error creating InspectionPlans", error: error.message });
  }
};

exports.getAllInspectionPlans = async (req, res) => {
    try {
      const inspectionPlans = await InspectionPlan.getAll();
      res.status(200).send({ inspectionPlans });
    } catch (error) {
      res.status(500).send({ message: "Error getting InspectionPlans", error: error.message });
    }
  };
  
  exports.getOpenDraftInspectionPlans = async (req, res) => {
    try {
      const inspectionPlans = await InspectionPlan.getByStateAndStatus("Open", "Draft");
      res.status(200).send({ inspectionPlans });
    } catch (error) {
      res.status(500).send({ message: "Error getting Open and Draft InspectionPlans", error: error.message });
    }
  }; 

  exports.getOpenWaitingInspectionPlans = async (req, res) => {
    try {
      const inspectionPlans = await InspectionPlan.getByStateAndStatus("Open", "Waiting");
      res.status(200).send({ inspectionPlans });
    } catch (error) {
      res.status(500).send({ message: "Error getting Open and Draft InspectionPlans", error: error.message });
    }
  }; 

  exports.getClosedInspectionPlans = async (req, res) => {
    try {
      const inspectionPlans = await InspectionPlan.getByState("Closed");
      res.status(200).send({ inspectionPlans });
    } catch (error) {
      res.status(500).send({ message: "Error getting Closed InspectionPlans", error: error.message });
    }
  };
  
  exports.deleteInspectionPlan = async (req, res) => {
    try {
      const { id } = req.params;
      await InspectionPlan.delete(id);
      res.status(200).send({ message: `InspectionPlan with id ${id} deleted successfully` });
    } catch (error) {
      res.status(500).send({ message: "Error deleting InspectionPlan", error: error.message });
    }
  };
  
  exports.updateInspectionPlan = async (req, res) => {
    try {
      const { id } = req.params;
      const fieldsToUpdate = req.body;
      const updatedInspectionPlan = await InspectionPlan.update(id, fieldsToUpdate);
      res.status(200).send({ message: `InspectionPlan with id ${id} updated successfully`, inspectionPlan: updatedInspectionPlan });
    } catch (error) {
      res.status(500).send({ message: "Error updating InspectionPlan", error: error.message });
    }
  };
  
  
