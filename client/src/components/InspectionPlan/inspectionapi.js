import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = 'https://portal-test.yenaengineering.nl/api';

export const getAllInspectionPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/inspectionplans`);
    return response.data.inspectionPlans; 
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/allusers`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateInspectionPlan = async plan => {
  const data = {
    control_type: plan.control_type,
    control_responsible: plan.control_responsible,
    control_date: plan.control_date,
    status: 'waiting',
  };
  await axios.put(`${API_URL}/inspectionplans/${plan.id}`, data);
};

export const approveInspectionPlan = async (plan, description, continueApproval) => {
  // Update the current plan
  const updateData = {
    status: 'approved',
    state: continueApproval ? 'open' : 'closed'
  };
  await axios.put(`${API_URL}/inspectionplans/${plan.id}`, updateData);

  if (continueApproval) {
    const { id, ...planDetails } = plan;
    planDetails.note = description;
    console.log(planDetails)
    await axios.post(`${API_URL}/inspectionplans`, planDetails);
  }
};


export const deleteInspectionPlan = async id => {
  await axios.delete(`${API_URL}/inspectionplans/${id}`);
};

export const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const decodedToken = jwt_decode(token);
  return decodedToken;
};

export const createDescriptionControl = async (plan, file, description, currentUserId) => {
  
  const formData = new FormData();
  formData.append('inspectionplan_id', plan.id);
  formData.append('description', description);
  formData.append('documents', file);
  formData.append('creator_id', currentUserId);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  };

  try {
    const response = await axios.post(`${API_URL}/description_controls`, formData, config);
    return response.data;
    
  } catch (error) {
    throw error;
  }
};

export const getDescriptionControl = async () => {
  try {
    const response = await axios.get(`${API_URL}/description_controls`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
