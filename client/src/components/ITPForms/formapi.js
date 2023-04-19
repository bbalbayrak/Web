import axios from 'axios';

const FORMS_API_URL = 'http://localhost:3001/forms';

export const getFormstable = async () => {
  try {
    const response = await axios.get(FORMS_API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

const FORMS_API_URL2 = 'http://localhost:3001/allforms';

export const getFormById = async (id) => {
  try {
    const response = await axios.get(`${FORMS_API_URL2}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching form:', error);
    throw error;
  }
};

export const createOrUpdateForm = async (formData) => {
  const apiUrl = 'http://localhost:3001/forms';

  const promises = formData.steps.map(async (step) => {
    if (step.substeps.length > 0) {
      step.substeps = await Promise.all(step.substeps.map(async (substep,form_id) => {
        if (substep.id) {
          const response = await fetch(`${apiUrl}/${form_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(substep),
          });
          return await response.json();
        } else {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(substep),
          });
          return await response.json();
        }
      }));
    }
  });

  await Promise.all(promises);
}