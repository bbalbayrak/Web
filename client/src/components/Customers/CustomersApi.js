import axios from 'axios';

export const fetchCustomers = async () => {
  try {
    const res = await axios.get('https://portal-test.yenaengineering.nl/api/customers');
    return res.data.data;
  } catch (error) {
    console.error("Error fetching customers, mate:", error);
    return [];
  }
};

export const createCustomer = async (name, odooid) => {
    try {
      await axios.post('https://portal-test.yenaengineering.nl/api/customers', { name, odooid });
    } catch (error) {
      console.error("There was a bloody error while adding the customer:", error);
    }
  };