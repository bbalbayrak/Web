import React, { useState, useEffect } from 'react';
import { getVendors, getProducts } from '../Works/worksapi';
import { createOrUpdateForm } from './formapi';
import "./FormEdit.css"

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
  const [fileUrl, setFileUrl] = useState(null);
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

  function handleCoverChange(event) {
    const file = event.target.files[0];
    setFileUrl(URL.createObjectURL(file));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      // console.error('Error fetching products:', error);
    }
  };
  
  const fetchVendors = async () => {
    try {
      const response = await getVendors();
      setVendors(response.data);
    } catch (error) {
      // console.error('Error fetching vendors:', error);
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
        // console.error('Error fetching vendors:', error);
      }
    };})

    const saveForm = () => {
      setFormSaved(true);
      // console.error(Request.data)
    };
    
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
          // console.error('Error saving form:', error);
        }
      };
  
      if (formSaved) {
        saveForm();
      }
    }, [formSaved]);

    const handleSegmentClick = (order) => {
      if (activeSegment === order) {
        setActiveSegment(0);
      } else {
        setActiveSegment(order);
      }
    };
    

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleInputChange = (event, rowId, field) => {
      const newValue = event.target.value;
      setRows(rows.map(row => row.id === rowId ? {...row, [field]: newValue} : row));
    };  

    const handleDrop = (e, rowId) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        // handleFileUpload fonksiyonunu çağırmak yerine input değişikliğini tetikleyin
        handleInputChange({ target: { value: file } }, rowId, 'example_visual_url');
      } else {
        alert('Lütfen sadece PNG veya JPEG dosyaları yükleyin.');
      }
    };
    
    const addRow = () => {
      const newRow = {
        id: null,
        name: '',
        technical_drawing_numbering: '',
        tools: '',
        description: '',
        actual_dimension: '',
        lower_tolerance: '',
        upper_tolerance: '',
      };
      setRows([...rows, newRow]);
    };
  
    
    const handleFileUpload = (e, rowId) => {
      const file = e.target.files[0];
      // console.log(`File uploaded for row: ${rowId}`);
      // console.log('File:', file);
    };


    const renderFinalPartMeasurement = () => {
  
    return (
      <div>
        <table className="measurement-table">
          <thead>
            <tr>
              <th>İsim</th>
              <th>Teknik Çizim Numarası</th>
              <th>Kullanılan Aletler</th>
              <th>Açıklama</th>
              <th>Gerçek Boyut</th>
              <th>Alt Tolerans</th>
              <th>Üst Tolerans</th>
              <th>Example Visual</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
                <td>
              <input
                className='form-edit-text-box'
                type="text"
                value={row.name || ''}
                onChange={(e) => handleInputChange(e, row.id, 'name')}
              />
            </td>
            <td>
              <input
                className='form-edit-text-box'
                type="text"
                value={row.technical_drawing_numbering || ''}
                onChange={(e) => handleInputChange(e, row.id, 'technical_drawing_numbering')}
              />
            </td>
            <td>
              <input
                className='form-edit-text-box'
                type="text"
                value={row.tools || ''}
                onChange={(e) => handleInputChange(e, row.id, 'tools')}
              />
            </td>
            <td>
              <input
                className='form-edit-text-box'
                type="text"
                value={row.description || ''}
                onChange={(e) => handleInputChange(e, row.id, 'description')}
              />
            </td>
            <td>
              <input
                className='form-edit-text-box'
                type="text"
                value={row.actual_dimension || ''}
                onChange={(e) => handleInputChange(e, row.id, 'actual_dimension')}
              />
            </td>
            <td>
              <input
                className='form-edit-text-box'
                type="text"
                value={row.lower_tolerance || ''}
                onChange={(e) => handleInputChange(e, row.id, 'lower_tolerance')}
              />
            </td>
            <td>
              <input
                className='form-edit-text-box'
                type="text"
                value={row.upper_tolerance || ''}
                onChange={(e) => handleInputChange(e, row.id, 'upper_tolerance')}
              />
            </td>

              <td>
                <div
                  className="dropzone"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, row.id)}
                >
                <input type="file" onChange={handleCoverChange} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={saveForm}>Kaydet</button>

      </div>
    );
  };
    
  const handleAddRow = (event) => {
    event.preventDefault();
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
      <div className='form-edit-main'>
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
          {activeSegment === 2 && renderFinalPartMeasurement()}

          {/* Render other segments if needed */}
        </form>
      </div>
    );
    
    };
    
    export default FormCreate;
