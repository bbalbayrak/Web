const db = require("../config/db");

const QRQuestion = {
  tableName: "qr_questions",

  create: async ( product_id, question, input_text, checkbox, vendor_question, work_id, step_id ) => {
    const result = await db.one(
      `INSERT INTO ${QRQuestion.tableName} ( product_id, question, input_text, checkbox, vendor_question, work_id, step_id ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [ product_id, question, input_text, checkbox, vendor_question, work_id, step_id ]
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

  update: async (id, product_id, question, input_text, checkbox, vendor_question, work_id, step_id) => {
    const result = await db.one(
      `UPDATE ${QRQuestion.tableName} SET product_id = $1, question = $2, input_text = $3, checkbox = $4, vendor_question = $5, work_id = $6, step_id = $7 WHERE id = $8 RETURNING *`,
      [product_id, question, input_text, checkbox, vendor_question, work_id, step_id, id]
    );
    return result;
  },
};

module.exports = QRQuestion;
