import axios from 'axios';

export const updateImageStatusrejected = async (id) => {
  try {
    const response = await axios.put(`https://portal-test.yenaengineering.nl/api/images/${id}`, {
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
    const response = await axios.put(`https://portal-test.yenaengineering.nl/api/images/${id}`, {
      id: id,
      status: "approved"
    });
    return response.data;
  } catch (error) {

    console.error(id);
  }
}
