import React from 'react';
import './ToleranceTable.css';

const toleranceData = [
  // Örnek tolerans verileri
  {
    imageUrl: 'https://via.placeholder.com/50',
    positiveTolerance: 5,
    negativeTolerance: 2,
    status: 'Okay',
  },
  // Daha fazla tolerans verisi ekleyebilirsiniz...
];

const ToleranceTable = () => {
  return (
    <div className="tolerance-table-container">
      <div className="header-container">
        <h1>Kontrol Tablosu</h1>
      </div>
      <table className="tolerance-table">
        <thead>
          <tr>
            <th>Fotoğraf</th>
            <th>+ Tolerans</th>
            <th>- Tolerans</th>
            <th>Okay-Not Okay</th>
          </tr>
        </thead>
        <tbody>
          {toleranceData.map((tolerance, index) => (
            <tr key={index}>
              <td>
                <img
                  className="table-image"
                  src={tolerance.imageUrl}
                  alt={`Tolerance ${index + 1}`}
                />
              </td>
              <td>{tolerance.positiveTolerance}</td>
              <td>{tolerance.negativeTolerance}</td>
              <td>{tolerance.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToleranceTable;
