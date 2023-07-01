import React, { useState, useEffect } from 'react';
import './Inspection.css';
import { getAllInspectionPlans, getAllUsers } from './inspectionapi';
import { columns, control_type } from './enumerated_inspection';
import { fetchItems } from './inspection_utils';

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
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <h1 className="text-3xl font-semibold mb-2 text-gray-900">Inspection Plan</h1>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
          <tr>
            {columns.map(column => (
              <th key={column} scope="col" class="px-6 py-4 font-medium text-gray-900">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          {inspectionPlans.map(plan => (
            <tr key={plan.id} class="hover:bg-gray-50">
              <td class="px-6 py-4">{plan.vendor_name.substring(0, 12)}</td>
              <td class="px-6 py-4">{plan.customer_name.substring(0, 12)}</td>
              <td class="px-6 py-4">{plan.product_name}</td>
              <td class="px-6 py-4">{plan.order_number}</td>
              <td class="px-6 py-4">{plan.quantity}</td>
              <td class="px-6 py-4">
                <select value={plan.control_type} class="px-2 py-1 rounded border border-gray-200 text-gray-800">
                  <option value="" disabled selected>Please Select Control Type</option>
                  {control_type.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </td>
              <td class="px-6 py-4">
                <select value={plan.control_responsible} class="px-2 py-1 rounded border border-gray-200 text-gray-800">
<option value="" disabled={plan.control_responsible !== ""}>Please Select Control Responsible</option>
                  {users.map((user, index) => (
                    <option key={index} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </td>
              <td class="px-6 py-4">
                <input
                  type='date'
                  selected={plan.control_date ? new Date(plan.control_date) : null}
                  onChange={date => handleDateChange(date, plan.id)}
                  dateFormat="dd.MM.yyyy"
                  class="px-2 py-1 rounded border border-gray-200 text-gray-800"
                />
              </td>
              <td class="px-6 py-4">
                <textarea
                  placeholder="Description"
                  style={{resize: 'vertical'}}
                  value={descriptions[plan.id] || ''}
                  onChange={e => handleDescriptionChange(e, plan.id)}
                  class="px-2 py-1 rounded border border-gray-200 text-gray-800 w-full"
                />
              </td>
              <td class="px-6 py-4">{plan.delivery_date ? new Date(plan.delivery_date).toLocaleDateString('tr-TR') : ""}</td>
              <td class="px-6 py-4">{plan.status}</td>
              <td class="px-6 py-4">
          <span
            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
            {plan.state}
          </span>
        </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inspection;