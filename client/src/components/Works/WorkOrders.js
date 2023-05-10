import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WorkOrders.css';

const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const response = await axios.get('https://portal-test.yenaengineering.nl/api/worksteps/Open');
      setWorkOrders(response.data.data);
    } catch (error) {
      // console.error('Work orders alınamadı:', error);
    }
  };

  const handleEdit = (step_id, work_id, state) => {
    if (state === "New Work")  {
      navigate(`/newworks?work_id=${work_id}&step_id=${step_id}`);
    }
    if (state === "Certificate")  {
      navigate(`/certificate?work_id=${work_id}&step_id=${step_id}`);
    }
    if (state === "QR Certificate")  {
      navigate(`/qr-certificate?work_id=${work_id}&step_id=${step_id}`);
    }
    if (state === "Quality Control")  {
      navigate(`/quality-control?work_id=${work_id}&step_id=${step_id}`);
    }
  };

  return (
    <div className="work-orders-container">
      <h1 className="work-orders-title">Work Orders</h1>
      <button className="create-button" onClick={() => navigate('/create-work-order')}>
        + Create
      </button>
      <div className="work-orders-table-container">
        <table className="work-orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Work ID</th>
              <th>Step Name</th>
              <th>Timestamp</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((workOrder) => (
              <tr key={workOrder.id}>
                <td>{workOrder.id}</td>
                <td>{workOrder.work_id}</td>
                <td>{workOrder.step_name}</td>
                <td>{workOrder.timestamp}</td>
                <td>{workOrder.state}</td>
                <td>{workOrder.status}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(workOrder.id, workOrder.work_id, workOrder.state)}>
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkOrders;