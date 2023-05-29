import React, { useState, useEffect } from 'react';
import { getVendors, getProducts } from '../Works/worksapi';
import { createOrUpdateForm } from './formapi';
import "./CreateForm.css"
import ImagePopup from '../shared/Popup/ImagePopup';

const segments = [
  { name: "Sub - Part Dimensiol", order: 1 },
  { name: "Final Part Measurement", order: 2 },
  { name: "Paint Report", order: 3 },
  { name: "Qoating Report", order: 4 },
  { name: "Product Packing Standart", order: 5 },
  { name: "Loading Check", order: 6 },
];

const FormCreate = () => {
  const [form, setForm] = useState({
    product_id: null,
    vendor_id: null,
    steps: segments.map((segment, index) => ({
      name: segment.name,
      order: segment.order,
      substeps: [],
    })),
  });
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeSegment, setActiveSegment] = useState(1);
  const [rows, setRows] = useState([]);
  const [formSaved, setFormSaved] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [imagePopupUrl, setImagePopupUrl] = useState('');


  useEffect(() => {
    fetchVendors();
    fetchProducts();
  }, []);

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
  

  const handleImageClick = (url) => {
    setImagePopupUrl(url);
    setShowImagePopup(true);
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
      sample_quantity: '',
    };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (event, rowId, field) => {
    const newValue = event.target.value;
    setRows(rows.map(row => row.id === rowId ? {...row, [field]: newValue} : row));
  };  
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e, rowId) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      handleFileUpload(file, rowId);
    } else {
      alert('Lütfen sadece PNG veya JPEG dosyaları yükleyin.');
    }
  };
  
  const handleFileSelect = (e, rowId) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      handleFileUpload(file, rowId);
    } else {
      alert('Lütfen sadece PNG veya JPEG dosyaları yükleyin.');
    }
  };
  
  const handleFileUpload = (file, rowId) => {
    // console.log(`File uploaded for row: ${rowId}`);
    // console.log('File:', file);
  };

  const handleSegmentClick = (order) => {
    setActiveSegment(order);
  };

  const renderSegmentContent = () => {
    switch (activeSegment) {
      case 1:
        return renderSubPartDimensiol();
      case 2:
        return renderFinalPartMeasurement();
      case 3:
        return renderPaintReport();
      case 4:
        return renderQoatingReport();
      case 5:
        return renderProductPackingStandart();
      case 6:
        return renderLoadingCheck();
      default:
        return null;
    }
  };
  
  const saveForm = async () => {
    const formData = new FormData();
    formData.append('product_id', form.product_id);
    formData.append('vendor_id', form.vendor_id);
  
    segments.forEach((segment, index) => {
      formData.append(`steps[${index}][name]`, segment.name);
      formData.append(`steps[${index}][order]`, segment.order);
      if (index === 1) {
        rows.forEach((row, substepIndex) => {
          const {
            id,
            technical_drawing_numbering,
            tools,
            description,
            actual_dimension,
            lower_tolerance,
            upper_tolerance,
            sample_quantity,
            example_visual_file,
            status,
          } = row;
          if (id) formData.append(`steps[${index}][substeps][${substepIndex}][id]`, id);
          formData.append(`steps[${index}][substeps][${substepIndex}][technical_drawing_numbering]`, technical_drawing_numbering);
          formData.append(`steps[${index}][substeps][${substepIndex}][tools]`, tools);
          formData.append(`steps[${index}][substeps][${substepIndex}][description]`, description);
          formData.append(`steps[${index}][substeps][${substepIndex}][actual_dimension]`, actual_dimension);
          formData.append(`steps[${index}][substeps][${substepIndex}][lower_tolerance]`, lower_tolerance);
          formData.append(`steps[${index}][substeps][${substepIndex}][upper_tolerance]`, upper_tolerance);
          formData.append(`steps[${index}][substeps][${substepIndex}][sample_quantity]`, sample_quantity);
          if (example_visual_file) {
            formData.append(`steps[${index}][substeps][${substepIndex}][example_visual_file]`, example_visual_file);
          }
          formData.append(`steps[${index}][substeps][${substepIndex}][status]`, status || 'active');
        });
      }
    });
    
    console.log(formData);

    try {
      await createOrUpdateForm(formData);
      console.log('Form kaydedildi');
      setFormSaved(true); // Form başarıyla kaydedildiğini bildirin
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

 const renderSubPartDimensiol = () => {
    return (
      <div>
        {form.steps[0].substeps.map((substep) => (
          <div key={substep.id}>
            <h3>{substep.name}</h3>
            <p>{substep.description}</p>
            <p>{`Actual dimension: ${substep.actual_dimension}`}</p>
            <p>{`Tolerances: ${substep.lower_tolerance}-${substep.upper_tolerance}`}</p>
            <img src={substep.example_visual_url} alt={substep.name} />
          </div>
        ))}
      </div>
    );
  };

  const renderFinalPartMeasurement = () => {
    if (!form) return null;
    {showImagePopup && (
      <ImagePopup
        onClose={() => setShowImagePopup(false)}
      />
    )}
    return (
      <div>
        <table className="measurement-table">
          <thead>
            <tr className="measurement-table-tr">
              <th>İsim</th>
              <th>Teknik Çizim Numarası</th>
              <th>Kullanılan Aletler</th>
              <th>Açıklama</th>
              <th>Gerçek Boyut</th>
              <th>Alt Tolerans</th>
              <th>Üst Tolerans</th>
              <th>Örnek Adedi</th>
              <th>Example Visual</th>
              <th>Örnek Görsel</th>
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
                <input
                  className='form-edit-text-box'
                  type="text"
                  value={row.sample_quantity || ''}
                  onChange={(e) => handleInputChange(e, row.id, 'sample_quantity')}
                />
              </td>   
              <td>
                <div className="dropzone" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, row.id)}>
                  <input
                    className='form-edit-text-box'
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleFileSelect(e, row.id)}
                  />
                  </div>
              </td>
              <td>
                <img src={require('..//shared/a1.jpg')} alt="" className="thumbnail-image" onClick={handleImageClick} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addRow}>Satır Ekle</button>
      <button type="button" onClick={saveForm}>Kaydet</button>
      </div>
    );
  };

  
  const renderPaintReport = () => {
    return (
      <div>
        {form.steps[2].substeps.map((substep) => (
          <div key={substep.id}>
            <h3>{substep.name}</h3>
            <p>{substep.description}</p>
            <p>{`Actual dimension: ${substep.actual_dimension}`}</p>
            <p>{`Tolerances: ${substep.lower_tolerance}-${substep.upper_tolerance}`}</p>
            <img src={substep.example_visual_url} alt={substep.name} />
          </div>
        ))}
      </div>
    );
  };
  
  const renderQoatingReport = () => {
    return (
      <div>
        {form.steps[3].substeps.map((substep) => (
          <div key={substep.id}>
            <h3>{substep.name}</h3>
            <p>{substep.description}</p>
            <p>{`Actual dimension: ${substep.actual_dimension}`}</p>
            <p>{`Tolerances: ${substep.lower_tolerance}-${substep.upper_tolerance}`}</p>
            <img src={substep.example_visual_url} alt={substep.name} />
          </div>
        ))}
      </div>
    );
  };

  const renderProductPackingStandart = () => {
    return (
      <div>
        {form.steps[4].substeps.map((substep) => (
          <div key={substep.id}>
            <h3>{substep.name}</h3>
            <p>{substep.description}</p>
            <p>{`Actual dimension: ${substep.actual_dimension}`}</p>
            <p>{`Tolerances: ${substep.lower_tolerance}-${substep.upper_tolerance}`}</p>
            <img src={substep.example_visual_url} alt={substep.name} />
          </div>
        ))}
      </div>
    );
  };

  const renderLoadingCheck = () => {
    return (
      <div>
        {form.steps[5].substeps.map((substep) => (
          <div key={substep.id}>
            <h3>{substep.name}</h3>
            <p>{substep.description}</p>
            <p>{`Actual dimension: ${substep.actual_dimension}`}</p>
            <p>{`Tolerances: ${substep.lower_tolerance}-${substep.upper_tolerance}`}</p>
            <img src={substep.example_visual_url} alt={substep.name} />
          </div>
        ))}
      </div>
    );
  };

  const imagePopup = showImagePopup ? (
    <ImagePopup onClose={() => setShowImagePopup(false)} />
  ) : null;
    
  return (
    <div className='form-edit-main'>
      <h2>Create New Form</h2>
        <form>
          <div>
            <label htmlFor="product_id">Product:</label>
            <select
              name="product_id"
              value={form.product_id || ""}
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
                type="button" // Bu satırı ekleyin
                onClick={() => handleSegmentClick(segment.order)}
                className={activeSegment === segment.order ? 'active' : ''}
              >
                {segment.name}
              </button>
            ))}
          </div>
          <div className="segment-content">{renderSegmentContent()}</div>
      </form>
    </div>
  );
};

export default FormCreate;