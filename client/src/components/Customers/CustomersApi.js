import axios from 'axios';

const API_URL = process.env.API_URL;

export const fetchCustomers = async () => {
  try {
    const res = await axios.get(`${API_URL}/customers`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching customers, mate:", error);
    return [];
  }
};

export const createCustomer = async (name, odooid) => {
    try {
      await axios.post(`${API_URL}/customers`, { name, odooid });
    } catch (error) {
      console.error("There was a bloody error while adding the customer:", error);
    }
  };