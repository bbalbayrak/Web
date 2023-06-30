import React, { useState, useEffect } from 'react';
import "./UploadForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { useApi } from './UploadFormApi';

const UploadForm = () => {
  const [name, setName] = useState('');
  const [odooid, setOdooid] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [technicalDrawingFile, setTechnicalDrawingFile] = useState(null);
  const [guideFile, setGuideFile] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const {
    response,
    customers,
    products,
    errorMessage,
    successMessage,
    fetchCustomers,
    fetchProducts,
    submitProduct,
    getCustomerNameById
  } = useApi();

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  // <FontAwesomeIcon icon={faFilePdf} size="2x" /> {getFileNameFromUrl(product.guideurl) || 'Kılavuz'}
  const getFileNameFromUrl = (url) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

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

    submitProduct(formData);
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
                  <input type="number" value={odooid} onChange={(e) => setOdooid(e.target.value)} />
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
            <h3>İsim: {response.data.name}</h3>
            <h3>Odooid: {getCustomerNameById(response.data.customerid)}</h3>
            <h3>Teknik Çizim: {response.data.technicaldrawingurl}</h3>
            <h3>Kılavuz: {response.data.guideurl}</h3>
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
                  <a href={`https://drive.google.com/viewerng/viewer?embedded=true&url=${product.technicaldrawingurl}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFilePdf} size="2x" /> {product.name || 'Teknik Çizim'}
                  </a>
                </td>
                <td>
                  <a href={`https://drive.google.com/viewerng/viewer?embedded=true&url=${product.guideurl}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFilePdf} size="2x" /> {product.guideurl || 'Kılavuz'}
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
