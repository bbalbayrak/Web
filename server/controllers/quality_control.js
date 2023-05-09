const QualityControl = require("../models/quality_control");
const { FIXED_STEPS } = require("../utils/fixedsteps");

function reformatResponse(response) {
  let stepsDict = {};

  response.qualityControls.forEach((qc) => {
    const stepName = qc.step_name;
    if (!(stepName in stepsDict)) {
      stepsDict[stepName] = {
        name: stepName,
        order: FIXED_STEPS.find(step => step.name === stepName).order,
        substeps: [],
      };
    }

    const substep = { ...qc };
    delete substep.step_name;
    stepsDict[stepName].substeps.push(substep);
  });

  // FIXED_STEPS kullanarak mevcut adımları doldurun veya substeps alanı boş olan adımları ekleyin
  FIXED_STEPS.forEach(({ name, order }) => {
    if (!(name in stepsDict)) {
      stepsDict[name] = {
        name,
        order,
        substeps: [],
      };
    }
  });

  const steps = Object.values(stepsDict).sort((a, b) => a.order - b.order);

  return {
    id: response.qualityControls[0].form_id,
    steps: steps,
  };
}


exports.createQualityControl = async (req, res) => {
  try {
    const { form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, image_id, substep_id, measured_value_1, measured_value_2, measured_value_3, work_id } = req.body;

    const qualityControl = await QualityControl.create(form_id, step_name, name, technical_drawing_numbering, tools, description, actual_dimension, lower_tolerance, upper_tolerance, example_visual_url, status, type, image_id, substep_id, measured_value_1, measured_value_2, measured_value_3, work_id );

    res.status(201).send({ message: "Quality control entry created successfully", qualityControl });
  } catch (error) {
    console.error("Error in createQualityControl:", error);
    res.status(500).send({ message: "Error creating quality control entry", error });
  }
};

exports.findByFormId = async (req, res) => {
  try {
    const { form_id, work_id } = req.params;

    const qualityControls = await QualityControl.findByFormId(form_id, work_id);

    const reformattedResponse = reformatResponse({
      message: "Quality control entries fetched successfully",
      qualityControls,
    });

    res.status(200).send(reformattedResponse);
  } catch (error) {
    console.error("Error in findByFormId:", error);
    res.status(500).send({ message: "Error fetching quality control entries", error });
  }
};

exports.updateQualityControl = async (req, res) => {
  try {
    const entries = req.body;

    const qualityControl = await QualityControl.update(entries);

    res.status(200).send({ message: "Quality control entries updated successfully", qualityControl });
  } catch (error) {
    console.error("Error in updateQualityControl:", error);
    res.status(500).send({ message: "Error updating quality control entries", error });
  }
};




