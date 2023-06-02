import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { getAllLocations } from './TransfersApi';

const TransfersDetail = () => {
  const { name } = useParams();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAllLocations()
      .then(response => {
        const selectedLocation = response.data.location.find(location => location.name === name);
        if (selectedLocation) {
          setLocations(selectedLocation.locations);
        }
      })
      .catch(err => console.error(err));
  }, [name]);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={1}
      minZoom={2}
      maxZoom={17}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((location, index) => (
        <Marker key={index} position={[location.atitude, location.longitude]}>
          <Popup>
            {name} <br /> {new Date().toLocaleString()}
          </Popup>
        </Marker>
      ))}

      <Polyline positions={locations.map(loc => [loc.atitude, loc.longitude])} color='red' />

    </MapContainer>
  );
};

export default TransfersDetail;
