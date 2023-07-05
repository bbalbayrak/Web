import React, { useState, useEffect } from 'react';
import './Inspection.css';
import { columns, control_type } from './enumerated_inspection';
import {
  getAllInspectionPlans,
  getAllUsers,
  getUserRole,
  getDescriptionControl 
} from './inspectionapi';

import {
  fetchItems,
  handleControlResponsibleChange,
  handleDateChange,
  handleControlTypeChange,
  handleDescriptionChange,
  handleTickClick,
  handleCrossClick
  } from './inspection_utils';

const Inspection = () => {
  const [inspectionPlans, setInspectionPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [descriptions, setDescriptions] = useState({});
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [descriptionControls, setDescriptionControls] = useState({});

  useEffect(() => {
    fetchItems(getAllInspectionPlans, async (data) => { 
      data.sort((a, b) => a.order_number.localeCompare(b.order_number));
      const descriptionControls = {};
      for (let plan of data) {
        try {
          descriptionControls[plan.id] = await getDescriptionControl(plan.id);
        } catch (error) {
          console.error(`Failed to fetch description control for plan ${plan.id}:`, error);
        }
      }
      setDescriptionControls(descriptionControls); 
      setInspectionPlans(data);
    });
    fetchItems(getAllUsers, setUsers);
    const userRole = getUserRole();
    setCurrentUserRole(userRole.role);
    setCurrentUserId(userRole.user_id);
  }, [updateTrigger]);
  
  return (
    <div className="inspection-container">
      <h1 className="inspection-title">Inspection Plan</h1>
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
            {inspectionPlans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.vendor_name.substring(0, 12)}</td>
                <td>{plan.customer_name.substring(0, 12)}</td>
                <td>{plan.product_name}</td>
                <td>{plan.order_number}</td>
                <td>{plan.project_number}</td>
                <td>{plan.quantity}</td>
                <td>
                  <select
                    value={plan.control_type || ''}
                    onChange={event => handleControlTypeChange(event, plan.id, setInspectionPlans)} // here
                  >
                    <option value="">
                      Select Control Type
                    </option>
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
                    onChange={event => handleControlResponsibleChange(event, plan.id, setInspectionPlans)} // here
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
                        ? new Date(plan.control_date).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={date => handleDateChange(date, plan.id, setInspectionPlans)}
               
                  />
                </td>
                <td>{plan.note}</td>
                <td>
                  <textarea
                    placeholder="Description"
                    style={{ resize: 'vertical' }}
                    value={descriptions[plan.id] || ''}
                    onChange={e => handleDescriptionChange(e, plan.id, setDescriptions)}
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
                      handleTickClick(plan.id, inspectionPlans, descriptions[plan.id], currentUserId, setUpdateTrigger);
                    }}
                  >
                    Update
                  </button>
                  {currentUserRole === 'Quality Manager' && (
                    <>
                      <button className="inspection-button">Approve</button>
                      <button className="inspection-button">Reject</button>
                      <button
                        className="inspection-button"
                        onClick={() => handleCrossClick(plan.id, setInspectionPlans)} // Remove extra function call
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

export default Inspection;