import React, { useState, useEffect } from 'react';
import './Inspection.css';
import { columns } from './enumerated_inspection';
import {
  getCloseInspectionPlans,
  getDescriptionControl,
  getAllUsers,
} from './inspectionapi';
import MultipleFilter from '../../functions/MultipleFilter';

import {
  fetchItems,
  getUserNameById,
  getStateStyle,
  getStatusStyle,
} from './inspection_utils';

const Inspection = () => {
  const [inspectionPlans, setInspectionPlans] = useState([]);
  const [descriptionControls, setDescriptionControls] = useState({});
  const [filters, setFilters] = useState([]);
  const [users, setUsers] = useState([]);

  const addNewFilter = () => {
    setFilters(prevFilters => [
      ...prevFilters,
      { id: Math.random().toString() },
    ]);
  };

  const handleFilterChange = (filterId, updatedFilter) => {
    setFilters(prevFilters =>
      prevFilters.map(filter =>
        filter.id === filterId ? { id: filterId, ...updatedFilter } : filter
      )
    );
  };

  const applyFilters = () => {
    return inspectionPlans.filter(plan => {
      for (let i = 0; i < filters.length; i++) {
        const { column, query } = filters[i];

        if (!column || !query) continue;

        const columnValue = plan[column];
        if (!columnValue) return false;

        if (!columnValue.toString().toLowerCase().includes(query.toLowerCase()))
          return false;
      }

      return true;
    });
  };

  useEffect(() => {
    fetchItems(getCloseInspectionPlans, async data => {
      data.sort((a, b) => a.order_number.localeCompare(b.order_number));

      const descriptionData = await getDescriptionControl();
      const descriptionControls = {};
      for (let desc of descriptionData.data) {
        descriptionControls[desc.inspectionplan_id] = desc.description;
      }

      setDescriptionControls(descriptionControls);
      setInspectionPlans(data);

      const usersData = await getAllUsers();
      setUsers(usersData);
    });
  }, []);

  const filteredPlans = applyFilters();

  return (
    <div className="inspection-container">
      <h1 className="inspection-title">Inspection Plan</h1>

      {filters.map(filter => (
        <MultipleFilter
          key={filter.id}
          id={filter.id}
          columns={columns}
          onFilterChange={handleFilterChange}
        />
      ))}
      <button onClick={addNewFilter}>Add filter</button>

      <div className="inspection-table-container">
        <table className="inspection-table">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.vendor_name.substring(0, 12)}</td>
                <td>{plan.customer_name.substring(0, 12)}</td>
                <td>{plan.product_name}</td>
                <td>{plan.order_number}</td>
                <td>
                  <a
                    target="blank"
                    href="https://yenacelik.sharepoint.com/sites/receivedjobs/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2Freceivedjobs%2FShared%20Documents%2FGeneral%2F2022%20to&viewid=bf734293%2Df159%2D4420%2D8a84%2Dd4a48c39ba81"
                  >
                    {plan.project_number}
                  </a>
                </td>
                <td>{plan.quantity}</td>
                <td>{plan.control_method}</td>
                <td>{plan.control_type}</td>
                <td>{getUserNameById(users, plan.control_responsible)}</td>
                <td>
                  {plan.control_date
                    ? new Date(plan.control_date).toLocaleDateString('tr-TR')
                    : ''}
                </td>
                <td>{plan.note}</td>
                <td>{descriptionControls[plan.id]}</td>
                <td>
                  {plan.delivery_date
                    ? new Date(plan.delivery_date).toLocaleDateString('tr-TR')
                    : ''}
                </td>
                <td>
                  <div className="flex items-center justify-center h-full">
                    <span className={getStatusStyle(plan.status)}>
                      {plan.status}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center h-full">
                    <span className={getStateStyle(plan.state)}>
                      {plan.state}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inspection;
