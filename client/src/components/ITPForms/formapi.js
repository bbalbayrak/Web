import axios from 'axios';

const FORMS_API_URL = 'https://portal-test.yenaengineering.nl/api/forms';
const PRODUCTS_API_URL = 'https://portal-test.yenaengineering.nl/api/products'; // Change this to the correct URL for fetching products
const API_URL = "https://portal-test.yenaengineering.nl/api";


export const getFormstable = async () => {
  try {
    const response = await axios.get(FORMS_API_URL);
    return response.data.data;
  } catch (error) {
    // console.error('Error fetching forms:', error);
    throw error;
  }
};

const FORMS_API_URL2 = 'https://portal-test.yenaengineering.nl/api/allforms';

export const getFormById = async (id) => {
  try {
    const response = await axios.get(`${FORMS_API_URL2}/${id}`);
    return response.data;
  } catch (error) {
    // console.error('Error fetching form:', error);
    throw error;
  }
};

export const createOrUpdateForm = async (formData) => {
  const apiUrl = 'https://portal-test.yenaengineering.nl/api/forms';

  const bodyFormData = new FormData();
  Object.keys(formData).forEach(key => {
    if (key !== 'steps') {
      bodyFormData.append(key, formData[key]);
    }
  });

  formData.steps.forEach((step, index) => {
    step.substeps.forEach((substep, subIndex) => {
      if (substep.example_visual_url) {
        bodyFormData.append(`example_visual`, substep.example_visual_url);
      }
      Object.keys(substep).forEach(subKey => {
        if (subKey !== 'example_visual_url') {
          bodyFormData.append(`steps[${index}].substeps[${subIndex}][${subKey}]`, substep[subKey]);
        }
      });
    });
  });

  try {
    const response = await axios.post(apiUrl, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
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
    // console.error(error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(PRODUCTS_API_URL);
    return response.data;
  } catch (error) {
    // console.error(`Error fetching products: ${error.message}`);
    throw error;
  }
};








