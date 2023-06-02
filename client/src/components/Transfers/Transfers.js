// Transfers.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllLocations } from './TransfersApi'
import './Transfers.css';

const Transfers = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAllLocations()
    .then(response => setLocations(response.data.location)) 
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="transfers-container">
      <h1>Lokasyon Listesi</h1>
      {locations.map((location, index) => (
        <div key={index} className="location-item">
          <h2>{location.name}</h2>
          {location.locations.map((loc, idx) => (
            <Link key={idx} to={`/transfers/${loc.name.replace(/\s/g, '-')}`}>{loc.name}</Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Transfers;
