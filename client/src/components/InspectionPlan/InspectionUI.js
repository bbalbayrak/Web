import React, { useState } from 'react';
import { toLowerTurkish, toUpperTurkish } from './turkishHelpers';
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
  handleDeleteClick,
  getStateStyle,
  getStatusStyle
} from './inspection_utils';
import MultipleFilter from '../../functions/MultipleFilter';
import ButtonPopup from './ButtonPopup';

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
  
        if (!column || !query) continue;
  
        const columnValue = plan[column];
        if (!columnValue) return false;
  
        if (!toLowerTurkish(columnValue.toString()).includes(toLowerTurkish(query)))
          return false;
      }
  
      return true;
    });
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
                    className={"w-20 bg-blue-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"}
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
                    // butonun görünürlüğünü kontrol et
                    style={{visibility: plan.state === 'Closed' ? 'hidden' : 'visible'}}
                  >
                    Update
                  </button>
                    {currentUserRole === 'Quality Manager' && plan.state !== 'Closed' &&(
                        <>
                        <ButtonPopup
                          triggerText="Approve"
                          triggerButtonStyle="w-20 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
                          title="Choose one of the actions below."
                          buttons={[
                            {
                              label: "Close Inspection",
                              action: () => handleApproveClick(plan.id, inspectionPlans, descriptionControls[plan.id], currentUserId, setUpdateTrigger)(false)()
                            },
                            {
                              label: "Continue Inspection",
                              action: () => handleApproveClick(plan.id, inspectionPlans, descriptionControls[plan.id], currentUserId, setUpdateTrigger)(true)()
                            },
                          ]}
                        />
                        <ButtonPopup
                          triggerText="Reject"
                          triggerButtonStyle="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                          title="Choose one of the actions below."
                          buttons={[
                            {
                              label: "Close Inspection",
                              action: handleRejectClick(plan.id, inspectionPlans, descriptionControls[plan.id], currentUserId, setUpdateTrigger)(false)
                            },
                            {
                              label: "Continue Inspection",
                              action: handleRejectClick(plan.id, inspectionPlans, descriptionControls[plan.id], currentUserId, setUpdateTrigger)(true)
                            },
                          ]}
                        />
                        <ButtonPopup
                          triggerText="Delete"
                          triggerButtonStyle="w-20 bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-2 rounded text-sm"
                          title="Are you sure you want to delete?"
                          buttons={[
                            {
                              label: "Delete",
                              action: () => handleDeleteClick(plan.id, setInspectionPlans)
                            }
                          ]}
                        />
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
