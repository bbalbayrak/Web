import axios from 'axios';

const FORMS_API_URL = 'http://localhost:3001/forms';
const VENDORS_API_URL = 'http://localhost:3001/vendors'; // Change this to the correct URL for fetching vendors
const PRODUCTS_API_URL = 'http://localhost:3001/products'; // Change this to the correct URL for fetching products
const API_URL = "http://localhost:3001";


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


export const getVendors = async () => {
  try {
    const response = await fetch(`${API_URL}/vendors`);
    if (!response.ok) {
      throw new Error(`Error fetching vendors: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(PRODUCTS_API_URL);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    throw error;
  }
};








