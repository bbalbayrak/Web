import React, { useState, useEffect } from 'react';
import './Inspection.css';
import { columns, control_type, control_method } from './enumerated_inspection';
import {
  getOpenInspectionPlans,
  getAllUsers,
  getUserRole,
  getDescriptionControl,
} from './inspectionapi';
import MultipleFilter from '../../functions/MultipleFilter';

import {
  fetchItems,
  handleControlResponsibleChange,
  handleDateChange,
  handleControlTypeChange,
  handleDescriptionChange,
  handleUpdateClick,
  handleApproveClick,
  handleRejectClick,
  handleCrossClick,
  handleControlMethod,
} from './inspection_utils';

const Inspection = () => {
  const [inspectionPlans, setInspectionPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [descriptionControls, setDescriptionControls] = useState({});
  const [filters, setFilters] = useState([]);

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
    fetchItems(getOpenInspectionPlans, async data => {
      data.sort((a, b) => a.order_number.localeCompare(b.order_number));

      const descriptionData = await getDescriptionControl();
      const descriptionControls = {};
      for (let desc of descriptionData.data) {
        descriptionControls[desc.inspectionplan_id] = desc.description;
      }

      setDescriptionControls(descriptionControls);
      setInspectionPlans(data);
    });

    fetchItems(getAllUsers, setUsers);

    const userRole = getUserRole();
    setCurrentUserRole(userRole.role);
    setCurrentUserId(userRole.user_id);
  }, [updateTrigger]);

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
                <td>
                  <select
                    value={plan.control_method || ''}
                    onChange={event =>
                      handleControlMethod(event, plan.id, setInspectionPlans)
                    }
                  >
                    <option value="">Select Control Method</option>
                    {control_method.map((method, index) => (
                      <option key={index} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={plan.control_type || ''}
                    onChange={event =>
                      handleControlTypeChange(
                        event,
                        plan.id,
                        setInspectionPlans
                      )
                    }
                  >
                    <option value="">Select Control Type</option>
                    {control_type.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={plan.control_responsible || 'unselected'}
                    onChange={event =>
                      handleControlResponsibleChange(
                        event,
                        plan.id,
                        setInspectionPlans
                      )
                    }
                  >
                    <option value="unselected">
                      Select Control Responsible
                    </option>
                    {users.map((user, index) => (
                      <option key={index} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    value={
                      plan.control_date
                        ? new Date(plan.control_date)
                            .toISOString()
                            .split('T')[0]
                        : ''
                    }
                    onChange={date =>
                      handleDateChange(date, plan.id, setInspectionPlans)
                    }
                  />
                </td>
                <td>{plan.note}</td>
                <td>
                  <textarea
                    placeholder="Description"
                    style={{ resize: 'vertical' }}
                    value={descriptionControls[plan.id] || ''}
                    onChange={e =>
                      handleDescriptionChange(
                        e,
                        plan.id,
                        descriptionControls,
                        setDescriptionControls
                      )
                    }
                  />
                </td>
                <td>
                  {plan.delivery_date
                    ? new Date(plan.delivery_date).toLocaleDateString('tr-TR')
                    : ''}
                </td>
                <td>{plan.status}</td>
                <td>{plan.state}</td>
                <td>
                  <button
                    className="inspection-button"
                    onClick={() => {
                      handleUpdateClick(
                        plan.id,
                        inspectionPlans,
                        descriptionControls[plan.id],
                        currentUserId,
                        setUpdateTrigger
                      );
                      setUpdateTrigger(prev => !prev);
                    }}
                  >
                    Update
                  </button>
                  {currentUserRole === 'Quality Manager' && (
                    <>
                      <button
                        className="inspection-button"
                        onClick={() => {
                          handleApproveClick(
                            plan.id,
                            inspectionPlans,
                            descriptionControls[plan.id],
                            currentUserId,
                            setUpdateTrigger
                          );
                          setUpdateTrigger(prev => !prev);
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="inspection-button"
                        onClick={() => {
                          handleRejectClick(
                            plan.id,
                            inspectionPlans,
                            descriptionControls[plan.id],
                            currentUserId,
                            setUpdateTrigger
                          );
                          setUpdateTrigger(prev => !prev);
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="inspection-button"
                    onClick={() => {
                      handleCrossClick(
                        plan.id,
                        inspectionPlans,
                        descriptionControls[plan.id],
                        currentUserId,
                        setUpdateTrigger
                      );
                      setUpdateTrigger(prev => !prev);
                    }}
                  >
                    Cross
                  </button>
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
