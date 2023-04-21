import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const response = await axios.get('YOUR_API_URL_HERE');
      setWorkOrders(response.data);
    } catch (error) {
      console.error('Work orders alınamadı:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/work-orders/${id}`);
  };

  return (
    <div>
      <button className="create-button" onClick={() => navigate('/create-work-order')}>
        + Create
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((workOrder) => (
            <tr key={workOrder.id}>
              <td>{workOrder.id}</td>
              <td>{workOrder.title}</td>
              <td>{workOrder.description}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(workOrder.id)}>
                  Düzenle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkOrders;
