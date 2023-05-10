import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Vendors.css";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [odooid, setOdooid] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  let navigate = useNavigate()
  const fetchVendors = async () => {
    try {
      const response = await axios.get("https://portal-test.yenaengineering.nl/api/vendors");
      setVendors(response.data.data);
    } catch (error) {
      // console.error("Tedarikçiler alınırken hata oluştu:", error);
    }
  };

  const handleClick = () => {
    navigate("/create-vendor");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post("https://portal-test.yenaengineering.nl/api/vendors", { name, odooid });
      fetchVendors();
      setName("");
      setOdooid("");
    } catch (error) {
      // console.error("Tedarikçi eklenirken hata oluştu:", error);
    }
  };

  return (
    <div className="vendor-table-container">
      
        <button type="submit" onClick={handleClick}>
          Tedarikçi Ekle
        </button>

      <table className="vendor-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>İsim</th>
            <th>Odooid</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.name}</td>
              <td>{vendor.odooid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vendors;
