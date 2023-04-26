import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  getWorkById, createWorkStep,  updateWorkStepStatus,  getQRQuestionsByWorkId, getProductById} from './worksapi';
import { useNavigate, useLocation } from 'react-router-dom';
import './Certificate.css';

const Certificate = () => {
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [work, setWork] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const work_id = searchParams.get('work_id');
  const step_id = searchParams.get('step_id');

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const work_id = searchParams.get('work_id');

    const fetchData = async () => {
      const workData = await getWorkById(work_id);
      setWork(workData);

      const productData = await getProductById(workData.data.product_id);
      setProduct(productData);
    };

    fetchData();
  }, [location]);


  const handleSend = async () => {
    if (files.length > 0) {
      for (const file of files) {
        const formData = new FormData();
        formData.append('certificate_file', file);
        formData.append('work_id', work_id);
        // formData.append('product_id', product.data.id);
        formData.append('step_id', step_id);
  
        try {
          await axios.post('http://localhost:3001/certificates', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } catch (error) {
          console.error(error);
        }
      }
    }

    try {
      await updateWorkStepStatus(step_id, 'Closed');
    } catch (error) {
      console.error(`Error updating work step status: ${error.message}`);
    }
  
    try {
      const workStepData = {
        work_id: work.data.id,
        step_name: 'QR Certificate',
        timestamp: new Date().toISOString(),
        state: 'QR Certificate',
        status: 'Open',
      };
       await createWorkStep(workStepData);
    } catch (error) {
      console.error(`Error creating new work step: ${error.message}`);
    }
  
    navigate('/workorders');
  };

  const handleContinueWithoutSending = () => {
    navigate('/workorders');
  };

  return (
    <div className="form-page-container">
      <h2>Certificate</h2>
      {work && (
        <div>
          <h3>Work Details</h3>
          <p>Order Number: {work.data.order_number}</p>
          <p>Project Number: {work.data.project_number}</p>
        </div>
      )}
      
      <div className="file-thumbnails">
        {files.map((file, index) => (
          <div key={index} className="file-thumbnail">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="file-thumbnail-img"
            />
          </div>
        ))}
      </div>
      <input type="file" multiple onChange={handleFileChange} />
      <br></br>
      <button onClick={handleSend} className="btn btn-primary">
        Gönder
      </button>
      <button onClick={handleContinueWithoutSending} className="btn btn-secondary">
        Göndermeden Devam Et
      </button>
    </div>
  );
};

export default Certificate;