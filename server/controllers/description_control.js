const DescriptionControl = require("../models/description_control");
const { uploadFile } = require("../utils/upload_azure");

exports.createOrUpdateDescriptionControl = async (request) => {
  try {
    const { inspectionplan_id, description, creator_id } = request.body;
    const document = request.body.documents;
    
    const document_url = document
      ? await uploadFile(document.buffer, document.originalname)
      : null;

    // Check if a record exists with the given inspectionplan_id
    const existingRecord = await DescriptionControl.getByInspectionPlanId(inspectionplan_id);

    let result;
    if (existingRecord) {
      // If a record exists, update it
      result = await DescriptionControl.update(inspectionplan_id, description, document_url, creator_id);
    } else {
      // If no record exists, create a new one
      result = await DescriptionControl.create(inspectionplan_id, description, document_url, creator_id);
    }

    return {
      status: "success",
      statusCode: existingRecord ? 200 : 201,  // Return 200 for updates, 201 for creation
      data: result,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.getDescriptionControl = async () => {
  try {
    const result = await DescriptionControl.getAll();
    return {
      status: "success",
      statusCode: 200,
      data: result,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
