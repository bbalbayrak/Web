const db = require("../config/db");

const ItpStep = {
  tableName: "itp_steps",
  columns: {
    id: "id",
    name: "name",
    itp_form_id: "itp_form_id",
  },

  create: async (name, itp_form_id) => {
    const result = await db.one(
      `INSERT INTO ${ItpStep.tableName} (name, itp_form_id) VALUES ($1, $2) RETURNING *`,
      [name, itp_form_id]
    );
    return result;
  },

  findByItpFormId: async (itp_form_id) => {
    const result = await db.any(
      `SELECT * FROM ${ItpStep.tableName} WHERE itp_form_id = $1`,
      [itp_form_id]
    );
    return result;
  },
};

module.exports = ItpStep;
