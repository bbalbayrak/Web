const ItpForm = require("../models/itpForms");
const ItpStep = require("../models/itpStep");
const ItpControl = require("../models/itpControl");

exports.createItpWithSteps = async (req, res) => {
  try {
    const { product_id, vendor_id, steps } = req.body;

    // ITP formu oluştur
    const itpForm = await ItpForm.create(product_id, vendor_id);

    // Adımları oluştur
    for (const step of steps) {
      // ItpControl verilerini al
      const itpControl = await ItpControl.findById(step.control_id);

      if (!itpControl) {
        return res.status(404).send({
          status: "error",
          message: `control_id: ${step.control_id} ile eşleşen bir ITP control kaydı bulunamadı.`,
        });
      }
      const control_name = itpControl.control_name;

      await ItpStep.create(
        step.name, 
        itpControl.id,
        control_name,
        itpForm.id, 
        step.technical_drawing_numbering, 
        step.tools, 
        step.description, 
        step.actual_dimension, 
        step.lower_tolerance, 
        step.upper_tolerance, 
        step.example_visual_url, 
        step.status, 
        step.type
        );
    }

    res.status(201).send({
      status: "success",
      message: "ITP formu ve adımları başarıyla oluşturuldu.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "ITP formu ve adımları oluşturulurken bir hata oluştu.",
    });
  }
};
