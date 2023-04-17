const db = require("../config/db");

const FormStep = {
  tableName: "form_steps",

  create: async (form_id, step_name, step_order) => {
    const result = await db.one(
      `INSERT INTO ${FormStep.tableName} (form_id, step_name, step_order) VALUES ($1, $2, $3) RETURNING *`,
      [form_id, step_name, step_order]
    );
    return result;
  },

  findByFormId: async (form_id) => {
    const result = await db.any(`SELECT * FROM ${FormStep.tableName} WHERE form_id = $1 ORDER BY step_order`, [form_id]);
    return result;
  },

  update: async (id, step_name, step_order) => {
    const result = await db.one(
      `UPDATE ${FormStep.tableName} SET step_name = $1, step_order = $2 WHERE id = $3 RETURNING *`,
      [step_name, step_order, id]
    );
    return result;
  },
};

module.exports = FormStep;
