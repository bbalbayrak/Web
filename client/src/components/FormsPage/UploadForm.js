import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UploadForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

const UploadForm = () => {
  const [name, setName] = useState('');
  const [odooid, setOdooid] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [technicalDrawingFile, setTechnicalDrawingFile] = useState(null);
  const [guideFile, setGuideFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([])
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get('https://portal-test.yenaengineering.nl/api/customers');
      setCustomers(data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('https://portal-test.yenaengineering.nl/api/products');
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const getFileNameFromUrl = (url) => {
    return url.substring(url.lastIndexOf('/') + 1);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !odooid || !customerId) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('odooid', odooid);
    formData.append('customerid', customerId);
    formData.append('technicaldrawingurl', technicalDrawingFile);
    formData.append('guideurl', guideFile);

    try {
      const { data } = await axios.post('https://portal-test.yenaengineering.nl/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(data);
      setSuccessMessage('Ürün başarıyla eklendi.');
      setErrorMessage(null);
      await fetchProducts();
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage('Ürün eklenirken hata oluştu.');
    }
  };

  const getCustomerNameById = (id) => {
    const customer = customers.find((customer) => customer.id === id);
    return customer ? customer.name : '';
  };

  return (
    <div className="upload-form-container">
      {!isValid && (
        <div className="error-message">
          Lütfen tüm alanları doldurunuz!
        </div>
      )}
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
            <h3>Response:{getCustomerNameById(response.data.customerid)}</h3>
            <h3>Response:{response.data.guideurl}</h3>
            <h3>Response:{response.data.technicaldrawingurl}</h3>
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <h2>Ürün Listesi</h2>
        <table className="product-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>İsim</th>
              <th>Odooid</th>
              <th>Müşteri İsim</th>
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
                <td>{getCustomerNameById(product.customerid)}</td>
                <td>
  <a href={product.technicaldrawingurl} target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faFilePdf} size="2x" /> {product.name || 'Teknik Çizim'}
  </a>
</td>
<td>
  <a href={product.guideurl} target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faFilePdf} size="2x" /> {getFileNameFromUrl(product.guideurl) || 'Kılavuz'}
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
