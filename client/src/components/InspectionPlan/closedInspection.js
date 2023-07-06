import React, { useState, useEffect } from 'react';
import './Inspection.css';
import { columns } from './enumerated_inspection';
import {
  getCloseInspectionPlans,
  getDescriptionControl 
} from './inspectionapi';

import {
  fetchItems,
  } from './inspection_utils';

const Inspection = () => {
  const [inspectionPlans, setInspectionPlans] = useState([]);
  const [descriptionControls, setDescriptionControls] = useState({});

  useEffect(() => {
    fetchItems(getCloseInspectionPlans, async (data) => {
      data.sort((a, b) => a.order_number.localeCompare(b.order_number));

      const descriptionData = await getDescriptionControl();
      const descriptionControls = {};
      for (let desc of descriptionData.data) {
        descriptionControls[desc.inspectionplan_id] = desc.description;
      }
  
      setDescriptionControls(descriptionControls); 
      setInspectionPlans(data);
    });
  }, []);
  
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
                <td>{plan.control_type}</td>
                <td>{plan.control_responsible}</td>
                <td>
                  {plan.control_date
                    ? new Date(plan.control_date).toLocaleDateString('tr-TR')
                    : ''}
                </td>
                <td>{plan.note}</td>
                <td>{descriptionControls[plan.id] }</td>
                <td>
                  {plan.delivery_date
                    ? new Date(plan.delivery_date).toLocaleDateString('tr-TR')
                    : ''}
                </td>
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