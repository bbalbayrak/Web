import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WorkOrders.css';
import { getWorkById, getVendors, getUsers } from './worksapi';
import Filter from '../../functions/Filter';

const API_URL = process.env.REACT_APP_API_URL;

const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [filter, setFilter] = useState({ column: '', query: '' });

  const columns = [
    'Work ID',
    'Order Number',
    'Project Number',
    'Vendor',
    'Inspector',
    'Step Name',
    'Timestamp',
    'State',
    'Status',
    'Actions',
  ];

  const columnMap = {
    'Work ID': 'work_id',
    'Order Number': 'order_number',
    'Project Number': 'project_number',
    Vendor: 'vendor_id',
    Inspector: 'inspector_id',
    'Step Name': 'step_name',
    Timestamp: 'timestamp',
    State: 'state',
    Status: 'status',
    Actions: 'actions',
  };

  let navigate = useNavigate();

  useEffect(() => {
    fetchWorkOrders();
    fetchVendors();
    fetchInspectors();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/worksteps/Open`
      );
      const workOrdersData = await Promise.all(
        response.data.data.map(async workOrder => {
          const workData = await getWorkById(workOrder.work_id);
          return {
            ...workOrder,
            order_number: workData.data.order_number,
            project_number: workData.data.project_number,
            vendor_id: workData.data.vendor_id,
            inspector_id: workData.data.inspector_id,
          };
        })
      );
      setWorkOrders(workOrdersData);
    } catch (error) {
      // console.error('Work orders alınamadı:', error);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await getVendors();
      setVendors(response.data);
    } catch (error) {
      // console.error('Error fetching vendors:', error);
    }
  };

  const fetchInspectors = async () => {
    try {
      const response = await getUsers();
      const inspectorRes = response.data.filter(
        user => user.role === 'Inspector'
      );
      setInspectors(inspectorRes);
    } catch (error) {
      // console.error('Error fetching users:', error);
    }
  };

  const handleFilterChange = (type, value) => {
    setFilter(prevFilter => ({ ...prevFilter, [type]: value }));
  };

  const getVendorName = vendorId => {
    const vendor = vendors.find(v => v.odooid === vendorId);
    return vendor ? vendor.name : 'Unknown Vendor';
  };

  const getInspectorName = inspectorId => {
    const inspector = inspectors.find(i => i.id === inspectorId);
    return inspector ? inspector.name : 'Unknown Inspector';
  };

  const filteredWorkOrders = workOrders.filter(workOrder => {
    if (!filter.column || !filter.query) return true;
    const columnName = columnMap[filter.column];
    if (columnName === 'vendor_id') {
      return getVendorName(workOrder[columnName])
        .toLowerCase()
        .includes(filter.query.toLowerCase());
    } else if (columnName === 'inspector_id') {
      return getInspectorName(workOrder[columnName])
        .toLowerCase()
        .includes(filter.query.toLowerCase());
    } else {
      return String(workOrder[columnName])
        .toLowerCase()
        .includes(filter.query.toLowerCase());
    }
  });

  const handleEdit = (step_id, work_id, state) => {
    if (state === 'New Work') {
      navigate(`/newworks?work_id=${work_id}&step_id=${step_id}`);
    }
    if (state === 'Certificate') {
      navigate(`/certificate?work_id=${work_id}&step_id=${step_id}`);
    }
    if (state === 'QR Certificate') {
      navigate(`/qr-certificate?work_id=${work_id}&step_id=${step_id}`);
    }
    if (state === 'Quality Control') {
      navigate(`/quality-control?work_id=${work_id}&step_id=${step_id}`);
    }
  };

  const formatDate = timestamp => {
    let date = new Date(timestamp);
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);
    let seconds = ('0' + date.getSeconds()).slice(-2);
    return (
      day +
      '/' +
      month +
      '/' +
      year +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds
    );
  };

  return (
    <div className="work-orders-container">
      <h1 className="work-orders-title">Work Orders</h1>
      <button
        className="create-button"
        onClick={() => navigate('/create-work-order')}
      >
        + Create
      </button>
      <Filter
        columns={columns}
        onFilterChange={handleFilterChange}
        currentColumn={filter.column}
        currentQuery={filter.query}
      />
      <div className="work-orders-table-container">
        <table className="work-orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Work ID</th>
              <th>Order Number</th>
              <th>Project Number</th>
              <th>Vendor</th>
              <th>Inspector</th>
              <th>Step Name</th>
              <th>Timestamp</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkOrders.map(workOrder => (
              <tr key={workOrder.id}>
                <td>{workOrder.id}</td>
                <td>{workOrder.work_id}</td>
                <td>{workOrder.order_number}</td>
                <td>{workOrder.project_number}</td>
                <td>{getVendorName(workOrder.vendor_id)}</td>
                <td>{getInspectorName(workOrder.inspector_id)}</td>
                <td>{workOrder.step_name}</td>
                <td>{formatDate(workOrder.timestamp)}</td>
                <td>{workOrder.state}</td>
                <td>{workOrder.status}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() =>
                      handleEdit(
                        workOrder.id,
                        workOrder.work_id,
                        workOrder.state
                      )
                    }
                  >
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
