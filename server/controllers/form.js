const Form = require("../models/form");
const FormSubstep = require("../models/form_substep");
const { FIXED_STEPS } = require("../utils/fixedsteps");
const Product = require('../models/product');
const Vendor = require('../models/vendor');

exports.createOrUpdateForm = async (req, res) => {
  try {
    const { form_id, product_id, vendor_id, steps } = req.body;
    let form;
    
    if (form_id) {
      form = await Form.findById(form_id);
      if (!form) {
        res.status(404).send({ message: "Form not found" });
        return;
      }
    } else {
      form = await Form.create(product_id, vendor_id);
    }

    for (const fixedStep of FIXED_STEPS) {
      const step = steps.find(step => step.name === fixedStep.name);
      if (step) {
        for (const substep of step.substeps) {
          if (substep.id) {
            await FormSubstep.update(
              substep.id,
              fixedStep.name,
              substep.name,
              substep.technical_drawing_numbering,
              substep.tools,
              substep.description,
              substep.actual_dimension,
              substep.lower_tolerance,
              substep.upper_tolerance,
              substep.example_visual_url,
              substep.status,
              substep.type,
              substep.sample_quantity
            );
          } else {
            await FormSubstep.create(
              form.id,
              fixedStep.name,
              substep.name,
              substep.technical_drawing_numbering,
              substep.tools,
              substep.description,
              substep.actual_dimension,
              substep.lower_tolerance,
              substep.upper_tolerance,
              substep.example_visual_url,
              substep.status,
              substep.type,
              substep.sample_quantity
            );
          }
        }
      } else {
        throw new Error(`Unable to find a matching step for fixed step: ${fixedStep.name}`);
      }
    }
    res.status(201).send({ message: "Form successfully created or updated", form });
  } catch (error) {
    console.error("Error in createOrUpdateForm:", error);
    res.status(500).send({ message: "Error creating or updating form", error: error.message });
  }
};



exports.getFormTable = async (req, res) => {
  try {
    const forms = await Form.getAll();
    res.status(200).send({ data: forms });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving forms", error: error.message });
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
    const product = await Product.findById(form.product_id);
    const vendor = await Vendor.findById(form.vendor_id);
    res.status(200).send({
      form: {
        ...form,
        product_name: product.name, 
        vendor_name: vendor.name, 
      },
    });
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving form', error: error.message });
  }
};

exports.updateMultipleSubsteps = async (req, res) => {
  try {
    const substeps = req.body.substeps;
    
    for (const substep of substeps) {
      const {
        id,
        step_name,
        name,
        technical_drawing_numbering,
        tools,
        description,
        actual_dimension,
        lower_tolerance,
        upper_tolerance,
        example_visual_url,
        status,
        type,
        sample_quantity
      } = substep;

      await FormSubstep.update(
        id,
        step_name,
        name,
        technical_drawing_numbering,
        tools,
        description,
        actual_dimension,
        lower_tolerance,
        upper_tolerance,
        example_visual_url,
        status,
        type,
        sample_quantity
      );
    }

    res.status(200).json({ message: "Substeps updated successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

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

exports.getAllForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);

    if (!form) {
      res.status(404).send({ message: "Form not found" });
      return;
    }
    const product = await Product.findById(form.product_id);
    const vendor = await Vendor.findById(form.vendor_id);

    const formSubsteps = await FormSubstep.findAllByFormId(formId);
    const stepsWithSubsteps = FIXED_STEPS.map((fixedStep) => {
      return {
        ...fixedStep,
        substeps: formSubsteps.filter((substep) => substep.step_name === fixedStep.name),
      };
    });

    res.status(200).send({
      id: form.id,
      product_id: form.product_id,
      vendor_id: form.vendor_id,
      product_name: product.name,
      vendor_name: vendor.name,
      steps: stepsWithSubsteps,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving form', error: error.message });
  }
};

exports.getFormByVendorIdAndProductId = async (req, res) => {
  try {
    const { vendor_id, product_id } = req.params;
    const form = await Form.findByVendorIdAndProductId(vendor_id, product_id);

    if (!form) {
      res.status(404).send({ message: "Form not found" });
      return;
    }

    res.status(200).send({ form });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving form", error: error.message });
  }
};

exports.uploadImageToAzure = async (req, res) => {
  try {
    const file = req.body.file; // Now using req.body.file instead of req.file
    const fileName = uuidv1(); // unique filename
    const imageUrl = await uploadFile(file, fileName);

    res.status(200).send({ imageUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send({ message: "Error uploading image to Azure", error: error.message });
  }
};
