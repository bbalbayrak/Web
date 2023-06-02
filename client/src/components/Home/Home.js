import React from 'react';
import './Home.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import Chart from './Chart/Chart';
import { useState, useEffect } from 'react';
import { getLatestLocations, getAllLocations, createLocation } from './WorldMapApi';



const Home = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getLatestLocations()
      .then(response => {
        console.log(response.data.locations); // Gelen veriyi kontrol edelim.
        setMarkers(response.data);
      })
      .catch(err => console.error(err));
  }, []); // Bu useEffect hooku bileşen yüklendiğinde bir kez çalışır.
  
  const maxBounds = new LatLngBounds(
    [-90, -180], // Güneybatı köşe koordinatları
    [90, 180]    // Kuzeydoğu köşe koordinatları
    
  );
  return (
    <div className="home-container">
      {/* Filtreleme */}
      <div className="filters">
        <input type="date" className="start-date" />
        <input type="date" className="end-date" />
        <button className="filter-button">Filtrele</button>
      </div>

      {/* Kartlar */}
      <div className="cards">
        <div className="card">
          <div className="icon-container">
            {/* İkon buraya eklenecek */}
          </div>
          <div className="card-info">
            <span className="number">150</span>
            <p className="title">Toplam İş Sayısı</p>
          </div>
        </div>
        <div className="card">
          <div className="icon-container">
            {/* İkon buraya eklenecek */}
          </div>
          <div className="card-info">
            <span className="number">75</span>
            <p className="title">Açık İşler</p>
          </div>
        </div>
        <div className="card">
          <div className="icon-container">
            {/* İkon buraya eklenecek */}
          </div>
          <div className="card-info">
            <span className="number">30</span>
            <p className="title">XXX İşler</p>
          </div>
        </div>
        <div className="card">
          <div className="icon-container">
            {/* İkon buraya eklenecek */}
          </div>
          <div className="card-info">
            <span className="number">40</span>
            <p className="title">Bitirilen İşler</p>
          </div>
        </div>
        <div className="card">
          <div className="icon-container">
            {/* İkon buraya eklenecek */}
          </div>
          <div className="card-info">
            <span className="number">5</span>
            <p className="title">İptal Edilen İşler</p>
          </div>
        </div>
        <div className="card">
          <div className="icon-container">
            {/* İkon buraya eklenecek */}
          </div>
          <div className="card-info">
            <span className="number">20</span>
            <p className="title">Zamanı Geçen İşler</p>
          </div>
        </div>
      </div>

      <div className="world-map">
      <MapContainer
          center={[51.505, -0.09]} // Başlangıç koordinatları
          zoom={1} // Başlangıç yakınlaştırma seviyesi
          minZoom={2} // Minimum yakınlaştırma seviyesi
          maxZoom={17} // Maksimum yakınlaştırma seviyesi
          maxBounds={maxBounds} // Harita sınırlarını ayarlayın
          maxBoundsViscosity={1} // Harita sınırlarına yapışkanlık (1: tam sınırlama)
      >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
  <Marker key={index} position={[marker.atitude, marker.longitude]}>
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
      {/* İstatistikler */}
      <div className="statistics">
        <div className="weekly-statistics">
      <Chart />
       </div>
        <div className="general-statistics">
          <h3>Genel İstatistik</h3>
          {/* İstatistik bileşeni buraya eklenecek */}
        </div>
      </div>

      {/* İş Üzerinde Çalışan Kullanıcılar Tablosu */}
      <div className="users-working">
        <table className="users-table">
          <thead>
            <tr>
              <th>Kullanıcı</th>
              <th>Çalıştığı İş</th>
              <th>Açılış Zamanı</th>
              <th>Başlama Zamanı</th>
              <th>Son Düzenlenme Tarihi</th>
              <th>Durumu</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ahmet Yılmaz</td>
              <td>Proje X</td>
              <td>2023-04-01</td>
              <td>2023-04-02</td>
              <td>2023-04-08</td>
              <td>Aktif</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Fatma Demir</td>
              <td>Proje Y</td>
              <td>2023-04-03</td>
              <td>2023-04-04</td>
              <td>2023-04-09</td>
              <td>Aktif</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;