const db = require("../config/db");

const DescriptionControl = {
  tableName: "description_control",
  columns: {
    id: "id",
    inspectionplan_id: "inspectionplan_id",
    description: "description",
    documents: "documents",
    creator_id: "creator_id",
    creation_date: "creation_date",
  },

  create: async (inspectionplan_id, description, document_url, creator_id) => {
    const result = await db.one(
      `INSERT INTO ${DescriptionControl.tableName} (inspectionplan_id, description, documents, creator_id, creation_date) VALUES ($1, $2, $3, $4, CURRENT_DATE) RETURNING *`,
      [inspectionplan_id, description, document_url, creator_id]
    );
    return result;
  },
  
  getAll: async () => {
    const result = await db.manyOrNone(
      `SELECT * FROM ${DescriptionControl.tableName}`
    );
    return result;
},

  getByInspectionPlanId: async (inspectionplan_id) => {
    const result = await db.oneOrNone(
      `SELECT * FROM ${DescriptionControl.tableName} WHERE inspectionplan_id = $1`,
      [inspectionplan_id]
    );
    return result;
  },
  
  update: async (inspectionplan_id, description, document_url, creator_id) => {
    const result = await db.one(
      `UPDATE ${DescriptionControl.tableName} SET description = $2, documents = $3, creator_id = $4 WHERE inspectionplan_id = $1 RETURNING *`,
      [inspectionplan_id, description, document_url, creator_id]
    );
    return result;
  },

};

module.exports = DescriptionControl;
