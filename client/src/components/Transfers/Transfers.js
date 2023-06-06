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
      <h1 className="title">Lokasyon Listesi</h1>
      <div className="locations-grid">
        {locations.map((location, index) => (
          <Link key={index} to={`/transfers/${encodeURIComponent(location.name)}`} className="location-card">
            <h2 className="location-name">{location.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Transfers;
