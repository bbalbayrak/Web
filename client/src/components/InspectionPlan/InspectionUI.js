import React, { useState } from 'react';
import { columns, control_type, control_method } from './enumerated_inspection';
import {
  handleControlResponsibleChange,
  handleDateChange,
  handleControlMethod,
  handleControlTypeChange,
  handleDescriptionChange,
  handleUpdateClick,
  handleApproveClick,
  handleRejectClick,
  handleCrossClick,
} from './inspection_utils';
import MultipleFilter from '../../functions/MultipleFilter';

const InspectionUI = ({
  inspectionPlans,
  setInspectionPlans,
  users,
  currentUserRole,
  currentUserId,
  updateTrigger,
  setUpdateTrigger,
  descriptionControls,
  setDescriptionControls,
}) => {
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

        // if there's no column or query, this filter doesn't affect the result
        if (!column || !query) continue;

        const columnValue = plan[column];
        // if the column doesn't exist in the plan, this filter is not met
        if (!columnValue) return false;

        // if the column value doesn't match the query, this filter is not met
        if (!columnValue.toString().toLowerCase().includes(query.toLowerCase()))
          return false;
      }

      // if we made it here, all filters are met
      return true;
    });
  };
  const getStatusStyle = status => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'inline-block text-white bg-green-600 px-2 py-1 rounded-full border border-green-800';
      case 'rejected':
        return 'inline-block text-white bg-red-600 px-2 py-1 rounded-full border border-red-800';
      case 'draft':
        return 'inline-block text-white bg-gray-600 px-2 py-1 rounded-full border border-gray-800';
      case 'waiting':
        return 'inline-block text-white bg-blue-600 px-2 py-1 rounded-full border border-blue-800';
      default:
        return 'inline-block text-black px-2 py-1 rounded-full border border-black';
    }
  };

  const getStateStyle = state => {
    switch (state.toLowerCase()) {
      case 'open':
        return 'inline-block text-white bg-green-600 px-2 py-1 rounded-full border border-green-800';
      case 'closed':
        return 'inline-block text-white bg-red-600 px-2 py-1 rounded-full border border-red-800';
      case 'in progress':
        return 'inline-block text-white bg-yellow-600 px-2 py-1 rounded-full border border-yellow-800';
      case 'awaiting approval':
        return 'inline-block text-white bg-blue-600 px-2 py-1 rounded-full border border-blue-800';
      default:
        return 'inline-block text-black px-2 py-1 rounded-full border border-black';
    }
  };

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
                <td>{plan.project_number}</td>
                <td>{plan.quantity}</td>
                <td>
                  <select
                    value={plan.control_method || ''}
                    onChange={event =>
                      handleControlMethod(
                        event,
                        plan.id,
                        setInspectionPlans
                      )
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
                      <button
                        className="inspection-button"
                        onClick={() =>
                          handleCrossClick(plan.id, setInspectionPlans)
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InspectionUI;
