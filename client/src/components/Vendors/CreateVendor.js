import React, { useState } from "react";
import axios from "axios";
import "./CreateVendor.css";

const API_URL = process.env.REACT_APP_API_URL;

const CreateVendor = () => {
  const [name, setName] = useState("");
  const [odooid, setOdooid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/vendors`, { name, odooid });
      setName("");
      setOdooid("");
    } catch (error) {
      // console.error("Tedarikçi eklenirken hata oluştu:", error);
    }
  };

  return (
    <div className="create-vendor-container">
      <h1 className="create-vendor-title">Tedarikçi Ekle</h1>
      <form onSubmit={handleSubmit} className="create-vendor-form">
        <label htmlFor="name" className="create-vendor-label">İsim:</label>
        <input
          type="text"
          id="name"
          className="create-vendor-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="odooid" className="create-vendor-label">Odooid:</label>
        <input
          type="text"
          id="odooid"
          className="create-vendor-input"
          value={odooid}
          onChange={(e) => setOdooid(e.target.value)}
        />
        <button type="submit" className="create-vendor-button">Kaydet</button>
      </form>
    </div>
  );
};

export default CreateVendor;
