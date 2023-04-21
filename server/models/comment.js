const db = require("../config/db");

const Comment = {
  tableName: "comments",

  create: async (text, created_by, created_on, work_id) => {
    const result = await db.one(
      `INSERT INTO ${Comment.tableName} (text, created_by, created_on, work_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [text, created_by, created_on, work_id]
    );
    return result;
  },

  findByWorkId: async (work_id) => {
    const result = await db.any(
      `SELECT * FROM ${Comment.tableName} WHERE work_id = $1`,
      [work_id]
    );
    return result;
  },

  update: async (id, text) => {
    const result = await db.oneOrNone(
      `UPDATE ${Comment.tableName} SET text = $2 WHERE id = $1 RETURNING *`,
      [id, text]
    );
    return result;
  },

  delete: async (id) => {
    const result = await db.result(
      `DELETE FROM ${Comment.tableName} WHERE id = $1`,
      [id]
    );
    return result.rowCount;
  },
};

module.exports = Comment;
