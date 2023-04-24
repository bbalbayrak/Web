const Certificate = require("../models/certificate");
const { uploadFile } = require("../utils/upload_azure");

exports.createCertificate = async (request) => {
  try {
    const { work_id, product_id, step_id } = request.body; // product_id'yi geri ekleyin
    const certificateFile = request.file;

    const certificate_url = certificateFile
      ? await uploadFile(certificateFile.buffer, certificateFile.originalname)
      : null;

    const result = await Certificate.create(work_id, certificate_url, product_id, step_id); // product_id'yi geri ekleyin
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

exports.getCertificatesByWorkId = async (req, res) => {
  try {
    const work_id = req.params.work_id;
    const certificates = await Certificate.findByWorkId(work_id);
    res.status(200).send({ data: certificates });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving certificates", error: error.message });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const id = req.params.id;
    const { work_id, url, product_id } = req.body;
    const updatedCertificate = await Certificate.update(id, work_id, url, product_id);
    res.status(200).send({ message: "Certificate updated successfully", data: updatedCertificate });
  } catch (error) {
    res.status(500).send({ message: "Error updating certificate", error: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const id = req.params.id;
    await Certificate.delete(id);
    res.status(200).send({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting certificate", error: error.message });
  }
};
