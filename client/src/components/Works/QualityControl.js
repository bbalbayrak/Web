import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductSegment from './ProductSegment';
import {
  getWorkById,
  getProductById,
  getWorkProducts,
  updateWorkStepStatus,
} from './worksapi';

const QualityControl = () => {
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

  const handleComplete = () => {
    // Save işlemini gerçekleştirebilirsiniz
  };

return (
    <div className="form-page-container">
      <h2>Quality Control</h2>
      {work && (
        <div>
          <h3>Work Details</h3>
          <p>Order Number: {work.data.order_number}</p>
          <p>Project Number: {work.data.project_number}</p>
        </div>
      )}

      <div className="product-segments">
        <h3>Products</h3>
        {products.map((product, index) => (
        <ProductSegment key={`${product.id}-${index}`} product={product} workInfo={work} />
      ))}
      </div>

      <button onClick={handleComplete} className="btn btn-primary">
        Complete
      </button>
    </div>
  );
};

export default QualityControl;
