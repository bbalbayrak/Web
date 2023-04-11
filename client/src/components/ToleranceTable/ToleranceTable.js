import React from 'react';
import './ToleranceTable.css';

const ToleranceTable = () => {
  return (
    <div className="tolerance-table-container">
      <table className="tolerance-table">
        <thead>
          <tr>
            <th>Fotoğraf</th>
            <th>+ Tolerans</th>
            <th>- Tolerans</th>
            <th>Okay / Not Okay</th>
          </tr>
        </thead>
        <tbody>
          {/* Örnek satır */}
          <tr>
            <td>
              <img
                className="table-image"
                src="https://via.placeholder.com/50"
                alt="Fotoğraf"
              />
            </td>
            <td>0.05</td>
            <td>-0.03</td>
            <td>Okay</td>
          </tr>
          {/* Diğer satırlar buraya eklenebilir */}
        </tbody>
      </table>
    </div>
  );
};

export default ToleranceTable;
