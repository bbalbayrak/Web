import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [name, setName] = useState('');
  const [odooid, setOdooid] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [technicalDrawingFile, setTechnicalDrawingFile] = useState(null);
  const [guideFile, setGuideFile] = useState(null);
  const [response, setResponse] = useState(null);

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          İsim:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Odooid:
          <input type="text" value={odooid} onChange={(e) => setOdooid(e.target.value)} />
        </label>
        <br />
        <label>
          Müşteri ID:
          <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
        </label>
        <br />
        <label>
          Teknik Çizim (PDF):
          <input type="file" accept=".pdf" onChange={(e) => setTechnicalDrawingFile(e.target.files[0])} />
        </label>
        <br />
        <label>
          Kılavuz (PDF, JPG):
          <input type="file" accept=".pdf,.jpg,.jpeg" onChange={(e) => setGuideFile(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Kaydet</button>
      </form>
      {response && (
        <div>
          <h3>Response:{response.data.name}</h3>
          <h3>Response:{response.data.customerid}</h3>
          <h3>Response:{response.data.guideurl}</h3>
          <h3>Response:{response.data.technicaldrawingurl}</h3>



        </div>
      )}
    </div>
  );
};

export default UploadForm;
