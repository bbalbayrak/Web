const db = require("../config/db");

const ItpStep = {
  tableName: "itp_steps",
  columns: {
    id: "id",
    name: "name",
    control_id: "control_id",
    control_name: "control_name",
    itp_form_id: "itp_form_id",
    technical_drawing_numbering: "technical_drawing_numbering",
    tools: "tools",
    description: "description",
    actual_dimension: "actual_dimension",
    lower_tolerance: "lower_tolerance",
    upper_tolerance: "upper_tolerance",
    example_visual_url: "example_visual_url",
    status: "status",
    type: "type",
  },

  create: async (
    name,
    control_id,
    control_name,
    itp_form_id,
    technical_drawing_numbering,
    tools,
    description,
    actual_dimension,
    lower_tolerance,
    upper_tolerance,
    example_visual_url,
    status,
    type
  ) => {
    const result = await db.one(
      `INSERT INTO ${ItpStep.tableName} (name, control_id, control_name, itp_form_id, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        name,
        control_id,
        control_name,
        itp_form_id,
        technical_drawing_numbering,
        tools,
        description,
        actual_dimension,
        lower_tolerance,
        upper_tolerance,
        example_visual_url,
        status,
        type,
      ]
    );
    return result;
  },
};

module.exports = ItpStep;
