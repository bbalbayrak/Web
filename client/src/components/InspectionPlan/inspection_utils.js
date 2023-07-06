import {
  updateInspectionPlan,
  approveInspectionPlan,
  rejectInspectionPlan,
  deleteInspectionPlan,
  createDescriptionControl
} from './inspectionapi';

export const fetchItems = async (getter, setter) => {
  try {
    const response = await getter();
    setter(response);
  } catch (error) {
    console.error(`Error fetching items: ${error}`);
  }
};

export const handleUpdateClick = async (id, inspectionPlans, descriptions, currentUserId, setUpdateTrigger) => {
  const plan = inspectionPlans.find(plan => plan.id === id);

  if (descriptions || plan.documents) {
    await createDescriptionControl(plan, plan.documents, descriptions, currentUserId); 
  }
  await updateInspectionPlan(plan);
  setUpdateTrigger(prevState => !prevState);
};

export const handleApproveClick = async (planId, inspectionPlans, description, currentUserId, setUpdateTrigger) => {
  const plan = inspectionPlans.find(plan => plan.id === planId);

  if (description || plan.documents) {
    await createDescriptionControl(plan, plan.documents, description, currentUserId); 
  }

  const continueApproval = window.confirm("Do you want to continue or finish? Click 'OK' to continue, 'Cancel' to finish");
  await approveInspectionPlan(plan, description, continueApproval);
  setUpdateTrigger(prev => !prev);
};

export const handleRejectClick = async (planId, inspectionPlans, description, currentUserId, setUpdateTrigger) => {
  const plan = inspectionPlans.find(plan => plan.id === planId);

  if (description || plan.documents) {
    await createDescriptionControl(plan, plan.documents, description, currentUserId); 
  }

  const continueApproval = window.confirm("Do you want to continue or finish? Click 'OK' to continue, 'Cancel' to finish");
  await rejectInspectionPlan(plan, description, continueApproval);
  setUpdateTrigger(prev => !prev);
};

export const handleCrossClick = async (id, setInspectionPlans) => {
  if (window.confirm('Silmek istediğinize emin misiniz?')) {
    deleteInspectionPlan(id);
    setInspectionPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
  }
};

export const handleDateChange = (event, id, setInspectionPlans) => {
  const date = event.target.value;
  setInspectionPlans(prevPlans =>
    prevPlans.map(plan =>
      plan.id === id ? { ...plan, control_date: date } : plan
    )
  );
};

export const handleControlTypeChange = (event, id, setInspectionPlans) => {
  const newControlType = event.target.value;
  setInspectionPlans(prevPlans =>
    prevPlans.map(plan =>
      plan.id === id ? { ...plan, control_type: newControlType } : plan
    )
  );
};

export const handleControlResponsibleChange = (event, id, setInspectionPlans) => {
  const newControlResponsible = event.target.value;
  setInspectionPlans(prevPlans =>
    prevPlans.map(plan =>
      plan.id === id ? { ...plan, control_responsible: newControlResponsible } : plan
    )
  );
};

export const handleDescriptionChange = (event, planId, descriptionControls, setDescriptionControls) => {
  const updatedDescriptions = {
    ...descriptionControls,
    [planId]: event.target.value
  };
  setDescriptionControls(updatedDescriptions);
};

