const ItpControl = require("../models/itpControl");

exports.createItpControl = async (req, res) => {
  try {
    const control_names = req.body.control_names;
    const newControls = [];

    for (const control_name of control_names) {
      const newItpControl = await ItpControl.create(control_name);
      newControls.push(newItpControl);
    }

    res.status(201).send({
      status: "success",
      message: "ITP control başarıyla oluşturuldu.",
      data: newControls,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "ITP control oluşturulurken bir hata oluştu.",
    });
  }
};


exports.getItpControlById = async (req, res) => {
  try {
    const { id } = req.params;
    const itpControl = await ItpControl.findById(id);

    if (!itpControl) {
      return res.status(404).send({
        status: "error",
        message: `id: ${id} ile eşleşen bir ITP control kaydı bulunamadı.`,
      });
    }

    res.status(200).send({
      status: "success",
      data: itpControl
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "ITP control verisi alınırken bir hata oluştu.",
    });
  }
};
