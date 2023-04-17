const Form = require("../models/form");
const FormStep = require("../models/form_step");
const FormSubstep = require("../models/form_substep");

exports.createForm = async (req, res) => {
  try {
    const { product_id, vendor_id, steps } = req.body;

    const newForm = await Form.create(product_id, vendor_id);

    for (const step of steps) {
      const newFormStep = await FormStep.create(newForm.id, step.name, step.order);

      for (const substep of step.substeps) {
        await FormSubstep.create(
            newFormStep.id,
            substep.name,
            substep.technical_drawing_numbering,
            substep.tools,
            substep.description,
            substep.actual_dimension,
            substep.lower_tolerance,
            substep.upper_tolerance,
            substep.example_visual_url,
            substep.status,
            substep.type
          );
        }
      }
  
      res.status(201).send({ message: "Form successfully created", form: newForm });
    } catch (error) {
      res.status(500).send({ message: "Error creating form", error: error.message });
    }
  };
  
  exports.getForm = async (req, res) => {
    try {
      const formId = req.params.id;
      const form = await Form.findById(formId);
  
      if (!form) {
        res.status(404).send({ message: "Form not found" });
        return;
      }
  
      const steps = await FormStep.findByFormId(formId);
      for (const step of steps) {
        step.substeps = await FormSubstep.findByFormStepId(step.id);
      }
  
      form.steps = steps;
      res.status(200).send({ form });
    } catch (error) {
      res.status(500).send({ message: "Error retrieving form", error: error.message });
    }
  };

  exports.updateFormStep = async (req, res) => {
    try {
      const { form_step_id, step_name, step_order } = req.body;
  
      const updatedStep = await FormStep.update(form_step_id, step_name, step_order);
  
      res.status(200).send({
        status: "success",
        message: "Form adımı başarıyla güncellendi.",
        data: updatedStep,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "Form adımı güncellenirken bir hata oluştu.",
      });
    }
  };
  
  // form alt adımı güncelleme
  exports.updateFormSubstep = async (req, res) => {
    try {
      const { form_substep_id, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type } = req.body;
  
      const updatedSubstep = await FormSubstep.update(form_substep_id, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type);
  
      res.status(200).send({
        status: "success",
        message: "Form alt adımı başarıyla güncellendi.",
        data: updatedSubstep,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "Form alt adımı güncellenirken bir hata oluştu.",
      });
    }
  };
  
  // form alt adımı ekleme
  exports.addFormSubstep = async (req, res) => {
    try {
      const { form_step_id, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type } = req.body;
  
      const newSubstep = await FormSubstep.create(form_step_id, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type);
  
      res.status(201).send({
        status: "success",
        message: "Form alt adımı başarıyla eklendi.",
        data: newSubstep,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "Form alt adımı eklenirken bir hata oluştu.",
      });
    }
  };
  
  // form alt adımı silme
  exports.deleteFormSubstep = async (req, res) => {
    try {
      const { form_substep_id } = req.body;

      await FormSubstep.delete(form_substep_id);

      res.status(200).send({
        status: "success",
        message: "Form alt adımı başarıyla silindi.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "Form alt adımı silinirken bir hata oluştu.",
      });
    }
  };

  // form adımı ve alt adımlarını getirme
  exports.getFormStepsAndSubsteps = async (req, res) => {
    try {
      const { product_id, vendor_id } = req.query;

      const form = await Form.findByProductIdAndVendorId(product_id, vendor_id);

      if (!form) {
        return res.status(404).send({
          status: "error",
          message: "Form bulunamadı.",
        });
      }

      const steps = await FormStep.findByFormId(form.id);
      const stepsWithSubsteps = [];

      for (const step of steps) {
        const substeps = await FormSubstep.findByFormStepId(step.id);
        stepsWithSubsteps.push({ ...step, substeps });
      }

      res.status(200).send({
        status: "success",
        data: stepsWithSubsteps,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "Form adımları ve alt adımları getirilirken bir hata oluştu.",
      });
    }
  };
  exports.getFormByProductIdAndVendorId = async (req, res) => {
    try {
      const { product_id, vendor_id } = req.query;
  
      const form = await Form.findByProductIdAndVendorId(product_id, vendor_id);
  
      if (!form) {
        return res.status(404).send({
          status: "error",
          message: "Form bulunamadı",
        });
      }
  
      const steps = await FormStep.findByFormId(form.id);
  
      for (const step of steps) {
        step.substeps = await FormSubstep.findByFormStepId(step.id);
      }
  
      res.status(200).send({
        status: "success",
        data: {
          form,
          steps,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "Form ve adımları getirilemedi",
      });
    }
  };