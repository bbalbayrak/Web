const db = require("../config/db");

const QualityControl = {
  tableName: "quality_control",

  create: async (form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, image_id, substep_id, measured_value_1, measured_value_2, measured_value_3) => {
    const result = await db.one(
      `INSERT INTO ${QualityControl.tableName} (form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, image_id, substep_id, measured_value_1, measured_value_2, measured_value_3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
      [form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, image_id, substep_id, measured_value_1, measured_value_2, measured_value_3]
    );
    return result;
  },

  findByFormId: async (form_id) => {
    const result = await db.any(`SELECT * FROM ${QualityControl.tableName} WHERE form_id = $1`, [form_id]);
    return result;
  },

};

module.exports = QualityControl;
