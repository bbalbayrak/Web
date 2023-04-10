import React from 'react';
import './Customers.css';

const customers = [
  // Örnek müşteri verileri
  {
    name: 'John Doe',
    code: 'JD-001',
    openedJobs: 5,
    closedJobs: 2,
    lastEdited: '2023-04-09',
    authorizedUser: 'Jane Doe',
  },
  // Daha fazla müşteri ekleyebilirsiniz...
];

const Customers = () => {
  return (
    <div className="customers-container">
      <div className="header-container">
        <h1>Müşteriler</h1>
        <button className="add-customer-button">+ Müşteri Ekle</button>
      </div>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Müşteri Adı</th>
            <th>Müşteri Kodu</th>
            <th>Açılan İş Sayısı</th>
            <th>Biten İş Sayısı</th>
            <th>Son Düzenleme</th>
            <th>Yetkili Kullanıcı</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.code}</td>
              <td>{customer.openedJobs}</td>
              <td>{customer.closedJobs}</td>
              <td>{customer.lastEdited}</td>
              <td>{customer.authorizedUser}</td>
              <td>{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
