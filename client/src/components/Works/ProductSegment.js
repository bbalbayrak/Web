import React, { useEffect, useState } from 'react';
import { getFormByVendorIdAndProductId, getFormByFormId } from '././worksapi'; 
import "./ProductSegment.css";

const ProductSegment = ({ product, vendorId }) => {
    const [formInfo, setFormInfo] = useState(null);
    const [formDetail, setFormDetail] = useState(null);
    const [activeStep, setActiveStep] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleStepClick = (stepOrder) => {
        setActiveStep(stepOrder);
    };

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
  
    useEffect(() => {
      const fetchForm = async () => {
        const form = await getFormByVendorIdAndProductId(vendorId, product.id);
        setFormInfo(form);
  
        if (form) {
          const formDetails = await getFormByFormId(form.form.id);
          setFormDetail(formDetails);
        }
      };
  
      fetchForm();
    }, [vendorId, product.id]);

    return (
      <div className="product-segment">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div>
          <div className="segment-buttons">
            {formDetail && formDetail.steps.map((step) => (
              <button className='product-segment-btn' key={step.order} onClick={() => handleStepClick(step.order)}>
                {step.name}
              </button>
            ))}
          </div>
          {formDetail && formDetail.steps.map((step) => (
            activeStep === step.order &&
            <div key={step.order} className="segment-content">
              <table>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Tools</th>
                    <th>Description</th>
                    <th>Actual Dimension</th>
                    <th>Lower Tolerance</th>
                    <th>Upper Tolerance</th>
                    <th>Measured Value 1</th>
                    <th>Measured Value 2</th>
                    <th>Measured Value 3</th>
                    <th>OK</th>
                    <th>NOK</th>
                  </tr>
                </thead>
                <tbody>
                  {step.substeps.map((substep) => (
                    <tr key={substep.id}>
                      <td onClick={() => handleImageClick("https://via.placeholder.com/300")}>
                        <i className="fas fa-info-circle"></i>
                      </td>
                      <td>{substep.technical_drawing_numbering}</td>
                      <td>{substep.tools}</td>
                      <td>{substep.description}</td>
                      <td>{substep.actual_dimension}</td>
                      <td>{substep.lower_tolerance}</td>
                      <td>{substep.upper_tolerance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        
        {showPopup && (
          <div className="popup" onClick={handleClosePopup}>
            <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage} alt="Selected" />
              <button className="popup-close-btn" onClick={handleClosePopup}>X</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ProductSegment;
  