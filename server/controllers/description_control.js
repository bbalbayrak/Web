const DescriptionControl = require("../models/description_control");
const { uploadFile } = require("../utils/upload_azure");

exports.createDescriptionControl = async (request) => {
  try {
    const { inspectionplan_id, description, creator_id } = request.body;
    const document = request.body.documents;
    
    const document_url = document
      ? await uploadFile(document.buffer, document.originalname)
      : null;

    const result = await DescriptionControl.create(inspectionplan_id, description, document_url, creator_id);
    return {
      status: "success",
      statusCode: 201,
      data: result,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
