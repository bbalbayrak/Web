import React, { useState, useEffect } from 'react';
import { getVendors, getProducts } from '../Works/worksapi';
import { createOrUpdateForm } from './formapi';

const segments = [
  { name: 'Sub - Part Dimension', order: 1 },
  { name: 'Final Part Measurement', order: 2 },
  { name: 'Paint Report', order: 3 },
  { name: 'Coating Report', order: 4 },
  { name: 'Product Packing Standard', order: 5 },
  { name: 'Loading Check', order: 6 },
];

const FormCreate = () => {
  const [form, setForm] = useState({ product_id: null, vendor_id: null });
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeSegment, setActiveSegment] = useState(1);
  const [rows, setRows] = useState([]);
  const [formSaved, setFormSaved] = useState(false);
  const [formData, setFormData] = useState({
    order_number: "",
    project_number: "",
    vendor_id: "",
    customer_id: "",
    quality_responsible_id: "",
    inspector_id: "",
    foreman_id: "",
    work_type: "",
    state: "",
    status: "",
    creator_id: "",
    creation_date: "",
  });

  useEffect(() => {
    fetchVendors();
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const fetchVendors = async () => {
    try {
      const response = await getVendors();
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };
  
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorData = await getVendors();
        setVendors(vendorData);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };})


    useEffect(() => {
      const saveForm = async () => {
        const postData = {
          id: form.id,
          product_id: form.product_id,
          vendor_id: form.vendor_id,
          steps: segments.map((segment, index) => ({
            name: segment.name,
            order: segment.order,
            substeps: index === 1 ? rows.map((row) => {
              const {
                id,
                technical_drawing_numbering,
                tools,
                description,
                actual_dimension,
                lower_tolerance,
                upper_tolerance,
                example_visual_url,
                status,
              } = row;
              return {
                ...(id && { id }),
                technical_drawing_numbering,
                tools,
                description,
                actual_dimension,
                lower_tolerance,
                upper_tolerance,
                example_visual_url,
                status,
              };
            }) : [],
          })),
        };
  
        try {
          const response = await createOrUpdateForm(postData);
          setFormSaved(true);
        } catch (error) {
          console.error('Error saving form:', error);
        }
      };
  
      if (formSaved) {
        saveForm();
        setFormSaved(true);
      }
    }, [formSaved]);

    const handleSegmentClick = (order) => {
    setActiveSegment(order);
    };
    
    
    const handleAddRow = () => {
    const newRow = {
    id: null,
    technical_drawing_numbering: '',
    tools: '',
    description: '',
    actual_dimension: '',
    lower_tolerance: '',
    upper_tolerance: '',
    example_visual_url: '',
    status: '',
    };
    setRows([...rows, newRow]);
    };
    
    const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) => {
    if (index === rowIndex) {
    return { ...row, [field]: value };
    }
    return row;
    });
    setRows(updatedRows);
    };
    
    const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((row, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
    };
    
    const handleSubmit = () => {
    setFormSaved(true);
    };
    
    return (
      <div>
        <h2>Create New Form</h2>
        <form>
          {/* Render form elements */}
          {formData && (
            <div>
              {/* Render input fields for formData */}
            </div>
          )}
          <div>
            <label htmlFor="product_id">Product:</label>
            <select
              name="product_id"
              value={form.product_id}
              onChange={handleFormChange}
            >
              <option value="" disabled>Select a product</option>
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
              value={form.vendor_id}
              onChange={handleFormChange}
            >
              <option value="" disabled>Select a vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {segments.map((segment) => (
              <button
                key={segment.order}
                type="button"
                onClick={() => handleSegmentClick(segment.order)}
              >
                {segment.name}
              </button>
            ))}
          </div>
          {/* Render segment content based on the activeSegment state */}
          {activeSegment === 1 && (
            <div>
              {/* Render Sub - Part Dimension content */}
            </div>
          )}
          {/* Render other segments if needed */}
          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    );
    
    };
    
    export default FormCreate;
