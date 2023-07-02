import axios from 'axios';

const API_URL = "https://portal-test.yenaengineering.nl/api";

export const getAllInspectionPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/inspectionplans`);
    console.log(response.data)
    return response.data.inspectionPlans;  // Update this line
  } catch (error) {
    // console.error('Error fetching forms:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/allusers`);
    console.log(response.data)
    return response.data.data;  // Update this line
  } catch (error) {
    // console.error('Error fetching forms:', error);
    throw error;
  }
};

export const updateInspectionPlan = async (plan) => {
  const data = {
    control_type: plan.control_type,
    control_responsible: plan.control_responsible,
    control_date: plan.control_date,
    status: 'waiting',
  };
  await axios.put(`${API_URL}/inspectionplans/${plan.id}`, data);
}

export const deleteInspectionPlan = async (id) => {
  await axios.delete(`${API_URL}/inspectionplans/${id}`);
}