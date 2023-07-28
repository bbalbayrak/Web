import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getFormstable = async () => {
  try {
    const response = await axios.get(`${API_URL}/forms`);
    return response.data.data;
  } catch (error) {
    // console.error('Error fetching forms:', error);
    throw error;
  }
};

export const getFormById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}forms/${id}`);
    return response.data;
  } catch (error) {
    // console.error('Error fetching form:', error);
    throw error;
  }
};

export const createOrUpdateForm = async (formData) => {
  const apiUrl = `${API_URL}/forms`;
  
  const body = {
    ...formData,
    steps: formData.steps.map((step) => ({
      ...step,
      substeps: step.substeps.map((substep) => {
        if (substep.id) {
          return substep;
        } else {
          const { id, ...rest } = substep;
          return rest;
        }
      }),
    })),
  };
  console.log("Form", body);
  if (formData.id) {
    body.form_id = formData.id;
  }

  console.log("Body before sending:", body);
  
  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  console.log("Form sent successfully");
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
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    // console.error(`Error fetching products: ${error.message}`);
    throw error;
  }
};

export const uploadImageToAzure = async (fileData, fileName) => {
  const apiUrl = `${API_URL}/forms/upload`;

  const formData = new FormData();
  formData.append('file', fileData, fileName);

  const response = await axios.post(apiUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.status !== 201) {  // Change this line
    console.error('Error uploading image to Azure, status code:', response.status);
    throw new Error('Error uploading image to Azure');
  }
  console.log("Response data:", response.data);

  // The response should contain the URL of the uploaded image
  console.log("Front-End Image URL:", response.data.imageUrl);  // Update this line
  return response.data.imageUrl;  // And update this line
};

