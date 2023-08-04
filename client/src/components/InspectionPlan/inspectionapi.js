import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllInspectionPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/inspectionplans`);
    return response.data.inspectionPlans; 
  } catch (error) {
    throw error;
  }
};

export const getOpenDraftInspectionPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/inspectionplans/opendraft`);
    return response.data.inspectionPlans; 
  } catch (error) {
    throw error;
  }
};

export const getOpenWaitingInspectionPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/inspectionplans/openwaiting`);
    return response.data.inspectionPlans; 
  } catch (error) {
    throw error;
  }
};

export const getCloseInspectionPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/inspectionplans/closed`);
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

export const getEmailById = async id => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data.data.email;
  } catch (error) {
    throw error;
  }
};

export const updateInspectionPlan = async plan => {
  const data = {
    control_method: plan.control_method,
    control_type: plan.control_type,
    control_responsible: plan.control_responsible,
    control_date: plan.control_date,
    status: 'Waiting',
  };
  await axios.put(`${API_URL}/inspectionplans/${plan.id}`, data);

  // Get emails by id
  const emails = await Promise.all(plan.control_responsible.map(getEmailById));

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [day, month, year].join('-');
  }
  
  const htmlContent = `
    <h1>Inspection Plan Güncelleme</h1>
    <div><strong>Quality Responsible:</strong> ${emails.join(', ')}</div>
    <div><strong>Vendor:</strong> ${plan.vendor_name}</div>
    <div><strong>Date:</strong> ${formatDate(plan.control_date)}</div>
    <p>Proje numarası ${plan.project_number} olan siparişin ${plan.product_name} numaralı ürünü, ${formatDate(plan.control_date)} tarihinde ${plan.control_method} şeklinde ${plan.control_type} yapılacaktır.</p>
    <p>Bilginize.</p>
  `;
  
  console.log(htmlContent); // Log the HTML content
  
  const emailData = {
    to: emails.join(', '),
    cc: 'quality@yenaengineering.nl',
    subject: 'Inspection Plan Güncelleme',
    html: htmlContent,
  };

  // Send the email
  await axios.post(`${API_URL}/send-email`, emailData);
};

export const approveInspectionPlan = async (plan, description, continueApproval) => {
  // Update the current plan
  const updateData = {
    status: 'Approved',
    state: 'Closed'
  };
  await axios.put(`${API_URL}/inspectionplans/${plan.id}`, updateData);

  if (continueApproval) {
    const { id, ...planDetails } = plan;
    planDetails.note = description;
    planDetails.state = 'Open'; 
    planDetails.status = 'Draft';  
    console.log([planDetails]);  
    await axios.post(`${API_URL}/inspectionplans`, [planDetails]);
  }
};

export const rejectInspectionPlan = async (plan, description, continueApproval) => {
  // Update the current plan
  const updateData = {
    status: 'Rejected',
    state: 'Closed'
  };
  await axios.put(`${API_URL}/inspectionplans/${plan.id}`, updateData);

  if (continueApproval) {
    const { id, ...planDetails } = plan;
    planDetails.note = description;
    planDetails.state = 'Open'; 
    planDetails.status = 'Draft';  
    console.log([planDetails]);  
    await axios.post(`${API_URL}/inspectionplans`, [planDetails]);
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

export const getDescriptionControlByInspectionPlanId = async inspectionplan_id => {
  try {
    const response = await axios.get(`${API_URL}/description_controls/${inspectionplan_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
