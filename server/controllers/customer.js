const Customer = require("../models/customer");

exports.createCustomer = async (req, res) => {
  try {
    const { name, odooid } = req.body;

    const newCustomer = await Customer.create(name, odooid);

    res.status(201).send({
      status: "success",
      message: "Müşteri başarıyla oluşturuldu.",
      data: newCustomer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Müşteri oluşturulurken bir hata oluştu.",
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();

    res.status(200).send({
      status: "success",
      data: customers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Müşteriler alınırken bir hata oluştu.",
    });
  }
};

exports.getCustomersByName = async (req, res) => {
  try {
    const name = req.query.name;

    if (!name) {
      return res.status(400).send({
        status: "fail",
        message: "Lütfen bir müşteri adı girin.",
      });
    }

    const customers = await Customer.findByName(name);

    res.status(200).send({
      status: "success",
      data: customers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Müşteriler aranırken bir hata oluştu.",
    });
  }
};
