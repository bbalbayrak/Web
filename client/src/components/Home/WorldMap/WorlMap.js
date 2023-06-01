import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import { getMarkers } from './WorldMapApi';

const WorldMap = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getMarkers()
      .then(response => {
        console.log(response.data); // Gelen veriyi kontrol edelim.
        setMarkers(response.data);
      })
      .catch(err => console.error(err));
  }, []); // Bu useEffect hooku bileşen yüklendiğinde bir kez çalışır.

  const maxBounds = new LatLngBounds(
    [-90, -180], // Güneybatı köşe koordinatları
    [90, 180]    // Kuzeydoğu köşe koordinatları
  );

  return (
    <div className="world-map">
      <MapContainer
        center={[51.505, -0.09]} // Başlangıç koordinatları
        zoom={1} // Başlangıç yakınlaştırma seviyesi
        minZoom={2} // Minimum yakınlaştırma seviyesi
        maxZoom={12} // Maksimum yakınlaştırma seviyesi
        maxBounds={maxBounds} // Harita sınırlarını ayarlayın
        maxBoundsViscosity={1} // Harita sınırlarına yapışkanlık (1: tam sınırlama)
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.latitude, marker.longitude]}>
            <Popup>
              <div>
                <strong>{marker.name}</strong> <br />
                <small>{new Date(parseInt(marker.latesttimestamp)).toLocaleString()}</small>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
