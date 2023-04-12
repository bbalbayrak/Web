// ProductTable.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const initialData = [
  // Örnek veriler
  {
    name: 'Örnek 1',
    odooid: 'ODOO001',
    customer: 'Müşteri A',
    technicalDrawing: 'https://example.com/pdf1.pdf',
    guide: 'https://example.com/guide1.jpg',
  },
  // Daha fazla örnek veri ekleyebilirsiniz...
];

const ProductTable = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('');
  const [editing, setEditing] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredData = data.filter((item) => {
    if (!searchTerm || !searchField) return true;
    return item[searchField]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="product-table-container">
      <div className="header-container">
        <div>
          <select value={searchField} onChange={handleFieldChange}>
            <option value="">Arama Kriteri Seçin</option>
            <option value="name">İsim</option>
            <option value="odooid">Odooid</option>
            <option value="customer">Müşteri</option>
            <option value="technicalDrawing">Teknik Çizim (PDF)</option>
            <option value="guide">Kılavuz (PDF, JPG)</option>
          </select>
          <input
            type="text"
            placeholder="Arama..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button onClick={() => setEditing(!editing)}>
          <FontAwesomeIcon icon={editing ? faSave : faEdit} />
          {editing ? ' Kaydet' : ' Düzenle'}
        </button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>İsim</th>
            <th>Odooid</th>
            <th>Müşteri</th>
            <th>Teknik Çizim (PDF)</th>
            <th>Kılavuz (PDF, JPG)</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((key) => (
                <td key={key}>
                  <input
                    type="text"
                    value={item[key]}
                    disabled={!editing}
                    onChange={(event) => {
                      const newData = [...data];
                      newData[index][key] = event.target.value;
                      setData(newData);
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
