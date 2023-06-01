import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductSegment from './ProductSegment';
import {
  getWorkById,
  getProductById,
  getWorkProducts,
  updateWorkStepStatus,
} from './worksapi';
import "./QualityControl.css"
import "./WorkDetails.css"

const QualityControl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
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
      <ProductSegment key={activeProduct.id} product={activeProduct} vendorId={work.data.vendor_id} work_id={work_id}/>
    );
  };

  return (
    <div className="form-page-container">
      <h2 className="qc-heading">Quality Control</h2>
      {work && (
        <div className="work-details">
          <table>
              <tbody>
                  <tr>
                    <h3>Work Details</h3>
                  </tr>
                  <tr>
                      <td>Order Number: {work.data.order_number}</td>
                      <td>Inspector: {work.data.inspector_id}</td>
                  </tr>
                  <tr>
                      <td>Project Number: {work.data.project_number}</td>
                      <td>Foreman: {work.data.foreman_id}</td>
                  </tr>
                  <tr>
                      <td>Vendor: {work.data.vendor_id}</td>
                      <td>Work Type: {work.data.work_type}</td>
                  </tr>
                  <tr>
                      <td>Customer: {work.data.customer_id}</td>
                  </tr>
                  <tr>
                      <td>Status: {work.data.status}</td>
                  </tr>
              </tbody>
          </table>
      </div>
      )}
      <div className="product-segments">
        <div className="work-detail-row">
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
