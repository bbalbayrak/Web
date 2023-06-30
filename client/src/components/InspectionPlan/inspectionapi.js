import axios from 'axios';

const API_URL = "http://portal-test.yenaengineering.nl/api";

// Tüm Muayene Planlarını almak için endpoint
export const getAllInspectionPlans = () => {
  return axios.get(`${API_URL}/inspectionplans`)
    .then(response => response.data)
    .catch(err => { throw err; });
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
