const ItpForm = require("../models/itpForms");
const ItpStep = require("../models/itpStep");
const ItpControl = require("../models/itpControl");

exports.createItpWithSteps = async (req, res) => {
  try {
    const { product_id, vendor_id, steps } = req.body;

    // Mevcut ITP formunu kontrol et
    let itpForm = await ItpForm.findByProductIdAndVendorId(product_id, vendor_id);

    if (!itpForm) {
      // ITP formu oluştur
      itpForm = await ItpForm.create(product_id, vendor_id);
    }

    // Adımları güncelle
    for (const step of steps) {
      // ItpControl verilerini al
      const itpControl = await ItpControl.findById(step.control_id);

      if (!itpControl) {
        return res.status(404).send({
          status: "error",
          message: `control_id: ${step.control_id} ile eşleşen bir ITP control kaydı bulunamadı.`,
        });
      }

      // Mevcut adımı kontrol et
      const existingStep = await ItpStep.findByFormIdAndControlId(itpForm.id, itpControl.id);

      if (existingStep) {
        // Adımı güncelle
        await ItpStep.update(
          existingStep.id,
          step.name,
          itpControl.id,
          itpControl.control_name,
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
      } else {
        // Yeni adımı oluştur
        await ItpStep.create(
          step.name,
          itpControl.id,
          itpControl.control_name,
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
    }

    res.status(201).send({
      status: "success",
      message: "ITP formu ve adımları başarıyla oluşturuldu veya güncellendi.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "ITP formu ve adımları oluşturulurken veya güncellenirken bir hata oluştu.",
    });
  }
};