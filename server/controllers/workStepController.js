const WorkStep = require("../models/workStep");

exports.createWorkStep = async (req, res) => {
  try {
    const { work_id, step_name, timestamp, state ,status} = req.body;
    const newWorkStep = await WorkStep.create(work_id, step_name, timestamp, state, status);
    res.status(201).send({ message: "Work step created successfully", workStep: newWorkStep });
  } catch (error) {
    console.error("Error in createWorkStep:", error);
    res.status(500).send({ message: "Error creating work", error: error.message });
  }
};

exports.getWorkStepsByWorkId = async (req, res) => {
    try {
      const workId = req.params.workId;
      const workSteps = await WorkStep.findAllByWorkId(workId);
      res.status(200).send({ data: workSteps });
    } catch (error) {
      res.status(500).send({ message: "Error retrieving work steps", error: error.message });
    }
  };
  
  exports.getWorkStepsByWorkStatus = async (req, res) => {
    try {
      const status = req.params.status;
      const workSteps = await WorkStep.findAllByWorkStatus(status);
      res.status(200).send({ data: workSteps });
    } catch (error) {
      res.status(500).send({ message: "Error retrieving work steps", error: error.message });
    }
  };
  
  exports.updateWorkStepStatus = async (req, res) => {
    try {
      const workStepId = req.params.id;
      const { status } = req.body;
      const updatedWorkStep = await WorkStep.updateStatus(workStepId, status);
      if (!updatedWorkStep) {
        res.status(404).send({ message: "Work step not found" });
        return;
      }
      res.status(200).send({ message: "Work step status updated successfully", data: updatedWorkStep });
    } catch (error) {
      res.status(500).send({ message: "Error updating work step status", error: error.message });
    }
  };
  
  exports.deleteWorkStep = async (req, res) => {
    try {
      const workStepId = req.params.id;
      await WorkStep.delete(workStepId);
      res.status(200).send({ message: "Work step deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting work step", error: error.message });
    }
  };