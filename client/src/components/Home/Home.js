import React from 'react';
import './Home.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const Home = () => {
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
              zoom={2} // Başlangıç yakınlaştırma seviyesi
          >
              <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[51.505, -0.09]} /> {/* İsteğe bağlı işaretçi */}
          </MapContainer>
      </div>
      {/* İstatistikler */}
      <div className="statistics">
        <div className="weekly-statistics">
          <h3>Haftalık İstatistik</h3>
          {/* İstatistik bileşeni buraya eklenecek */}
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
