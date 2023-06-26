import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById } from './formapi';
import { segments } from './renderSegmentContent';
import { renderSegmentContent } from './renderSegmentContent';
import { initialFormState, fetchItems, handleFormChange, saveForm, handleDragOver } from './pqc_utils';
import { addRow, handleInputChange, handleDrop, handleFileSelect } from './rowDetail';

const FormEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [activeSegment, setActiveSegment] = useState(1);
  const [formSaved, setFormSaved] = useState(false);
  const [rows, setRows] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await getFormById(id);
        setForm(formData);
      } catch (error) {
        // console.error('Error fetching form:', error);
      }
    };
    fetchData();
  }, [id]);
  
  useEffect(() => {
    if (formSaved) {
      const fetchData = async () => {
        try {
          const formData = await getFormById(id);
          setForm(formData);
          setFormSaved(false);
        } catch (error) {
          
        }
      };
      fetchData();
    }
  }, [formSaved, id]);
  useEffect(() => {
    if (form) {
      const finalPartMeasurementStep = form.steps.find(
        (step) => step.name === 'Final Part Measurement'
      );
      if (finalPartMeasurementStep) {
        setRows(finalPartMeasurementStep.substeps);
      }
    }
  }, [form]);

  const handleSegmentClick = (order) => {
    setActiveSegment(order);
  };

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
                rows,
                handleInputChange: handleInputChange(rows, setRows),
                handleDragOver,
                handleDrop: handleDrop(rows, setRows),
                handleFileSelect: handleFileSelect(rows, setRows),
                addRow: addRow(rows, setRows),
                saveForm: saveForm(form, rows),
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