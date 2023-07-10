import React, { useState, useEffect } from 'react';
import { getVendors, getProducts } from '../Works/worksapi';
import './createForm.css';
import { segments } from './renderSegmentContent';
import { renderSegmentContent } from './renderSegmentContent';
import {
  initialFormState,
  fetchItems,
  handleFormChange,
  saveForm,
  handleDragOver,
} from './pqc_utils';
import {
  addRow,
  handleInputChange,
  handleDrop,
  handleFileSelect,
} from './rowDetail';

const FormCreate = () => {
  const [form, setForm] = useState(initialFormState);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeSegment, setActiveSegment] = useState(1);
  const [finalRows, setFinalRows] = useState([]);
  const [subpartRows, setSubpartRows] = useState([]);

  const addFinalRow = addRow(finalRows, setFinalRows);
  const handleFinalInputChange = handleInputChange(finalRows, setFinalRows);
  const handleFinalDrop = handleDrop(finalRows, setFinalRows);
  const handleFinalFileSelect = handleFileSelect(finalRows, setFinalRows);

  const addSubpartRow = addRow(subpartRows, setSubpartRows);
  const handleSubpartInputChange = handleInputChange(subpartRows, setSubpartRows);
  const handleSubpartDrop = handleDrop(subpartRows, setSubpartRows);
  const handleSubpartFileSelect = handleFileSelect(subpartRows, setSubpartRows);

  useEffect(() => {
    fetchItems(getVendors, setVendors);
    fetchItems(getProducts, setProducts);
  }, []);

  const handleSegmentClick = order => {
    setActiveSegment(order);
  };

  return (
    <div className="form-edit-main">
      <h2>Create New Form</h2>
      <form>
        <div>
          <label htmlFor="product_id">Product:</label>
          <select
            name="product_id"
            value={form.product_id || ''}
            onChange={handleFormChange(form, setForm)}
            className="form-select"
          >
            <option value="" disabled className="select-option">
              Please Select Product
            </option>
            {products.map(product => (
              <option key={product.id} value={product.odooid} className="select-option">
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="vendor_id">Vendor:</label>
          <select
            name="vendor_id"
            value={form.vendor_id || ''}
            onChange={handleFormChange(form, setForm)}
            className="form-select"
          >
            <option value="" disabled className="select-option">
              Please Select Vendor
            </option>
            {vendors.map(vendor => (
              <option key={vendor.id} value={vendor.odooid} className="select-option">
                {vendor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="segments">
          {segments.map(segment => (
            <button
              key={segment.order}
              type="button"
              onClick={() => handleSegmentClick(segment.order)}
              className={`segment-button ${
                activeSegment === segment.order ? 'segment-button-active' : 'segment-button-inactive'
              }`}
            >
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
            handleFinalInputChange,
            handleSubpartInputChange,
            handleDragOver,
            handleFinalDrop,
            handleSubpartDrop,
            handleFinalFileSelect,
            handleSubpartFileSelect,
            addFinalRow,
            addSubpartRow,
            saveSubForm: saveForm(form, subpartRows, 0),
            saveFinalForm: saveForm(form, finalRows, 1),
          })}
        </div>
      </form>
    </div>
  );
};

export default FormCreate;
