import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllLocations } from './TransfersApi';
import './Transfers.css';

const Transfers = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAllLocations()
      .then(response => setLocations(response.location)) 
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="transfers-container">
      <h1>Lokasyon Listesi</h1>
      {locations.map((location, index) => (
        <div key={index} className="location-item">
          <h2>{location.name}</h2>
          <Link to={`/transfers/${encodeURIComponent(location.name)}`}>Detaylar</Link>
        </div>
      ))}
    </div>
  );
};

export default Transfers;
