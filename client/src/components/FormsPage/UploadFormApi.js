import { useState } from 'react';
import axios from 'axios';

export const useApi = () => {
  const [response, setResponse] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get('https://portal-test.yenaengineering.nl/api/customers');
      setCustomers(data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('https://portal-test.yenaengineering.nl/api/products');
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const submitProduct = async (formData) => {
    try {
      const { data } = await axios.post('https://portal-test.yenaengineering.nl/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(data);
      setSuccessMessage('Ürün başarıyla eklendi.');
      setErrorMessage(null);
      await fetchProducts();
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage('Ürün eklenirken hata oluştu.');
    }
  };

  const getCustomerNameById = (id) => {
    const customer = customers.find((customer) => customer.id === id);
    return customer ? customer.name : '';
  };

  return {
    response,
    customers,
    products,
    errorMessage,
    successMessage,
    fetchCustomers,
    fetchProducts,
    submitProduct,
    getCustomerNameById
  };
};
