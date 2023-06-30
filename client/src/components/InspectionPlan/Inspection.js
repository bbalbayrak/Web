import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inspection.css';
import { getAllInspectionPlans } from './inspectionapi';
import Filter from '../../functions/Filter';

const Inspection = () => {
  const [inspectionPlans, setInspectionPlans] = useState([]);
  const [filter, setFilter] = useState({ column: '', query: '' });

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

  const columnMap = {
    'Vendor Name': 'vendor_name',
    'Customer Name': 'customer_name',
    'Product Name': 'product_name',
    'Order Number': 'order_number',
    'Quantity': 'quantity',
    'Mid Control Responsible': 'mid_control_responsible',
    'Mid Control Date': 'mid_control_date',
    'Final Control Responsible': 'final_control_responsible',
    'Final Control Date': 'final_control_date',
    'Delivery Date': 'delivery_date',
    'Status': 'status',
    'State': 'state',
  };

  let navigate = useNavigate();

  useEffect(() => {
    fetchInspectionPlans();
  }, []);

  const fetchInspectionPlans = async () => {
    try {
      const response = await getAllInspectionPlans();
      setInspectionPlans(response.data);
    } catch (error) {
      // console.error('Could not fetch inspection plans:', error);
    }
  };

  const handleFilterChange = (type, value) => {
    setFilter(prevFilter => ({ ...prevFilter, [type]: value }));
  };

  const filteredInspectionPlans = inspectionPlans.filter(plan => {
    if (!filter.column || !filter.query) return true;
    const columnName = columnMap[filter.column];
    return String(plan[columnName])
      .toLowerCase()
      .includes(filter.query.toLowerCase());
  });

  const handleEdit = (id) => {
    navigate(`/edit-inspection-plan/${id}`);
  };

  return (
    <div className="inspection-container">
      <h1 className="inspection-title">Inspection Plan</h1>
      <Filter
        columns={columns}
        onFilterChange={handleFilterChange}
        currentColumn={filter.column}
        currentQuery={filter.query}
      />
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
            {filteredInspectionPlans.map(plan => (
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
