import React from "react";
import "./Vendors.css";
import useVendors from './useVendors';

const Vendors = () => {
  const { vendors, handleClick } = useVendors();

  return (
    <div className="vendor-table-container">
      <button type="submit" onClick={handleClick}>
        Tedarikçi Ekle
      </button>
      <table className="vendor-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>İsim</th>
            <th>Odooid</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.name}</td>
              <td>{vendor.odooid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vendors;
