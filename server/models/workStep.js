const db = require("../config/db");

const WorkStep = {
  tableName: "work_steps",

  create: async (work_id, step_name, timestamp, state, status) => {
    const result = await db.one(
      `INSERT INTO ${WorkStep.tableName} (work_id, step_name, timestamp, state, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [work_id, step_name, timestamp, state, status]
    );
    return result;
  },

  findAllByWorkId: async (work_id) => {
    const result = await db.any(`SELECT * FROM ${WorkStep.tableName} WHERE work_id = $1`, [work_id]);
    return result;
  },
  
  findAllByWorkStatus: async (status) => {
    const result = await db.any(`SELECT * FROM ${WorkStep.tableName} WHERE state = $1`, [status]);
    return result;
  },
  
  updateState: async (id, state) => {
    const result = await db.one(`UPDATE ${WorkStep.tableName} SET state = $1 WHERE id = $2 RETURNING *`, [state, id]);
    return result;
  },
  
  delete: async (id) => {
    await db.none(`DELETE FROM ${WorkStep.tableName} WHERE id = $1`, [id]);
  },
};

module.exports = WorkStep;
