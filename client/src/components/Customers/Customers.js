import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchCustomers } from './CustomersApi';
import "./Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCustomers = async () => {
      const customers = await fetchCustomers();
      setCustomers(customers);
    };
  
    getCustomers();
  }, []);

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
            <th className="customers-th">ID</th>
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
