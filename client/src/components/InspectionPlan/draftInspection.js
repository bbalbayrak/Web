import React, { useState, useEffect } from 'react';
import './Inspection.css';
import { columns, control_type, control_method } from './enumerated_inspection';
import {
  getOpenDraftInspectionPlans,
  getAllUsers,
  getUserRole,
  getDescriptionControl,
} from './inspectionapi';
import MultipleFilter from '../../functions/MultipleFilter';
import ButtonPopup from './ButtonPopup';
import Select from 'react-select';

import {
  fetchItems,
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
  getStatusStyle,
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
    fetchItems(getOpenDraftInspectionPlans, async data => {
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
    <div className="items-center p-5 font-sans">
      <h1 className="text-2xl text-gray-700 mb-5">Inspection Plan</h1>

      {filters.map(filter => (
        <MultipleFilter
          key={filter.id}
          id={filter.id}
          columns={columns}
          onFilterChange={handleFilterChange}
        />
      ))}
      <button
        className="bg-gray-700 text-white text-lg py-2 px-5 rounded cursor-pointer mb-5 hover:bg-gray-500"
        onClick={addNewFilter}
      >
        Add filter
      </button>
      <div className="w-full">
        <table className="w-1/12 border-collapse">
          <thead>
            <tr>
              {columns.map(column => (
                <th
                  className="bg-gray-700 text-white px-1 text-center font-bold w-1/12"
                  key={column}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="px-3 w-1/24">
            {filteredPlans.map(plan => (
              <tr className="px-3 w-1/24" key={plan.id}>
                <td className="px-3 w-1/24">
                  {plan.vendor_name.substring(0, 12)}
                </td>
                <td className="px-3 w-1/24">
                  {plan.customer_name.substring(0, 12)}
                </td>
                <td className="px-3 w-1/24">{plan.product_name}</td>
                <td className="px-3 w-1/24">{plan.order_number}</td>
                <td className="px-3 w-1/24">{plan.project_number}</td>
                <td className="px-3 w-1/24">{plan.quantity}</td>
                <td className="px-3 w-1/24">
                  <select
                    value={plan.control_method || ''}
                    onChange={event =>
                      handleControlMethod(event, plan.id, setInspectionPlans)
                    }
                  >
                    <option value="">Select</option>
                    {control_method.map((method, index) => (
                      <option key={index} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3">
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
                    <option value="">Select</option>
                    {control_type.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3">
                  <div className="w-full">
                    <Select
                      styles={{
                        control: base => ({
                          ...base,
                          width: '10rem',
                        }),
                      }}
                      name="control_responsible"
                      id="control_responsible"
                      onChange={selectedOptions =>
                        handleControlResponsibleChange(
                          selectedOptions,
                          plan.id,
                          setInspectionPlans
                        )
                      }
                      options={users.map(user => ({
                        value: user.id,
                        label: user.name,
                      }))}
                      value={
                        plan.control_responsible
                          ? plan.control_responsible
                              .map(userId => {
                                const user = users.find(
                                  user => user.id === Number(userId)
                                );
                                return user
                                  ? { value: user.id, label: user.name }
                                  : null;
                              })
                              .filter(Boolean)
                          : []
                      }
                      placeholder="Select Control Responsible"
                      isMulti
                      isSearchable
                    />
                  </div>
                </td>
                <td className="px-3">
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
                <td className="px-3">{plan.note}</td>
                <td className="px-3">
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
                    className="                      'w-20 bg-blue-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm'
                    "
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
                      <ButtonPopup
                        triggerText="Approve"
                        triggerButtonStyle="w-20 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
                        title="Choose one of the actions below."
                        buttons={[
                          {
                            label: 'Close Inspection',
                            action: () =>
                              handleApproveClick(
                                plan.id,
                                inspectionPlans,
                                descriptionControls[plan.id],
                                currentUserId,
                                setUpdateTrigger
                              )(false)(),
                          },
                          {
                            label: 'Continue Inspection',
                            action: () =>
                              handleApproveClick(
                                plan.id,
                                inspectionPlans,
                                descriptionControls[plan.id],
                                currentUserId,
                                setUpdateTrigger
                              )(true)(),
                          },
                        ]}
                      />
                      <ButtonPopup
                        triggerText="Reject"
                        triggerButtonStyle="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                        title="Choose one of the actions below."
                        buttons={[
                          {
                            label: 'Close Inspection',
                            action: handleRejectClick(
                              plan.id,
                              inspectionPlans,
                              descriptionControls[plan.id],
                              currentUserId,
                              setUpdateTrigger
                            )(false),
                          },
                          {
                            label: 'Continue Inspection',
                            action: handleRejectClick(
                              plan.id,
                              inspectionPlans,
                              descriptionControls[plan.id],
                              currentUserId,
                              setUpdateTrigger
                            )(true),
                          },
                        ]}
                      />
                      <ButtonPopup
                        triggerText="Delete"
                        triggerButtonStyle="w-20 bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-2 rounded text-sm"
                        title="Are you sure you want to delete?"
                        buttons={[
                          {
                            label: 'Delete',
                            action: () =>
                              handleDeleteClick(plan.id, setInspectionPlans),
                          },
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

export default Inspection;
