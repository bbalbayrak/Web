import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {  getWorkById, createWorkStep,  updateWorkStepStatus, getProductById, getCertificatesByWorkId, getWorkProducts} from './worksapi';

const QRCertificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [products, setProducts] = useState([]);
  const [certificates, setCertificates] = useState([]);
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
      const certificatesData = await getCertificatesByWorkId(work_id);
      if (certificatesData) {
        setCertificates(certificatesData.data);
      }
    };

    fetchData();
  }, [work_id]);


  const handleSend = async () => {
    try {
      // Yeni bir work step oluşturun
      const workStepData = {
        work_id: work.data.id,
        step_name: 'Quality Control',
        timestamp: new Date().toISOString(),
        state: 'Quality Control',
        status: 'Open',
      };
  
      const newWorkStep = await createWorkStep(workStepData);

      await updateWorkStepStatus(step_id, 'Closed');
  
      navigate(`/workorders`);
    } catch (error) {
      console.error('Error sending QR questions:', error);
    }
  };

  return (
    <div className="form-page-container">
      <h2>QR Certificate</h2>
      <div>
        <h3>Sertifikalar</h3>
        <ul>
          {certificates.map((certificate, index) => (
            <li key={index}>
              <a href={certificate.certificate_url} target="_blank" rel="noopener noreferrer">
                {certificate.certificate_url}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSend} className="btn btn-primary">
        Send
      </button>
    </div>
  );
};

export default QRCertificate;
