import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, useCallback } from 'react';
import { getFormByVendorIdAndProductId, getQualityControlEntriesByFormId, updateQualityControlEntry, getImagesByQualityControlId } from '././worksapi';
import ImagePopup from "../shared/Popup/ImagePopup";
import './ProductSegment.css';

const ProductSegment = ({ product, vendorId, work_id }) => {
  const [formInfo, setFormInfo] = useState(null);
  const [formDetail, setFormDetail] = useState(null);
  const [activeStep, setActiveStep] = useState(null);
  const [measuredValues, setMeasuredValues] = useState({});
  const [imagePopup, setImagePopup] = useState(false);
  const [imagePopupUrl, setImagePopupUrl] = useState("");
  const [imageList, setImageList] = useState([]);

  const openImagePopup = async (substepId) => {
    const images = await fetchImages(substepId);
    if (images && images.data.length > 0) {
      const imageList = images.data.map(imgData => imgData.image_url);
      setImageList(imageList);
      setImagePopup(true);
    }
  };
  

  const fetchImages = async (substepId) => {
    try {
      const images = await getImagesByQualityControlId(substepId);
      // console.log("Fetched Images:", images); // Eklendi
      return images;
    } catch (error) {
      // console.error(`Error fetching images by substep ID: ${error.message}`);
      throw error;
    }
  };

  const handleStepClick = (stepOrder) => {
    setActiveStep(stepOrder);
  };

  const fetchForm = useCallback(async () => {
    const form = await getFormByVendorIdAndProductId(vendorId, product.id);
    setFormInfo(form);

    if (form) {
      const formDetails = await getQualityControlEntriesByFormId(form.form.id, work_id);
      setFormDetail(formDetails);
    }
  }, [vendorId, product.id]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  const handleMeasuredValueChange = (substepId, field, value) => {
    setMeasuredValues({
      ...measuredValues,
      [substepId]: {
        ...measuredValues[substepId],
        [field]: value,
      },
    });
  };

  const handleSaveClick = async () => {
    const entriesToUpdate = Object.entries(measuredValues)
      .filter(([id, values]) => Object.values(values).some((value) => value !== null && value !== ''))
      .map(([id, values]) => ({
        id,
        ...values,
      }));

    try {
      await updateQualityControlEntry(entriesToUpdate);
      fetchForm();
    } catch (error) {
      // console.error('Ölçülen değerler güncellenirken hata:', error);
    }
  };

const checkTolerance = (substep, measuredValueKey) => {
  const measuredValue = measuredValues[substep.id]?.[measuredValueKey] || substep[measuredValueKey];
  if (!measuredValue) {
    return true;
  }

  const lowerTolerance = substep.lower_tolerance;
  const upperTolerance = substep.upper_tolerance;
  return measuredValue >= lowerTolerance && measuredValue <= upperTolerance;
};

  const checkAllTolerances = (substep) => {
    return (
      checkTolerance(substep, 'measured_value_1') &&
      checkTolerance(substep, 'measured_value_2') &&
      checkTolerance(substep, 'measured_value_3')
    );
  };

  const renderToleranceIcon = (substep, measuredValueKey) => {
    if (checkTolerance(substep, measuredValueKey)) {
      return <i className="fas fa-check"></i>;
    } else {
      return <i className="fas fa-times"></i>;
    }
  };

  const renderCellClass = (substep, measuredValueKey) => {
    if (!checkTolerance(substep, measuredValueKey)) {
      return 'cell-error';
    }
    return '';
  };


  return (
    <div className="product-segment">
      {imagePopup && <ImagePopup onClose={() => setImagePopup(false)} imageList={imageList} />}
      <p>{product.description}</p>
      <div>
        <div className="segment-buttons">
          {formDetail &&
            formDetail.steps.map((step) => (
              <button 
                className={`product-segment-btn ${activeStep === step.order ? 'active' : ''}`}
                key={step.order} 
                onClick={() => handleStepClick(step.order)}
              >
                {step.name}
              </button>
            ))}
        </div>
        {formDetail &&
          formDetail.steps.map(
            (step) =>
              activeStep === step.order && (
                <div key={step.order} className="segment-content">
                  <table>
                    <thead>
                      <tr>
                        <th className="column-5">Image</th>
                        <th className="column-9">Number</th>
                        <th className="column-9">Tools</th>
                        <th className="column-9">Description</th>
                        <th className="column-9">Actual Dimension</th>
                        <th className="column-9">Lower Tolerance</th>
                        <th className="column-9">Upper Tolerance</th>
                        <th className="column-9">Sample Quantity</th>
                        <th className="column-9">Measured Value 1</th>
                        <th className="column-9">Measured Value 2</th>
                        <th className="column-9">Measured Value 3</th>
                        <th className="column-25">OK</th>
                        <th className="column-25">NOK</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {step.substeps.map((substep) => (
                        <tr key={substep.id}>
                          <td>
                            <button onClick={() => openImagePopup(substep.id)}>
                              <FontAwesomeIcon icon={faImage} />
                            </button>
                          </td>
                          <td>{substep.technical_drawing_numbering}</td>
                          <td>{substep.tools}</td>
                          <td>{substep.description}</td>
                          <td>{substep.actual_dimension}</td>
                          <td>{substep.lower_tolerance}</td>
                          <td>{substep.upper_tolerance}</td>
                          <td>{substep.sample_quantity}</td>
                          <td className={renderCellClass(substep, 'measured_value_1')}>
                            <input
                              type="text"
                              className={renderCellClass(substep, 'measured_value_1')}
                              value={measuredValues[substep.id]?.measured_value_1 || substep.measured_value_1}
                              onChange={(e) => handleMeasuredValueChange(substep.id, 'measured_value_1', e.target.value)}
                            />
                            {renderToleranceIcon(substep, 'measured_value_1')}
                          </td>
                          <td className={renderCellClass(substep, 'measured_value_2')}>
                            <input
                              type="text"
                              className={renderCellClass(substep, 'measured_value_1')}
                              value={measuredValues[substep.id]?.measured_value_2 || substep.measured_value_2}
                              onChange={(e) => handleMeasuredValueChange(substep.id, 'measured_value_2', e.target.value)}
                            />
                            {renderToleranceIcon(substep, 'measured_value_2')}
                          </td>
                          <td className={renderCellClass(substep, 'measured_value_3')}>
                            <input
                              type="text"
                              className={renderCellClass(substep, 'measured_value_1')}
                              value={measuredValues[substep.id]?.measured_value_3 || substep.measured_value_3}
                              onChange={(e) => handleMeasuredValueChange(substep.id, 'measured_value_3', e.target.value)}
                            />
                            {renderToleranceIcon(substep, 'measured_value_3')}
                          </td>
                          <td>
                            {checkAllTolerances(substep) ? (
                              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
                            ) : null}
                          </td>
                          <td>
                            {!checkAllTolerances(substep) ? (
                              <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              ),
          )}
      </div>
    </div>
  );
};
  
  export default ProductSegment;