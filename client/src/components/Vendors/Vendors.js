import React from 'react';
import './Vendors.css';

const vendors = [
  // Örnek tedarikçi verileri
  {
    name: 'ABC Company',
    code: 'ABC-001',
    jobs: 10,
    lastEdited: '2023-04-08',
    responsibleUser: 'Alice',
    successRate: '95%',
  },
  // Daha fazla tedarikçi ekleyebilirsiniz...
];

const Vendors = () => {
  return (
    <div className="vendors-container">
      <div className="header-container">
        <h1>Tedarikçiler</h1>
        <button className="add-vendor-button">+ Tedarikçi Ekle</button>
      </div>
      <table className="vendors-table">
        <thead>
          <tr>
            <th>Tedarikçi Adı</th>
            <th>Tedarikçi Kodu</th>
            <th>Üstlendiği İş</th>
            <th>Son Düzenlenme</th>
            <th>Sorumlu Kullanıcı</th>
            <th>Başarı Oranı</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor, index) => (
            <tr key={index}>
              <td>{vendor.name}</td>
              <td>{vendor.code}</td>
              <td>{vendor.jobs}</td>
              <td>{vendor.lastEdited}</td>
              <td>{vendor.responsibleUser}</td>
              <td>{vendor.successRate}</td>
              <td>{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vendors;
