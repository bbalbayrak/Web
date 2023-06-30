import React, { useState, useEffect } from 'react';
import './Inspection.css';
import { getAllInspectionPlans } from './inspectionapi';

const Inspection = () => {
  const [inspectionPlans, setInspectionPlans] = useState([]);

  const columns = [
    'Vendor Name',
    'Customer Name',
    'Product Name',
    'Order Number',
    'Quantity',
    'Mid Control Responsible',
    'Mid Control Date',
    'Final Control Responsible',
    'Final Control Date',
    'Delivery Date',
    'Status',
    'State',
  ];

  useEffect(() => {
    fetchInspectionPlans();
  }, []);

  const fetchInspectionPlans = async () => {
    try {
      const response = await getAllInspectionPlans();
      setInspectionPlans(response.inspectionPlans);
      console.log(response.inspectionPlans)
    } catch (error) {
      // console.error('Could not fetch inspection plans:', error);
    }
  };


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
                <td>{plan.vendor_name}</td>
                <td>{plan.customer_name}</td>
                <td>{plan.product_name}</td>
                <td>{plan.order_number}</td>
                <td>{plan.quantity}</td>
                <td>{plan.mid_control_responsible}</td>
                <td>{plan.mid_control_date}</td>
                <td>{plan.final_control_responsible}</td>
                <td>{plan.final_control_date}</td>
                <td>{plan.delivery_date}</td>
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
  