import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorPage from '../PageNotFound/ErrorPage';
import { getFormById } from './formapi';
import { segments } from './renderSegmentContent';
import { renderSegmentContent } from './renderSegmentContent';
import { initialFormState, handleFormChange, saveForm, handleDragOver } from './pqc_utils';
import { addRow, handleInputChange, handleDrop, handleFileSelect } from './rowDetail';

const FormEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [activeSegment, setActiveSegment] = useState(1);
  const [finalRows, setFinalRows] = useState([]);
  const [subpartRows, setSubpartRows] = useState([]);
  const [paintRows, setPaintRows] = useState([]);
  const [coatingRows, setCoatingRows] = useState([]);
  const [productPackingRows, setProductRows] = useState([])
  const [error, setError] = useState(false);

  const addFinalRow = addRow(finalRows, setFinalRows);
  const handleFinalInputChange = handleInputChange(finalRows, setFinalRows);
  const handleFinalDrop = handleDrop(finalRows, setFinalRows);
  const handleFinalFileSelect = handleFileSelect(finalRows, setFinalRows);

  const addSubpartRow = addRow(subpartRows, setSubpartRows);
  const handleSubpartInputChange = handleInputChange(subpartRows, setSubpartRows);
  const handleSubpartDrop = handleDrop(subpartRows, setSubpartRows);
  const handleSubpartFileSelect = handleFileSelect(subpartRows, setSubpartRows);

  const addPaintRow = addRow(paintRows, setPaintRows);
  const handlePaintInputChange = handleInputChange(paintRows, setPaintRows);
  const handlePaintDrop = handleDrop(paintRows, setPaintRows);
  const handlePaintFileSelect = handleFileSelect(paintRows, setPaintRows);

  const addCoatingRow = addRow(coatingRows, setCoatingRows);
  const handleCoatingInputChange = handleInputChange(coatingRows, setCoatingRows);
  const handleCoatingDrop = handleDrop(coatingRows, setCoatingRows);
  const handleCoatingFileSelect = handleFileSelect(coatingRows, setCoatingRows)

  const addProductPackingRow = addRow(productPackingRows, setProductRows);
  const handleProductPackingInputChange = handleInputChange(productPackingRows, setProductRows);
  const handleProductPackingDrop = handleDrop(productPackingRows, setProductRows);
  const handleProductPackingFileSelect = handleFileSelect(productPackingRows, setProductRows)

  useEffect(() => {
    const fetchData = async () => {      try {
        const formData = await getFormById(id);
        console.log("Fetched form data: ", formData);  // Log the fetched form data
        setForm(formData);
      } catch (error) {
        console.error("Error fetching form: ", error);  // Log the error if there is one
        setError(true);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (form) {
      const activeStep = form.steps.find(
        (step) => step.name === segments[activeSegment - 1].name
      );
      console.log("Active step: ", activeStep);  // Log the active step
      if (activeStep && activeStep.substeps) {
        console.log("Active step substeps: ", activeStep.substeps);  // Log substeps before setting
        switch(activeSegment) {
          case 1:
            setSubpartRows(activeStep.substeps);
            break;
          case 2:
            setFinalRows(activeStep.substeps);
            break;
          case 3:
            setPaintRows(activeStep.substeps);
            break;
          case 4:
            setCoatingRows(activeStep.substeps);
            break;
          case 5:
            setProductRows(activeStep.substeps);
            break;
          default:
            break;
        }
      }
    }
  }, [form, activeSegment]);


  const handleSegmentClick = (order) => {
    setActiveSegment(order);
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className='form-edit-main'>
      <h1>ITP Formu</h1>
      {form ? (
        <div>
          <h2>Product Name: {form.product_name || form.product?.name}</h2>
          <h2>Vendor Name: {form.vendor_name || form.vendor?.name}</h2>
          <div className="segments">
            {segments.map((segment) => (
              <button key={segment.order} onClick={() => handleSegmentClick(segment.order)} className={activeSegment === segment.order ? 'active' : ''} >
                {segment.name}
              </button>
            ))}
          </div>
          <div className="segment-content">
            {renderSegmentContent({
              activeSegment,
              form,
              finalRows,
              subpartRows,
              paintRows,
              coatingRows,
              productPackingRows,
              handleFinalInputChange,
              handleSubpartInputChange,
              handlePaintInputChange,
              handleCoatingInputChange,
              handleProductPackingInputChange,
              handleDragOver,
              handleFinalDrop,
              handleSubpartDrop,
              handlePaintDrop,
              handleCoatingDrop,
              handleProductPackingDrop,
              handleFinalFileSelect,
              handleSubpartFileSelect,
              handlePaintFileSelect,
              handleCoatingFileSelect,
              handleProductPackingFileSelect,
              addFinalRow,
              addSubpartRow,
              addPaintRow,
              addCoatingRow,  
              addProductPackingRow,
              saveSubForm: saveForm(form, subpartRows, 0),
              saveFinalForm: saveForm(form, finalRows, 1),
              savePaintForm: saveForm(form, paintRows, 2),
              saveCoatingForm: saveForm(form, coatingRows, 3),
              saveProductPackingForm: saveForm(form, productPackingRows, 4)
            })}
          </div>
        </div>
      ) : (
        <p>Form yükleniyor...</p>
      )}
    </div>
  );
};

export default FormEdit;
