import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const useVendors = () => {
  const [vendors, setVendors] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("https://portal-test.yenaengineering.nl/api/vendors");
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
