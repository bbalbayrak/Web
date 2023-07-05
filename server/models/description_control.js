const db = require("../config/db");

const DescriptionControl = {
  tableName: "description_controls",
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
};

module.exports = DescriptionControl;
