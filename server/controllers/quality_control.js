const QualityControl = require("../models/quality_control");

exports.createQualityControl = async (req, res) => {
  try {
    const { form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, image_id, substep_id, measured_value_1, measured_value_2, measured_value_3 } = req.body;

    const qualityControl = await QualityControl.create(form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, image_id, substep_id, measured_value_1, measured_value_2, measured_value_3);

    res.status(201).send({ message: "Quality control entry created successfully", qualityControl });
  } catch (error) {
    console.error("Error in createQualityControl:", error);
    res.status(500).send({ message: "Error creating quality control entry", error });
  }
};
