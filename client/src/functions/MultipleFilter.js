import React, { useState, useEffect } from 'react';
import { columnDisplayToDataMap } from '../components/InspectionPlan/enumerated_inspection';

const MultipleFilter = ({ id, columns, onFilterChange }) => {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [filterText, setFilterText] = useState('');

  const handleColumnSelect = (e) => {
    setSelectedColumn(e.target.value);
  };

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
  };

  useEffect(() => {
    if (selectedColumn && filterText) {
      const newFilter = {
        column: columnDisplayToDataMap[selectedColumn],
        query: filterText,
      };
      onFilterChange(id, newFilter);
    } else {
      onFilterChange(id, { column: null, query: null });
    }
  }, [filterText, selectedColumn, onFilterChange, id]);

  return (
    <div className="filter-container">
      <select value={selectedColumn} onChange={handleColumnSelect}>
        <option value="">Filter by...</option>
        {columns.map((column) => (
          <option key={column}>{column}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Filter text"
        value={filterText}
        onChange={handleFilterTextChange}
      />
    </div>
  );
};

export default MultipleFilter;
