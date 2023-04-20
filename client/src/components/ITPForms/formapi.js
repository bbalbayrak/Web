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

  const body = {
    ...formData,
    steps: formData.steps.map((step, index) => ({
      ...step,
      substeps:
        index === 1
          ? step.substeps.map((substep) => {
              if (substep.id) {
                return substep;
              } else {
                const { id, ...rest } = substep;
                return rest;
              }
            })
          : [],
    })),
  };

  if (formData.id) {
    body.form_id = formData.id;
  }

  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
