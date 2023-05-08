import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductSegment from './ProductSegment';
import {
  getWorkById,
  getProductById,
  getWorkProducts,
  updateWorkStepStatus,
} from './worksapi';
import ImagePopup from '../shared/Popup/ImagePopup';
import "./QualityControl.css"

const QualityControl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
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

  const handleComplete = () => {
    // Save işlemini gerçekleştirebilirsiniz
  };

  const handleProductClick = (index) => {
    setActiveProductIndex(index);
  };

  const renderProductContent = () => {
    if (!products.length) return null;
    const activeProduct = products[activeProductIndex];
    return (
      <ProductSegment key={activeProduct.id} product={activeProduct} vendorId={work.data.vendor_id} />
    );
  };
  const handleImageClick = () => {
    setShowImagePopup(true);
  };

  return (
    <div className="form-page-container">
      {showImagePopup && <ImagePopup onClose={() => setShowImagePopup(false)} />}
      <h2 className="qc-heading">Quality Control</h2>
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
      <div className="product-segments">
        <div className="work-detail-row">
          <img
            src={require('..//shared/a1.jpg')}
            alt=""
            className="qc-img"
            onClick={handleImageClick}
          />
        </div>
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => handleProductClick(index)}
            className={activeProductIndex === index ? 'active' : ''}
          >
            {product.name}
          </button>
        ))}
      </div>
      <div className="product-content">{renderProductContent()}</div>
      <button onClick={handleComplete} className="qc-btn qc-btn-primary">
        Complete
      </button>
    </div>
  );
};

export default QualityControl;
