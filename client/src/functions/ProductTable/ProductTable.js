import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '..//..//api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ProductTable.css';
import axios from 'axios';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('');

  // input alanları için state'ler
  const [newName, setNewName] = useState('');
  const [newOdooid, setNewOdooid] = useState('');
  const [newCustomer, setNewCustomer] = useState('');
  const [newTechnicalDrawing, setNewTechnicalDrawing] = useState('');
  const [newGuide, setNewGuide] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then((res) => {
        console.log("Products data:", res.data.data);
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const handleAddProduct = async (newProduct) => {
    const addedProduct = await addProduct(newProduct);
    setProducts([...products, addedProduct]);
    setAddingProduct(false);
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const updatedProductData = await updateProduct(id, updatedProduct);
    setProducts(
      products.map((product) =>
        product.id === id ? updatedProductData : product
      )
    );
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search term:", event.target.value);
  };
  
  const handleFieldChange = (event) => {
    setSearchField(event.target.value);
    console.log("Search field:", event.target.value);
  };
  

  return (
    <div className="product-table-container">
      <div className="header-container">
        <div>
          <select value={searchField} onChange={handleFieldChange}>
            <option value="">Arama Kriteri Seçin</option>
            <option value="name">İsim</option>
            <option value="odooid">Odooid</option>
            <option value="customer">Müşteri</option>
            <option type="file" value="technicalDrawing">Teknik Çizim (PDF)</option>
            <option value="guide">Kılavuz (PDF, JPG)</option>
          </select>
          <input
            type="text"
            placeholder="Arama..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <button onClick={() => setAddingProduct(true)}>
            <FontAwesomeIcon icon={faPlus} />
            {' Ürün Ekle'}
          </button>
        </div>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>İsim</th>
            <th>Odooid</th>
            <th>Müşteri</th>
            <th>Teknik Çizim (PDF)</th>
            <th>Kılavuz (PDF, JPG)</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {addingProduct && (
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="İsim"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Odooid"
                  value={newOdooid}
                  onChange={(e) => setNewOdooid(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Müşteri"
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="file"
                  accept=".pdf"
                  placeholder="Teknik Çizim (PDF)"
                  onChange={(e) => setNewTechnicalDrawing(e.target.files[0])}
                />
              </td>
              <td>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg"
                  placeholder="Kılavuz (PDF, JPG)"
                  onChange={(e) => setNewGuide(e.target.files[0])}
                />
              </td>
              <td>
                <button
                  onClick={() => {
                    const newProduct = {
                      name: newName,
                      odooid: newOdooid,
                      customer: newCustomer,
                      technicalDrawing: newTechnicalDrawing,
                      guide: newGuide,
                    };
                    handleAddProduct(newProduct);
                  }}
                >
                  <FontAwesomeIcon icon={faSave} />
                  {' Kaydet'}
                </button>
                <button onClick={() => setAddingProduct(false)}>
                  <FontAwesomeIcon icon={faTrash} />
                  {' İptal'}
                </button>
              </td>
            </tr>
          )}
          
          {products.map((product, index) => (
  <tr key={index}>
    <td>{product.name}</td>
    <td>{product.odooid}</td>
    <td>{product.customer}</td>
    <td>
      {product.technicaldrawingurl ? (
        <a href={product.technicaldrawingurl} target="_blank" rel="noopener noreferrer">
          {product.technicaldrawingurl}
        </a>
      ) : (
        ''
      )}
    </td>
    <td>
      {product.guideUrl ? (
        <a href={product.guideUrl} target="_blank" rel="noopener noreferrer">
          {product.guideUrl}
        </a>
      ) : (
        ''
      )}
    </td>
    <td>
      <button onClick={() => handleUpdateProduct(product.id, product)}>
        <FontAwesomeIcon icon={faSave} />
        {' Kaydet'}
      </button>
      <button onClick={() => handleDeleteProduct(product.id)}>
        <FontAwesomeIcon icon={faTrash} />
        {' Sil'}
      </button>
    </td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
