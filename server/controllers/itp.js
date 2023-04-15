const ItpForm = require("../models/itpForms");
const ItpStep = require("../models/itpStep");
const ItpSubstep = require("../models/itpSubstep");

exports.createItpForm = async (req, res) => {
    try {
      const { product_id, vendor_id } = req.body;
      const result = await ItpForm.create(product_id, vendor_id);
      res.status(201).send({
        status: "success",
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "ITP formu oluşturulurken bir hata oluştu.",
      });
    }
  };
  
  exports.createItpStep = async (req, res) => {
    try {
      const { name, itp_form_id } = req.body;
      const result = await ItpStep.create(name, itp_form_id);
      res.status(201).send({
        status: "success",
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "ITP step oluşturulurken bir hata oluştu.",
      });
    }
  };
  
  exports.createItpSubstep = async (req, res) => {
    try {
      const {
        name,
        description,
        status,
        lower_tolerance,
        upper_tolerance,
        measurement,
        type,
        itp_step_id,
      } = req.body;
      const result = await ItpSubstep.create(
        name,
        description,
        status,
        lower_tolerance,
        upper_tolerance,
        measurement,
        type,
        itp_step_id
      );
      res.status(201).send({
        status: "success",
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "ITP substep oluşturulurken bir hata oluştu.",
      });
    }
  };

  exports.getItpDetails = async (req, res) => {
    try {
      const itp_form_id = req.params.id;
      
      const itpForm = await ItpForm.findById(itp_form_id);
      const itpSteps = await ItpStep.findByItpFormId(itp_form_id);
  
      for (let i = 0; i < itpSteps.length; i++) {
        const step_id = itpSteps[i].id;
        const substeps = await ItpSubstep.findByStepId(step_id);
        itpSteps[i].substeps = substeps;
      }
  
        itpForm.steps = itpSteps;

        res.status(200).send({
        status: "success",
        data: {
            itpForm,
        },
        });
    } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "ITP detayları alınırken bir hata oluştu.",
    });
  }
};
  
exports.createItpWithStepsAndSubsteps = async (req, res) => {
    try {
      const { product_id, vendor_id, steps } = req.body;
  
      // ITP formu oluştur
      const itpForm = await ItpForm.create(product_id, vendor_id);
  
      // Adımları ve alt adımları oluştur
      for (const step of steps) {
        const createdStep = await ItpStep.create(step.name, itpForm.id);
  
        for (const substep of step.substeps) {
          await ItpSubstep.create(
            substep.name,
            substep.description,
            substep.status,
            substep.lower_tolerance,
            substep.upper_tolerance,
            substep.measurement,
            substep.type,
            createdStep.id
          );
        }
      }
  
      res.status(201).send({
        status: "success",
        message: "ITP formu, adımları ve alt adımları başarıyla oluşturuldu.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "ITP formu, adımları ve alt adımları oluşturulurken bir hata oluştu.",
      });
    }
  };
  
  exports.getAllItps = async (req, res) => {
    try {
      const itpForms = await ItpForm.getAllItps();
  
      for (const itpForm of itpForms) {
        const itp_form_id = itpForm.id;
        const itpSteps = await ItpStep.findByItpFormId(itp_form_id);
  
        for (let i = 0; i < itpSteps.length; i++) {
          const step_id = itpSteps[i].id;
          const substeps = await ItpSubstep.findByStepId(step_id);
          itpSteps[i].substeps = substeps;
        }
  
        itpForm.steps = itpSteps;
      }
  
      res.status(200).send({
        status: "success",
        data: {
          itpForms,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "An error occurred while fetching all ITPs with details.",
      });
    }
  };
  
  