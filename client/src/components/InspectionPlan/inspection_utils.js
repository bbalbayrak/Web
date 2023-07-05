export const fetchItems = async (getter, setter) => {
  try {
    const response = await getter();
    setter(response);
  } catch (error) {
    console.error(`Error fetching items: ${error}`);
  }
};


export const handleDateChange = (event, id, setInspectionPlans) => {
  const date = event.target.value; // extract value from event
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

export const handleDescriptionChange = (e, id, setDescriptions) => {
  setDescriptions(prev => ({...prev, [id]: e.target.value}))
};
