import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UploadForm.css"


const UploadForm = () => {
  const [name, setName] = useState('');
  const [odooid, setOdooid] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [technicalDrawingFile, setTechnicalDrawingFile] = useState(null);
  const [guideFile, setGuideFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/customers');
        setCustomers(data.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/products');
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCustomers();
    fetchProducts();

  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('odooid', odooid);
    formData.append('customerid', customerId);
    formData.append('technicaldrawingurl', technicalDrawingFile);
    formData.append('guideurl', guideFile);

    try {
      const { data } = await axios.post('http://localhost:3001/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(data);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="upload-form-container">
    <form className='products-form' onSubmit={handleSubmit}>
      <table className="form-table">
          <tbody>
            <tr>
              <td>İsim:</td>
              <td>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Odooid:</td>
              <td>
                <input type="text" value={odooid} onChange={(e) => setOdooid(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Müşteri İsimleri:</td>
              <td>
                <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                  <option value="">Müşteri seçin</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Teknik Çizim (PDF):</td>
              <td>
                <input type="file" accept=".pdf" onChange={(e) => setTechnicalDrawingFile(e.target.files[0])} />
              </td>
            </tr>
            <tr>
              <td>Kılavuz (PDF, JPG):</td>
              <td>
                <input type="file" accept=".pdf,.jpg,.jpeg" onChange={(e) => setGuideFile(e.target.files[0])} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit">Kaydet</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {response && (
        <div>
          <h3>Response:{response.data.name}</h3>
          <h3>Response:{response.data.customerid}</h3>
          <h3>Response:{response.data.guideurl}</h3>
          <h3>Response:{response.data.technicaldrawingurl}</h3>
        </div>
      )}
      <h2>Ürün Listesi</h2>
      <table className="product-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>İsim</th>
            <th>Odooid</th>
            <th>Müşteri ID</th>
            <th>Teknik Çizim URL</th>
            <th>Kılavuz URL</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.odooid}</td>
              <td>{product.customerid}</td>
              <td>
                <a href={product.technicaldrawingurl} target="_blank" rel="noopener noreferrer">
                  Teknik Çizim
                </a>
              </td>
              <td>
                <a href={product.guideurl} target="_blank" rel="noopener noreferrer">
                  Kılavuz
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadForm;