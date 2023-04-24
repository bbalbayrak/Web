const db = require("../config/db");

const QRQuestion = {
  tableName: "qr_questions",

  create: async (product_id, question, input_text, checkbox, vendor_question, work_id, step_id, user_id, timestamp) => {
    const result = await db.one(
      `INSERT INTO ${QRQuestion.tableName} (product_id, question, input_text, checkbox, vendor_question, work_id, step_id, user_id, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [product_id, question, input_text, checkbox, vendor_question, work_id, step_id, user_id, timestamp]
    );
    return result;
  },

  findByProductId: async (product_id) => {
    const result = await db.any(`SELECT * FROM ${QRQuestion.tableName} WHERE product_id = $1`, [product_id]);
    return result;
  },

  findByWorkId: async (work_id) => {
    const result = await db.any(`SELECT * FROM ${QRQuestion.tableName} WHERE work_id = $1`, [work_id]);
    return result;
  },
};

module.exports = QRQuestion;