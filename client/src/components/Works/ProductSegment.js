import React, { useEffect, useState } from 'react';
import { getFormByVendorIdAndProductId, getFormByFormId } from '././worksapi'; 
import "./ProductSegment.css";

const ProductSegment = ({ product, vendorId }) => {
    const [formInfo, setFormInfo] = useState(null);
    const [formDetail, setFormDetail] = useState(null);
    const [activeStep, setActiveStep] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleStepClick = (stepOrder) => {
        setActiveStep(stepOrder);
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
          {formInfo ? (
            <div>
              {formDetail ? (
                <div>
                  <div className="segment-buttons">
                    {formDetail.steps.map((step) => (
                      <button className='product-segment-btn' key={step.order} onClick={() => handleStepClick(step.order)}>
                        {step.name}
                      </button>
                    ))}
                  </div>
                  {formDetail.steps.map((step) => (
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
                              {/* <td>
                              <button onClick={() => setModalIsOpen(true)}>
                                <i className="fas fa-info-circle"></i>
                              </button>
                              </td> */}
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
              ) : (
                <p>Form detayları yüklenirken hata oluştu.</p>
              )}
            </div>
          ) : (
            <p>ITP formu yok.</p>
          )}
                  {/* <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Example Modal"
          >
            <h2>Images</h2>
            <img src="https://yenastorageaccount.blob.core.windows.net/yenacontainer/123.png" alt="Image 1" width="300" />
            <img src="https://yenastorageaccount.blob.core.windows.net/yenacontainer/3625f786-4438-459a-b7d0-8cfaeff00dce.png" alt="Image 2"  width="300" />
            <img src="https://yenastorageaccount.blob.core.windows.net/yenacontainer/5d39d9d1-1c49-47c0-85cf-7edb62144bc1.png" alt="Image 3" width="300" />
            <button onClick={() => setModalIsOpen(false)}>close</button>
          </Modal> */}
        </div>
        
      );
    };
    
    export default ProductSegment;