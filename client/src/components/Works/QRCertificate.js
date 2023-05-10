import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {  getWorkById, createWorkStep,  updateWorkStepStatus, getProductById, getCertificatesByWorkId, getWorkProducts, getFormByVendorIdAndProductId, getFormByFormId, createQualityControlEntry } from './worksapi';
import "./QRCertificate.css"

const QRCertificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [products, setProducts] = useState([]);
  const [formInfo, setFormInfo] = useState(null);
  const [formDetail, setFormDetail] = useState(null);
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
  
            // form ve formDetails alınıyor
            const form = await getFormByVendorIdAndProductId(workData.data.vendor_id, product.data.id);
            setFormInfo(form);
  
            if (form) {
              const formDetails = await getFormByFormId(form.form.id);
              setFormDetail(formDetails);
            }
  
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

  const sendSubstepData = async (substep) => {
    const qualityControlData = {
      form_id: formInfo.form.id,
      substep_id: substep.id,
      step_name: substep.step_name, 
      name: substep.name, 
      technical_drawing_numbering: substep.technical_drawing_numbering, 
      tools: substep.tools, 
      description: substep.description, 
      actual_dimension: substep.actual_dimension, 
      lower_tolerance: substep.lower_tolerance, 
      upper_tolerance: substep.upper_tolerance, 
      example_visual_url: substep.example_visual_url, 
      status: substep.status, 
      type: substep.type,
      image_id: substep.id,
      measured_value_1: null,
      measured_value_2: null,
      measured_value_3: null,
      work_id: work.data.id,
    };
  
    await createQualityControlEntry(qualityControlData);
  };
  


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

      if (formDetail && formDetail.steps) {
        for (const step of formDetail.steps) {
          if (step.substeps) {
            for (const substep of step.substeps) {
              await sendSubstepData(substep);
            }
          }
        }
      }

      await updateWorkStepStatus(step_id, 'Closed');
  
      navigate(`/workorders`);
    } catch (error) {
      // console.error('Error sending QR questions:', error);
    }
  };

  return (
    <div className="qr-form-page-container">
      <h2 className="qr-heading">QR Certificate</h2>
      <div className="qr-certificates-container">
        <h3 className="qr-subheading">Sertifikalar</h3>
        <ul className="qr-certificates-list">
          {certificates.map((certificate, index) => (
            <li key={index} className="qr-certificate-item">
              <a href={certificate.certificate_url} target="_blank" rel="noopener noreferrer" className="qr-certificate-link">
                {certificate.certificate_url}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSend} className="qr-btn qr-btn-primary">
        Send
      </button>
    </div>
  );
};

export default QRCertificate;
