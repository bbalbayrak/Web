import { uploadImageToAzure } from "./formapi";

  export const addRow = (rows, setRows) => () => {
    console.log("rowDetail: ",rows)
    const newRow = {
      row_number: rows.length + 1,
      name: '',
      technical_drawing_numbering: '',
      tools: '',
      description: '',
      actual_dimension: '',
      lower_tolerance: '',
      upper_tolerance: '',
      sample_quantity: '',
      example_visual_url: '',
    };
    setRows([...rows, newRow]);
  };
  
  export const handleInputChange = (rows, setRows) => (e, rowNumber, key) => {
    const newRows = rows.map(row => {
      if (row.row_number === rowNumber) {
        return { ...row, [key]: e.target.value };
      } else {
        return row;
      }
    });
    setRows(newRows);
  };

  export const handleDrop = (rows, setRows) => (e, rowId) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      handleFileUpload(rows, setRows)(file, rowId);
    } else {
      alert('Lütfen sadece PNG veya JPEG dosyaları yükleyin.');
    }
  };

  export const handleFileSelect = (rows, setRows) => (e, rowId) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      handleFileUpload(rows, setRows)(file, rowId);
    } else {
      alert('Lütfen sadece PNG veya JPEG dosyaları yükleyin.');
    }
  };

  export const handleFileUpload = (rows, setRows) => async (file, rowId) => {
    try {
      console.log("handleFileUpload called");
      console.log(`Uploading file: ${file.name}`);
      const imageUrl = await uploadImageToAzure(file);
      console.log(`Uploaded file URL: ${imageUrl}`);
      setRows(rows.map(row => row.row_number === rowId ? {...row, example_visual_url: imageUrl} : row));
    } catch (error) {
      console.error(`Error uploading file for row ${rowId}:`, error.message, error);
    }
  };
  