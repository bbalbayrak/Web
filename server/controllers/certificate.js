const Certificate = require("../models/certificate");

exports.createCertificate = async (req, res) => {
  try {
    const { work_id, url, product_id } = req.body;
    const newCertificate = await Certificate.create(work_id, url, product_id);
    res.status(201).send({ message: "Certificate created successfully", certificate: newCertificate });
  } catch (error) {
    res.status(500).send({ message: "Error creating certificate", error: error.message });
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
