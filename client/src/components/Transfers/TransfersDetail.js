import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { getAllLocations } from './TransfersApi';
import { LatLngBounds } from 'leaflet';

const TransfersDetail = () => {
  const { name: encodedName } = useParams();
  const name = decodeURIComponent(encodedName);

  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const maxBounds = new LatLngBounds(
    [-90, -180], // Güneybatı köşe koordinatları
    [90, 180]    // Kuzeydoğu köşe koordinatları
    
  );
  useEffect(() => {
    getAllLocations()
      .then(response => {
        if (response && response.location) {
          setLocations(response.location);
        } else {
          console.error("Response or response.location is null");
        }
      })
      .catch(err => console.error(err));
  }, [name]);

  useEffect(() => {
    if (locations.length) {
      const filtered = locations.find((location) => location.name === name);
      if (filtered) {
        setFilteredLocations(filtered.locations);
      }
    }
  }, [locations, name]);
  console.log("deneme31" , locations)
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={1}
      minZoom={2}
      maxZoom={17}
      maxBounds={maxBounds} // Harita sınırlarını ayarlayın
      maxBoundsViscosity={1} // Harita sınırlarına yapışkanlık (1: tam sınırlama)
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

{filteredLocations.map((location, index) => (
  <Marker key={index} position={[location.atitude, location.longitude]}>
    <Popup>
      <div>
        <strong>{location.name}</strong> <br />
        <small>{new Date(parseInt(location.timeStamp)).toLocaleString()}</small>
      </div>
    </Popup>
  </Marker>
))}




      <Polyline positions={filteredLocations.map(loc => [loc.atitude, loc.longitude,])} color='red' />

    </MapContainer>
  );
};

export default TransfersDetail;
