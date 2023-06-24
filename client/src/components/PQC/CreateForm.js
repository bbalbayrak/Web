import React, { useState, useEffect } from 'react';
import { getVendors, getProducts } from '../Works/worksapi';
import "./createForm.css"
import { segments } from './renderSegmentContent';
import { renderSegmentContent } from './renderSegmentContent';
import { initialFormState, fetchItems, handleFormChange, saveForm, handleDragOver } from './pqc_utils';
import { addRow, handleInputChange, handleDrop, handleFileSelect } from './rowDetail';

const FormCreate = () => {
  const [form, setForm] = useState(initialFormState);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeSegment, setActiveSegment] = useState(1);
  const [rows, setRows] = useState([]);
  const [formSaved, setFormSaved] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    fetchItems(getVendors, setVendors);
    fetchItems(getProducts, setProducts);
  }, []);

  const handleSegmentClick = (order) => {
    setActiveSegment(order);
  };
  
  return (
    <div className='form-edit-main'>
      <h2>Create New Form</h2>
        <form>
          <div>
            <label htmlFor="product_id">Product:</label>
            <select
              name="product_id"
              value={form.product_id || ""}
              onChange={handleFormChange(form, setForm)}
            >
              <option value="" disabled>Please Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="vendor_id">Vendor:</label>
            <select
              name="vendor_id"
              value={form.vendor_id || ""}
              onChange={handleFormChange(form, setForm)}
            >
              <option value="" disabled>Please Select Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="segments">
            {segments.map((segment) => (
              <button
                key={segment.order}
                type="button"
                onClick={() => handleSegmentClick(segment.order)}
                className={activeSegment === segment.order ? 'active' : ''}
              >
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
            saveForm: saveForm(form, setForm, rows, setRows, formSaved, setFormSaved),
          })}
        </div>
      </form>
    </div>
  );
};

export default FormCreate;
