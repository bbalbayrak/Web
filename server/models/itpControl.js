const db = require("../config/db");

const ItpControl = {
  tableName: "itp_controls",
  columns: {
    id: "id",
    control_name: "control_name",
  },

  create: async (control_name) => {
    const result = await db.one(
      `INSERT INTO ${ItpControl.tableName} (control_name) VALUES ($1) RETURNING *`,
      [control_name]
    );
    return result;
  },

  findById: async (id) => {
    const result = await db.oneOrNone(
      `SELECT * FROM ${ItpControl.tableName} WHERE id = $1`,
      [id]
    );
    return result;
  },
};

module.exports = ItpControl;
