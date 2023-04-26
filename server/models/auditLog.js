const db = require("../config/db");

const AuditLog = {
  tableName: "audit_logs",

  create: async (action, table_name, row_id, old_data, new_data) => {
    const result = await db.one(
      `INSERT INTO ${AuditLog.tableName} (action, table_name, row_id, old_data, new_data) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [action, table_name, row_id, old_data, new_data]
    );
    return result;
  },
};

module.exports = AuditLog;
