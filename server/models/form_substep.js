const db = require("../config/db");

const FormSubstep = {
  tableName: "form_substeps",

  create: async (form_step_id, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type) => {
    const result = await db.one(
      `INSERT INTO ${FormSubstep.tableName} (form_step_id, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [form_step_id, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type]
    );
    return result;
  },

  findByFormStepId: async (form_step_id) => {
    const result = await db.any(`SELECT * FROM ${FormSubstep.tableName} WHERE form_step_id = $1`, [form_step_id]);
    return result;
  },

  update: async (id, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type) => {
    const result = await db.one(
      `UPDATE ${FormSubstep.tableName} SET name = $1, technical_drawing_numbering = $2, tools = $3, description = $4, actual_dimension = $5, lower_tolerance = $6, upper_tolerance = $7, example_visual_url = $8, status = $9, type = $10 WHERE id = $11 RETURNING *`,
      [name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, id]
    );
    return result;
  },

  delete: async (id) => {
    await db.none(`DELETE FROM ${FormSubstep.tableName} WHERE id = $1`, [id]);
  },
};

module.exports = FormSubstep;
