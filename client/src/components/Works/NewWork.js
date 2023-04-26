import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getWorkById,
  getProductById,
  getWorkProducts,
  createWorkStep,
  updateWorkStepStatus,
} from './worksapi';

const NewWork = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [products, setProducts] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const work_id = searchParams.get('work_id');
  const step_id = searchParams.get('step_id');

  useEffect(() => {
    const fetchData = async () => {
      const workData = await getWorkById(work_id);
      setWork(workData);
      const productsData = await getWorkProducts(work_id);

      if (productsData) {
        const fetchedProducts = await Promise.all(
          productsData.data.map(async (productData) => {
            const product = await getProductById(productData.product_id);
            return product.data;
          })
        );

        setProducts(fetchedProducts);
      }
    };

    fetchData();
  }, [work_id]);


  const handleSave = () => {
    // Save işlemini gerçekleştirebilirsiniz
  };

  const handleSend = async () => {
    try {
      // Yeni bir work step oluşturun
      const workStepData = {
        work_id: work.data.id,
        step_name: 'Certificate',
        timestamp: new Date().toISOString(),
        state: 'Certificate',
        status: 'Open',
      };
  
      const newWorkStep = await createWorkStep(workStepData);

      await updateWorkStepStatus(step_id, 'Closed');
  
      navigate(`/workorders`);
    } catch (error) {
      console.error('Error sending QR questions:', error);
    }
  };

  const handleRevise = () => {
    // Revize işlemini gerçekleştirebilirsiniz
  };


  return (
    <div className="form-page-container">
      <h2>QR Control</h2>
      {work && (
        <div>
          <h3>Work Details</h3>
          <p>Order Number: {work.data.order_number}</p>
          <p>Project Number: {work.data.project_number}</p>
          <p>Vendor: {work.data.vendor_id}</p>
          <p>Customer: {work.data.customer_id}</p>
          <p>Inspector: {work.data.inspector_id}</p>
          <p>Foreman: {work.data.foreman_id}</p>
          <p>Work Type: {work.data.work_type}</p>
          <p>State: {work.data.state}</p>
          <p>Status: {work.data.status}</p>
          <p>Creator: {work.data.creator_id}</p>

        </div>
      )}

      {products &&
        products.map((product, productIndex) => (
          <div key={productIndex}>
            <h3>Product: {product.name}</h3>
            <p>Technical Drawing URL: {product.technicaldrawingurl}</p>   
          </div>
        ))}
  
      <button type="button" onClick={handleSave} className="btn btn-primary">
        Save
      </button>
      <button type="button" onClick={handleSend} className="btn btn-success">
        Send
      </button>
      <button type="button" onClick={handleRevise} className="btn btn-warning">
        Revize
      </button>
    </div>
  );
};

export default NewWork;