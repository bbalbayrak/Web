import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("https://portal-test.yenaengineering.nl/api/customers");
      setCustomers(response.data.data);
    } catch (error) {
      // console.error("Müşteriler alınırken hata oluştu:", error);
    }
  };

  const handleClick = () => {
    navigate("/create-customer");
  };

  return (
    <div className="customers-container">
      <div className="header-container">
        <h1>Müşteriler</h1>
        <button className="add-customer-button" onClick={handleClick}>
          + Müşteri Ekle
        </button>
      </div>
      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>İsim</th>
            <th>Odooid</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.odooid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
