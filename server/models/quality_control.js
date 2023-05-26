const db = require("../config/db");

const QualityControl = {
  tableName: "quality_control",

  create: async (form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, image_id, substep_id, measured_value_1, measured_value_2, measured_value_3, work_id, sample_quantity) => {
    const result = await db.one(
      `INSERT INTO ${QualityControl.tableName} (form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, image_id, substep_id, measured_value_1, measured_value_2, measured_value_3, work_id, sample_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`,
      [form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, image_id, substep_id, measured_value_1, measured_value_2, measured_value_3, work_id, sample_quantity]
    );
    return result;
  },

  findByFormId: async (form_id, work_id) => {
    const result = await db.any(`SELECT * FROM ${QualityControl.tableName} WHERE form_id = $1 AND work_id = $2`, [form_id, work_id]);
    return result;
  },

  update: async (entries) => {
    const updatedEntries = await db.tx(async (t) => {
      return await t.batch(
        entries.map((entry) =>
          t.one(
            `UPDATE ${QualityControl.tableName} SET measured_value_1 = COALESCE($2, measured_value_1), measured_value_2 = COALESCE($3, measured_value_2), measured_value_3 = COALESCE($4, measured_value_3) WHERE id = $1 RETURNING *`,
            [entry.id, entry.measured_value_1, entry.measured_value_2, entry.measured_value_3]
          )
        )
      );
    });
  
    return updatedEntries;
  },
};

module.exports = QualityControl;
