import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '..//..//api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ProductTable.css';

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
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct, technicalDrawingFile, guideFile) => {
    const addedProduct = await addProduct(newProduct, technicalDrawingFile, guideFile);
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
  };

  const handleFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredData = products.filter((product) => {
    if (!searchTerm || !searchField) return true;
    return product[searchField]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));

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
                    };
                    handleAddProduct(newProduct, newTechnicalDrawing, newGuide);
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
          {sortedData.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.odooid}</td>
              <td>{product.customer}</td>
              <td>
                {product.technicalDrawingUrl ? (
                  <a href={product.technicalDrawingUrl} target="_blank" rel="noopener noreferrer">
                    {product.technicalDrawing ? product.technicalDrawing.name : 'Teknik Çizim'}
                  </a>
                ) : (
                  ''
                )}
              </td>
              <td>
                {product.guideUrl ? (
                  <a href={product.guideUrl} target="_blank" rel="noopener noreferrer">
                    {product.guide ? product.guide.name : 'Kılavuz'}
                  </a>
                ) : (
                  ''
                )}
              </td>
              <td>
                <button
                  onClick={() => handleUpdateProduct(product.id, product)}
                >
                  <FontAwesomeIcon icon={faSave} />
                  {' Kaydet'}
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                >
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
