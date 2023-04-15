const db = require("../config/db");

const ItpSubstep = {
  tableName: "itp_substeps",
  columns: {
    id: "id",
    name: "name",
    description: "description",
    status: "status",
    lower_tolerance: "lower_tolerance",
    upper_tolerance: "upper_tolerance",
    measurement: "measurement",
    type: "type",
    itp_step_id: "itp_step_id",
  },

  create: async (name, description, status, lower_tolerance, upper_tolerance, measurement, type, itp_step_id) => {
    const result = await db.one(
      `INSERT INTO ${ItpSubstep.tableName} (name, description, status, lower_tolerance, upper_tolerance, measurement, type, itp_step_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, description, status, lower_tolerance, upper_tolerance, measurement, type, itp_step_id]
    );
    return result;
  },

  findByStepId: async (step_id) => {
    const result = await db.any(
      `SELECT * FROM ${ItpSubstep.tableName} WHERE itp_step_id = $1`,
      [step_id]
    );
    return result;
  },
};

module.exports = ItpSubstep;
