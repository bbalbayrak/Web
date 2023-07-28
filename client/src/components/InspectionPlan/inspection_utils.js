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

export const handleUpdateClick = async (id, inspectionPlans, descriptions, currentUserId, uploadedFiles, setUpdateTrigger) => {
  const plan = inspectionPlans.find(plan => plan.id === id);

  if (descriptions || plan.documents || uploadedFiles[id]) {
    await createDescriptionControl(plan, uploadedFiles[id], descriptions, currentUserId); 
  }
  await updateInspectionPlan(plan);
  setUpdateTrigger(prevState => !prevState);
};


export const handleApproveClick = (planId, inspectionPlans, description, currentUserId, setUpdateTrigger) => (continueApproval) => async () => {
  const plan = inspectionPlans.find(plan => plan.id === planId);

  if (description || plan.documents) {
    await createDescriptionControl(plan, plan.documents, description, currentUserId); 
  }

  await approveInspectionPlan(plan, description, continueApproval);
  setUpdateTrigger(prev => !prev);
};

export const handleRejectClick = (planId, inspectionPlans, description, currentUserId, setUpdateTrigger) => (continueApproval) => async () => {
  const plan = inspectionPlans.find(plan => plan.id === planId);

  if (description || plan.documents) {
    await createDescriptionControl(plan, plan.documents, description, currentUserId); 
  }

  await rejectInspectionPlan(plan, description, continueApproval);
  setUpdateTrigger(prev => !prev);
};

export const handleDeleteClick = async (id, setInspectionPlans) => {
  deleteInspectionPlan(id);
  setInspectionPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
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

export const handleControlMethod = (event, id, setInspectionPlans) => {
  const newControlMethod = event.target.value;
  setInspectionPlans(prevPlans =>
    prevPlans.map(plan =>
      plan.id === id ? { ...plan, control_method: newControlMethod } : plan
    )
  );
};

export const handleControlResponsibleChange = (selectedOptions, id, setInspectionPlans) => {
  const selectedUserIds = selectedOptions.map(option => option.value);
  setInspectionPlans(prevPlans =>
    prevPlans.map(plan =>
      plan.id === id ? { ...plan, control_responsible: selectedUserIds } : plan
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

export const handleFileUpload = (event, planId, setUploadedFiles) => {
  setUploadedFiles(prevFiles => {
    return { ...prevFiles, [planId]: event.target.files[0] };
  });
};

export const getUserNameById = (users, id) => {
  const user = users.find(user => user.id.toString() === id.toString());
  return user ? user.name : '';
}

export const getStatusStyle = status => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'inline-block text-white bg-green-600 px-2 py-1 rounded-full border border-green-800';
    case 'rejected':
      return 'inline-block text-white bg-red-600 px-2 py-1 rounded-full border border-red-800';
    case 'draft':
      return 'inline-block text-white bg-gray-600 px-2 py-1 rounded-full border border-gray-800';
    case 'waiting':
      return 'inline-block text-white bg-blue-600 px-2 py-1 rounded-full border border-blue-800';
    default:
      return 'inline-block text-black px-2 py-1 rounded-full border border-black';
  }
};

export const getStateStyle = state => {
  switch (state.toLowerCase()) {
    case 'open':
      return 'inline-block text-white bg-green-600 px-2 py-1 rounded-full border border-green-800';
    case 'closed':
      return 'inline-block text-white bg-red-600 px-2 py-1 rounded-full border border-red-800';
    case 'in progress':
      return 'inline-block text-white bg-yellow-600 px-2 py-1 rounded-full border border-yellow-800';
    case 'awaiting approval':
      return 'inline-block text-white bg-blue-600 px-2 py-1 rounded-full border border-blue-800';
    default:
      return 'inline-block text-black px-2 py-1 rounded-full border border-black';
  }
};