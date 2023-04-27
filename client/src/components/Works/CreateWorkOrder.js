import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWork, createWorkStep, getVendors, getCustomers, getUsers, getProducts, createWorkProduct } from './worksapi';
import "./CreateWorkOrder.css"

const CreateWorkOrder = () => {
  const navigate = useNavigate();
  const [workData, setWorkData] = useState({
    order_number: "",
    project_number: "",
    vendor_id: "",
    customer_id: "",
    quality_responsible_id: "",
    inspector_id: "",
    foreman_id: "",
    work_type: "",
    state: "",
    status: "",
    creator_id: "",
    creation_date: "",
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [qualityResponsibles, setQualityResponsibles] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [foremen, setForemen] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchVendors();
    fetchCustomers();
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await getVendors(); // Adjust this with your API call
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers(); // Adjust this with your API call
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers(); // Adjust this with your API call
      const qualityRes = response.data.filter((user) => user.role === 'Quality Responsible');
      const inspectorRes = response.data.filter((user) => user.role === 'Inspector');
      const foremanRes = response.data.filter((user) => user.role === 'Foreman');
      setQualityResponsibles(qualityRes);
      setInspectors(inspectorRes);
      setForemen(foremanRes);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts(); // Adjust this with your API call
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    setSelectedProducts(selectedOptions.map((option) => Number(option.value)));
  };

  const handleChange = (e) => {
    setWorkData({ ...workData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const createdWork = await createWork(workData);
      const workStepData = {
        work_id: createdWork.work.id,
        step_name: "New Work",
        timestamp: new Date().toISOString(),
        state: "New Work",
        status: "Open",
      };
      const createdWorkStep = await createWorkStep(workStepData);
      
      for (const productId of selectedProducts) {
        await createWorkProduct({ work_id: createdWork.work.id, product_id: productId });
      }
      navigate(`/workorders`);
    } catch (error) {
      console.error('Error creating work and workstep:', error);
    }
  };

  return (
    <div className="form-page-container">
      <h2>Create Work Order</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="order_number">Order Number</label>
          <input
            type="text"
            name="order_number"
            id="order_number"
            className="form-control"
            value={workData.order_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="project_number">Project Number</label>
          <input
            type="text"
            name="project_number"
            id="project_number"
            className="form-control"
            value={workData.project_number}
            onChange={handleChange}
            required
          />
        </div>
        {/* Replace vendor_id input with a dropdown */}
        <div className="form-group">
          <label htmlFor="vendor_id">Vendor</label>
          <select
            name="vendor_id"
            id="vendor_id"
            className="form-control"
            value={workData.vendor_id}
            onChange={handleChange}
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Replace customer_id input with a dropdown */}
        <div className="form-group">
          <label htmlFor="customer_id">Customer</label>
          <select
            name="customer_id"
            id="customer_id"
            className="form-control"
            value={workData.customer_id}
            onChange={handleChange}
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Replace quality_responsible_id input with a dropdown */}
        <div className="form-group">
          <label htmlFor="quality_responsible_id">Quality Responsible</label>
          <select
            name="quality_responsible_id"
            id="quality_responsible_id"
            className="form-control"
            value={workData.quality_responsible_id}
            onChange={handleChange}
          >
            <option value="">Select Quality Responsible</option>
            {qualityResponsibles.map((qr) => (
              <option key={qr.id} value={qr.id}>
                {qr.name}
              </option>
            ))}
          </select>
        </div>

        {/* Replace inspector_id input with a dropdown */}
        <div className="form-group">
          <label htmlFor="inspector_id">Inspector</label>
          <select
            name="inspector_id"
            id="inspector_id"
            className="form-control"
            value={workData.inspector_id}
            onChange={handleChange}
          >
            <option value="">Select Inspector</option>
            {inspectors.map((inspector) => (
              <option key={inspector.id} value={inspector.id}>
                {inspector.name}
              </option>
            ))}
          </select>
        </div>

        {/* Replace foreman_id input with a dropdown */}
        <div className="form-group">
          <label htmlFor="foreman_id">Foreman</label>
          <select
            name="foreman_id"
            id="foreman_id"
            className="form-control"
            value={workData.foreman_id}
            onChange={handleChange}
          >
            <option value="">Select Foreman</option>
            {foremen.map((foreman) => (
              <option key={foreman.id} value={foreman.id}>
                {foreman.name}
              </option>
            ))}
          </select>
        </div>

        {/* Replace work_type input with a dropdown */}
        <div className="form-group">
          <label htmlFor="work_type">Work Type</label>
          <select
            name="work_type"
            id="work_type"
            className="form-control"
            value={workData.work_type}
            onChange={handleChange}
            required
          >
            <option value="">Select Work Type</option>
            <option value="Proje">Proje</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            id="state"
            className="form-control"
            value={workData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            name="status"
            id="status"
            className="form-control"
            value={workData.status}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="creator_id">Creator ID</label>
          <input
            type="number"
            name="creator_id"
            id="creator_id"
            className="form-control"
            value={workData.creator_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="creation_date">Creation Date</label>
          <input
            type="datetime-local"
            name="creation_date"
            id="creation_date"
            className="form-control"
            value={workData.creation_date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Replace product_id input with a dropdown */}
        <div className="form-group">
          <label htmlFor="product_id">Products</label>
          <select
            name="product_id"
            id="product_id"
            className="form-control"
            value={selectedProducts}
            onChange={handleProductChange}
            multiple
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateWorkOrder;