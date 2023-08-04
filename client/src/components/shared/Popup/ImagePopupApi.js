import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const updateImageStatusrejected = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/images/${id}`, {
      id: id,
      status: 'rejected'
    });
    return response.data;
  } catch (error) {

    console.error(id)
  }
}

export const updateImageStatusapproved = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/images/${id}`, {
      id: id,
      status: "approved"
    });
    return response.data;
  } catch (error) {

    console.error(id);
  }
}
