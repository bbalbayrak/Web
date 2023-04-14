const Vendor = require("../models/vendor");

exports.createVendor = async (req, res) => {
  try {
    const { name, odooid } = req.body;

    const newVendor = await Vendor.create(name, odooid);

    res.status(201).send({
      status: "success",
      message: "Tedarikçi başarıyla oluşturuldu.",
      data: newVendor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Tedarikçi oluşturulurken bir hata oluştu.",
    });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();

    res.status(200).send({
      status: "success",
      data: vendors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Tedarikçiler alınırken bir hata oluştu.",
    });
  }
};

exports.getVendorsByName = async (req, res) => {
  try {
    const name = req.query.name;

    if (!name) {
      return res.status(400).send({
        status: "fail",
        message: "Lütfen bir tedarikçi adı girin.",
      });
    }

    const vendors = await Vendor.findByName(name);

    res.status(200).send({
      status: "success",
      data: vendors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Tedarikçiler aranırken bir hata oluştu.",
    });
  }
};

