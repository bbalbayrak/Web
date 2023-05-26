const db = require("../config/db");

const FormSubstep = {
  tableName: "form_substeps",

  create: async (form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, sample_quantity) => {
    const result = await db.one(
      `INSERT INTO ${FormSubstep.tableName} (form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, sample_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, sample_quantity]
    );
    return result;
  },

  update: async (id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, sample_quantity) => {
    const result = await db.one(
      `UPDATE ${FormSubstep.tableName} SET step_name= $1, name = $2, technical_drawing_numbering = $3, tools = $4, description = $5, actual_dimension = $6, lower_tolerance = $7, upper_tolerance = $8, example_visual_url = $9, status = $10, type = $11, sample_quantity = $12 WHERE id = $13 RETURNING *`,
      [step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, sample_quantity, id]
    );
    return result;
  },

  delete: async (id) => {
    await db.none(`DELETE FROM ${FormSubstep.tableName} WHERE id = $1`, [id]);
  },
  
  findAllByFormId: async (form_id) => {
    const result = await db.any(`SELECT * FROM ${FormSubstep.tableName} WHERE form_id = $1`, [form_id]);
    return result;
  },

};

module.exports = FormSubstep;