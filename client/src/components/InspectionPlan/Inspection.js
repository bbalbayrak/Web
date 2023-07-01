import React, { useState, useEffect } from 'react';
import './Inspection.css';
import { getAllInspectionPlans, getAllUsers } from './inspectionapi';
import { columns, control_type } from './enumerated_inspection';
import { fetchItems } from './inspection_utils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Inspection = () => {
  const [inspectionPlans, setInspectionPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [descriptions, setDescriptions] = useState({});
  const [documents, setDocuments] = useState({});

  useEffect(() => {
    fetchItems(getAllInspectionPlans, setInspectionPlans);
    fetchItems(getAllUsers, setUsers)
  }, []);

  const handleDateChange = (date, id) => {
    setInspectionPlans(prevPlans =>
      prevPlans.map(plan => 
        plan.id === id ? {...plan, control_date: date} : plan
      )
    );
  };

  const handleDescriptionChange = (e, id) => {
    setDescriptions(prev => ({...prev, [id]: e.target.value}))
  }

  const handleFileChange = (e, id) => {
    setDocuments(prev => ({...prev, [id]: e.target.files[0]}))
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
                  <select value={plan.control_type}>
                    {control_type.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select value={plan.control_responsible}>
                    {users.map((user, index) => (
                      <option key={index} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <DatePicker
                    selected={plan.control_date ? new Date(plan.control_date) : null}
                    onChange={date => handleDateChange(date, plan.id)}
                    dateFormat="dd.MM.yyyy"
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inspection;
