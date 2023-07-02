import React, { useState, useEffect } from 'react';
import './Inspection.css';
import { columns, control_type } from './enumerated_inspection';
import { fetchItems, handleDateChange, handleControlTypeChange, handleControlResponsibleChange, handleDescriptionChange } from './inspection_utils';
import { updateInspectionPlan, deleteInspectionPlan, getAllInspectionPlans, getAllUsers } from './inspectionapi';

const Inspection = () => {
  const [inspectionPlans, setInspectionPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [descriptions, setDescriptions] = useState({});

  useEffect(() => {
    fetchItems(getAllInspectionPlans, setInspectionPlans);
    fetchItems(getAllUsers, setUsers)
  }, []);

  const handleTickClick = async (id) => {
    const plan = inspectionPlans.find(plan => plan.id === id);
    updateInspectionPlan(plan);
  }

  const handleCrossClick = async (id) => {
    deleteInspectionPlan(id);
    setInspectionPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
  }

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
                <td>{plan.quantity}</td>
                <td>
                  <select 
                    value={plan.control_type} 
                    onChange={event => handleControlTypeChange(event, plan.id)} // here
                  >
                    {control_type.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select 
                    value={plan.control_responsible} 
                    onChange={event => handleControlResponsibleChange(event, plan.id)} // and here
                  >
                    {users.map((user, index) => (
                      <option key={index} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type='date'
                    value={plan.control_date ? new Date(plan.control_date).toISOString().split('T')[0] : ""}
                    onChange={event => handleDateChange(event, plan.id)}
                  />
                </td>
                <td>
                  <textarea
                    placeholder="Description"
                    style={{resize: 'vertical'}}
                    value={descriptions[plan.id] || ''}
                    onChange={e => handleDescriptionChange(e, plan.id)}
                  />
                </td>
                <td>{plan.delivery_date ? new Date(plan.delivery_date).toLocaleDateString('tr-TR') : ""}</td>
                <td>{plan.status}</td>
                <td>{plan.state}</td>
                <td>
                  <button onClick={() => handleTickClick(plan.id)}>✔️</button>
                  <button onClick={() => handleCrossClick(plan.id)}>❌</button>
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