import React, { useState } from 'react';
import Filter from './Filter';

const MultipleFilter = ({ columns = [] }) => {
  const [filters, setFilters] = useState([{ column: "", query: "" }]);

  const handleFilterChange = (type, value, index) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [type]: value };
    setFilters(newFilters);
  };

  const handleAddFilter = () => {
    setFilters([...filters, { column: "", query: "" }]);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((filter, idx) => idx !== index);
    setFilters(newFilters);
  };

  return (
    <div className="multiple-filter-container">
      {filters.map((filter, index) => (
        <div key={index} className="filter-section">
          <Filter
            columns={columns}
            onFilterChange={(type, value) => handleFilterChange(type, value, index)}
            currentColumn={filter.column}
            currentQuery={filter.query}
          />
          <button onClick={() => handleRemoveFilter(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddFilter}>Add Filter</button>
    </div>
  );
};

export default MultipleFilter;
