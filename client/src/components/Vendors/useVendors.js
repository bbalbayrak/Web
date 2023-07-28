import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const useVendors = () => {
  const [vendors, setVendors] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${API_URL}/vendors`);
        setVendors(response.data.data);
      } catch (error) {
        // console.error("Tedarikçiler alınırken hata oluştu:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleClick = () => {
    navigate("/create-vendor");
  };

  return {
    vendors,
    handleClick
  };
};

export default useVendors;
