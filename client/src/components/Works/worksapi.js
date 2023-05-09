const API_URL = "http://localhost:3001";

export const createWork = async (workData) => {
  const response = await fetch(`${API_URL}/works`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workData),
  });

  if (!response.ok) {
    throw new Error(`Error creating work: ${response.statusText}`);
  }

  return await response.json();
};

export const createWorkStep = async (workStepData) => {
  const response = await fetch(`${API_URL}/worksteps`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(workStepData),
    });
  
    if (!response.ok) {
      throw new Error(`Error creating workstep: ${response.statusText}`);
    }
  
    return await response.json();
  };

export const getWorkById = async (work_id) => {
    const response = await fetch(`${API_URL}/works/${work_id}`);
    const data = await response.json();
    return data;
  };

export const getProductById = async (product_id) => {
    const response = await fetch(`${API_URL}/products/${product_id}`);
    const data = await response.json();
    return data;
  };

  export const postQRQuestions = async (qrQuestionData) => {
    const response = await fetch(`${API_URL}/qr_questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(qrQuestionData),
    });
  
    if (!response.ok) {
      throw new Error(`Error posting QR question data: ${response.statusText}`);
    }
  
    return await response.json();
  };

  export const updateWorkStepStatus = async (step_id, status) => {
    const response = await fetch(`${API_URL}/worksteps/${step_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
  
    if (!response.ok) {
      throw new Error(`Error updating work step status: ${response.statusText}`);
    }
  
    return await response.json();
  };

  export const getQRQuestionsByWorkId = async (work_id) => {
    const response = await fetch(`${API_URL}/qr_questions/work/${work_id}`);
  
    if (!response.ok) {
      throw new Error(`Error fetching QR questions by work id: ${response.statusText}`);
    }
  
    return await response.json();
  };

  export const updateQRQuestion = async (id, updateData) => {
    const response = await fetch(`${API_URL}/qr_questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
  
    if (!response.ok) {
      throw new Error(`Error updating QR question: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  export const getVendors = async () => {
    const response = await fetch(`${API_URL}/vendors`);
  
    if (!response.ok) {
      throw new Error(`Error fetching vendors: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  export const getCustomers = async () => {
    const response = await fetch(`${API_URL}/customers`);
  
    if (!response.ok) {
      throw new Error(`Error fetching customers: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  export const getUsers = async () => {
    const response = await fetch(`${API_URL}/api/allusers`);
  
    if (!response.ok) {
      throw new Error(`Error fetching all users: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
  
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
  
    return await response.json();
  }; 

  export const createWorkProduct = async (workProductData) => {
    const response = await fetch(`${API_URL}/workproducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workProductData),
    });
  
    if (!response.ok) {
      throw new Error(`Error creating work product: ${response.statusText}`);
    }
  
    return await response.json();
  };

  export const getWorkProducts = async (work_id) => {
    try {
      const response = await fetch(`${API_URL}/works/${work_id}/workproducts`);
      const data = await response.json(); // veriyi json formatına çevirin
      return data;
    } catch (error) {
      console.error("Error while fetching work products:", error);
      throw error;
    }
  };

  export const getCertificatesByWorkId = async (work_id) => {
    try {
      const response = await fetch(`${API_URL}/works/${work_id}/certificates`);
      return response.data= await response.json();
    } catch (error) {
      console.error(`Error fetching certificates for work ID ${work_id}: ${error.message}`);
      return null;
    }
  };
  
  export const getFormByVendorIdAndProductId = async (vendor_id, product_id) => {
    try {
      const response = await fetch(`${API_URL}/forms/vendor/${vendor_id}/product/${product_id}`);
      return response.data= await response.json();
    } catch (error) {
      console.error(`Error fetching certificates for work ID : ${error.message}`);
      return null;
    }  
  };

  export const getFormByFormId = async (form_id) => {
    try {
      const response = await fetch(`${API_URL}/allforms/${form_id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching form by form ID: ${error.message}`);
      return null;
    }
  };
  
  export const createQualityControlEntry = async (data) => {
    const response = await fetch(`${API_URL}/api/quality_control`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`Error creating quality control entry: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  export const getQualityControlEntriesByFormId = async (form_id, work_id) => {
    try {
      const response = await fetch(`${API_URL}/api/quality_control/form/${form_id}/${work_id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching quality control entries by form ID: ${error.message}`);
      throw error;
    }
  };
  
  export const updateQualityControlEntry = async (entries) => {
    const response = await fetch(`${API_URL}/api/quality_control`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entries),
    });
  
    if (!response.ok) {
      throw new Error(`Kalite kontrol girişini güncelleme hatası: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  export const getImagesByQualityControlId = async (substepId ) => {
    try {
      const response = await fetch(`${API_URL}/quality_control/${substepId}/images`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching images by substep ID: ${error.message}`);
      throw error;
    }
  };
  
  