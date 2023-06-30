import axios from 'axios';

const API_URL = "https://portal-test.yenaengineering.nl/api";

export const getAllInspectionPlans = async () => {
    try {
      const response = await axios.get(`${API_URL}/inspectionplans`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      // console.error('Error fetching forms:', error);
      throw error;
    }
  };

// Açık durumdaki Muayene Planlarını almak için endpoint
export const getOpenInspectionPlans = () => {
  return axios.get(`${API_URL}/inspectionplans/open`)
    .then(response => response.data)
    .catch(err => { throw err; });
};

// Kapalı durumdaki Muayene Planlarını almak için endpoint
export const getClosedInspectionPlans = () => {
  return axios.get(`${API_URL}/inspectionplans/closed`)
    .then(response => response.data)
    .catch(err => { throw err; });
};

// Bir Muayene Planını silmek için endpoint
export const deleteInspectionPlan = (id) => {
  return axios.delete(`${API_URL}/inspectionplans/${id}`)
    .then(response => response.data)
    .catch(err => { throw err; });
};

// Bir Muayene Planını güncellemek için endpoint
export const updateInspectionPlan = (id, updateData) => {
  return axios.put(`${API_URL}/inspectionplans/${id}`, updateData)
    .then(response => response.data)
    .catch(err => { throw err; });
};
