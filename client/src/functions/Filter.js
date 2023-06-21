import React from 'react';
import './Filter.css';

const Filter = ({ columns = [], onFilterChange, currentColumn = "", currentQuery = "" }) => {
  return (
    <div className="filter-container">
      <select 
        className="filter-dropdown"
        value={currentColumn}
        onChange={(e) => onFilterChange('column', e.target.value)}
      >
        <option value="">Filter by</option>
        {columns.map((column, index) => (
          <option key={index} value={column}>
            {column}
          </option>
        ))}
      </select>
      <input 
        className="filter-input" 
        type="text" 
        value={currentQuery}
        placeholder="Type to filter..." 
        onChange={(e) => onFilterChange('query', e.target.value)}
      />
    </div>
  );
};

export default Filter;
