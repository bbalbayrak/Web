import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getWorkById,
  getProductById,
  getWorkProducts,
  createWorkStep,
  updateWorkStepStatus,
} from './worksapi';
import "./NewWork.css";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewWork = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [products, setProducts] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const work_id = searchParams.get('work_id');
  const step_id = searchParams.get('step_id');
  const [activeProductIndex, setActiveProductIndex] = useState(null);

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

  const handleProductClick = (index) => {
    if (activeProductIndex === index) {
      setActiveProductIndex(null);
    } else {
      setActiveProductIndex(index);
    }
  };
  return (
    <div className="form-page-container">
      <h2 className="form-page-title">QR Control</h2>
      {work && (
        <div className="work-details">
          <h3>Work Details</h3>
          <div className="work-detail-row">
            <p className="work-detail">Order Number: {work.data.order_number}</p>
            <p className="work-detail">Project Number: {work.data.project_number}</p>
          </div>
          <div className="work-detail-row">
            <p className="work-detail">Vendor: {work.data.vendor_id}</p>
            <p className="work-detail">Customer: {work.data.customer_id}</p>
          </div>
          <div className="work-detail-row">
            <p className="work-detail">Inspector: {work.data.inspector_id}</p>
            <p className="work-detail">Foreman: {work.data.foreman_id}</p>
          </div>
          <div className="work-detail-row">
            <p className="work-detail">Work Type: {work.data.work_type}</p>
            <p className="work-detail">State: {work.data.state}</p>
          </div>
          <div className="work-detail-row">
            <p className="work-detail">Status: {work.data.status}</p>
            <p className="work-detail">Creator: {work.data.creator_id}</p>
          </div>
        </div>
      )}
     <div className="products-container">
        {products &&
          products.map((product, productIndex) => (
            <div
              key={productIndex}
              className={`product ${activeProductIndex === productIndex ? 'active' : ''}`}
              onClick={() => handleProductClick(productIndex)}
            >
              <h3>
                <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                Product: {product.name}
              </h3>
              {activeProductIndex === productIndex && (
                <div className="product-details">
                  <p>Technical Drawing URL: {product.technicaldrawingurl}</p>
                </div>
              )}
            </div>
          ))}
      </div>

  
      <div className="button-container">
        <button type="button" onClick={handleSave} className="btn btn-primary save-btn">
          Save
        </button>
        <button type="button" onClick={handleSend} className="btn btn-success send-btn">
          Send
        </button>
        <button type="button" onClick={handleRevise} className="btn btn-warning revise-btn">
          Revize
        </button>
      </div>
    </div>
  );
};

export default NewWork;