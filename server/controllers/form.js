const Form = require("../models/form");
const FormSubstep = require("../models/form_substep");
const { FIXED_STEPS } = require("../utils/fixedsteps");
const Product = require('../models/product');
const Vendor = require('../models/vendor');
const { uploadFile } = require("../utils/upload_azure");

exports.createOrUpdateForm = async (request) => {
  try {
    const { form_id, product_id, vendor_id, steps } = request.body;
    let form;
    
    if (form_id) {
      form = await Form.findById(form_id);
      if (!form) {
        return {
          status: "fail",
          statusCode: 404,
          message: "Form not found"
        };
      }
    } else {
      form = await Form.create(product_id, vendor_id);
    }

    for (const fixedStep of FIXED_STEPS) {
      const step = steps.find(step => step.name === fixedStep.name);
      if (step) {
        for (const substep of step.substeps) {
          const example_visual_url = substep.example_visual ? 
            await uploadFile(substep.example_visual.buffer, substep.example_visual.originalname) 
            : null;

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
              example_visual_url,
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
              example_visual_url,
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
    return {
      status: "success",
      statusCode: 201,
      message: "Form successfully created or updated",
      data: form
    };
  } catch (error) {
    console.error("Error in createOrUpdateForm:", error);
    throw error;
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