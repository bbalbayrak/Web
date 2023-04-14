// ProductPage.js
import React from 'react';
import ProductTable from '../../functions/ProductTable/ProductTable';
import './ProductPage.css';

const ProductPage = () => {
  return (
    <div className="product-page">
      <h1>Ürün Sayfası</h1>
      <ProductTable />
    </div>
  );
};

export default ProductPage;
