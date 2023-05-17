import React, { useState } from "react";
import axios from "axios";
import { createCustomer } from './CustomersApi';
import "./CreateCustomer.css";

const CreateCustomer = () => {
  const [name, setName] = useState("");
  const [odooid, setOdooid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await createCustomer(name, odooid);
      setName("");
      setOdooid("");
    } catch (error) {
      // console.error("There was a bloody error while adding the customer:", error);
    }
  };

  return (
    <div className="create-customer-container">
      <h1 className="create-customer-title">Müşteri Ekle</h1>
      <form onSubmit={handleSubmit} className="create-customer-form">
        <label htmlFor="name" className="create-customer-label">İsim:</label>
        <input
          type="text"
          id="name"
          className="create-customer-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="odooid" className="create-customer-label">Odooid:</label>
        <input
          type="text"
          id="odooid"
          className="create-customer-input"
          value={odooid}
          onChange={(e) => setOdooid(e.target.value)}
        />
        <button type="submit" className="create-customer-button">Kaydet</button>
      </form>
    </div>
  );
};

export default CreateCustomer;
