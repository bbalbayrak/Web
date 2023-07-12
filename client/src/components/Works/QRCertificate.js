import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getWorkById, createWorkStep, updateWorkStepStatus, getProductByOdooId, getCertificatesByWorkId, getWorkProducts, getFormByVendorIdAndProductId, getFormByFormId, createQualityControlEntry } from './worksapi';
import "./QRCertificate.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const QRCertificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [products, setProducts] = useState([]);
  const [formInfo, setFormInfo] = useState([]);
  const [formDetail, setFormDetail] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const work_id = searchParams.get('work_id');
  const step_id = searchParams.get('step_id');

  const [hasNoFormInfo, setHasNoFormInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const workData = await getWorkById(work_id);
      setWork(workData);
  
      const productsData = await getWorkProducts(work_id);
  
      if (productsData) {
        const fetchedProducts = await Promise.all(
          productsData.data.map(async (productData) => {
            const product = await getProductByOdooId(productData.product_id);
            const form = await getFormByVendorIdAndProductId(workData.data.vendor_id, product.data.odooid);
      
            if (!form ) {
              setHasNoFormInfo(true);
              return product.data;
            }
            
            console.log("products",product);
            console.log("forms", form);
            setFormInfo(oldFormInfo => [...oldFormInfo, form]);
      
            const formDetails = await getFormByFormId(form.form.id);
            setFormDetail(oldFormDetail => [...oldFormDetail, formDetails]);
            console.log("formDetails", formDetails);
                  
            return product.data;
          })
        );
              
        setProducts(fetchedProducts);
        console.log("fetchedProducts", fetchedProducts);
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
      form_id: substep.form_id,
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
      work_id: substep.work_id,
      sample_quantity: substep.sample_quantity,
      row_number: substep.row_number
    };
  
    console.log('qualityControlData:', qualityControlData);  // eklediğimiz log
  
    await createQualityControlEntry(qualityControlData);
};

  const handleSend = async () => {
    try {
      const workStepData = {
        work_id: work.data.id,
        step_name: 'Quality Control',
        timestamp: new Date().toISOString(),
        state: 'Quality Control',
        status: 'Open',
      };
  
      const newWorkStep = await createWorkStep(workStepData);

      formDetail.forEach((form, index) => {
          form.steps.forEach(step => {
              step.substeps.forEach(async substep => {
                  if (formInfo[index] && formInfo[index].form) {
                      console.log('form_id:', formInfo[index].form.id);  // eklediğimiz log
                      await sendSubstepData({
                          ...substep,
                          form_id: formInfo[index].form.id,
                          work_id: work.data.id
                      });
                  }
              });
          });
      });
    
      await updateWorkStepStatus(step_id, 'Closed');
  
      navigate(`/workorders`);
    } catch (error) {
      // console.error('Error sending QR questions:', error);
    }
  };
  
  const getCertificateName = (url) => {
    const urlParts = url.split('/');
    const nameWithExtension = urlParts[urlParts.length - 1];
    const name = nameWithExtension.split('.pdf')[0];
    return name;
  };

  return (
    <div className="qr-form-page-container">
      <h2 className="qr-heading">QR Certificate</h2>
      {hasNoFormInfo && (
        <div className="alert alert-warning">
          No ITP form has been prepared yet.
        </div>
      )}
      <div className="qr-certificates-container">
        <h3 className="qr-subheading">Sertifikalar</h3>
        <ul className="qr-certificates-list">
          {certificates.map((certificate, index) => (
            <li key={index} className="qr-certificate-item">
              <div className="qr-certificate-div">
                <a href={certificate.certificate_url} target="_blank" rel="noopener noreferrer" className="qr-certificate-link">
                  <FontAwesomeIcon icon={faFilePdf} className="qr-certificate-icon"/>
                </a>
                <p className="qr-certificate-name">{getCertificateName(certificate.certificate_url)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSend} className="qr-btn qr-btn-primary" disabled={hasNoFormInfo}>
        Send
      </button>
    </div>
  );
};

export default QRCertificate;
