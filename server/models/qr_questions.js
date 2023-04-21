const db = require("../config/db");

const QRQuestion = {
  tableName: "qr_questions",

  create: async (product_id, question, input_text_yena, input_text_vendor, checkbox_yena, checkbox_vendor, vendor_question, work_id) => {
    const result = await db.one(
      `INSERT INTO ${QRQuestion.tableName} (product_id, question, input_text_yena, input_text_vendor, checkbox_yena, checkbox_vendor, vendor_question, work_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [product_id, question, input_text_yena, input_text_vendor, checkbox_yena, checkbox_vendor, vendor_question, work_id]
    );
    return result;
  },

  update: async (id, product_id, question, input_text_yena, input_text_vendor, checkbox_yena, checkbox_vendor, vendor_question, work_id) => {
    const result = await db.one(
      `UPDATE ${QRQuestion.tableName} SET product_id = $1, question = $2, input_text_yena = $3, input_text_vendor = $4, checkbox_yena = $5, checkbox_vendor = $6, vendor_question = $7, work_id = $8 WHERE id = $9 RETURNING *`,
      [product_id, question, input_text_yena, input_text_vendor, checkbox_yena, checkbox_vendor, vendor_question, work_id, id]
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
