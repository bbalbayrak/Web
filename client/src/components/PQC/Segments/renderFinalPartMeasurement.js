export const renderFinalPartMeasurement = ({
  form,
  rows,
  handleInputChange,
  handleDragOver,
  handleDrop,
  handleFileSelect,
  addRow,
  saveForm,
}) => {
  console.log("renderFinal forms:", form)
  console.log("rendeFinal Rows:",rows)
  if (!form) return null;
    return (
      <div>
        <table className="measurement-table">
          <thead>
            <tr className="measurement-table-tr">
              <th>Row Number</th>
              <th>Technical Drawing Numbering</th>
              <th>Tools</th>
              <th>Description</th>
              <th>Actual Dimension</th>
              <th>Lower Tolerance</th>
              <th>Upper Tolerance</th>
              <th>Sample Quantity</th>
              <th>Example Visual</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.row_number}>
                <td>{row.row_number}</td>
              <td>
                <input
                  className='form-edit-text-box'
                  type="text"
                  value={row.technical_drawing_numbering || ''}
                  onChange={(e) => handleInputChange(e, row.row_number, 'technical_drawing_numbering')}
                />
              </td>
              <td>
                <input
                  className='form-edit-text-box'
                  type="text"
                  value={row.tools || ''}
                  onChange={(e) => handleInputChange(e, row.row_number, 'tools')}
                />
              </td>
              <td>
                <input
                  className='form-edit-text-box'
                  type="text"
                  value={row.description || ''}
                  onChange={(e) => handleInputChange(e, row.row_number, 'description')}
                />
              </td>
              <td>
                <input
                  className='form-edit-text-box'
                  type="text"
                  value={row.actual_dimension || ''}
                  onChange={(e) => handleInputChange(e, row.row_number, 'actual_dimension')}
                />
              </td>
              <td>
                <input
                  className='form-edit-text-box'
                  type="text"
                  value={row.lower_tolerance || ''}
                  onChange={(e) => handleInputChange(e, row.row_number, 'lower_tolerance')}
                />
              </td>
              <td>
                <input
                  className='form-edit-text-box'
                  type="text"
                  value={row.upper_tolerance || ''}
                  onChange={(e) => handleInputChange(e, row.row_number, 'upper_tolerance')}
                />
              </td>
              <td>
                <input
                  className='form-edit-text-box'
                  type="text"
                  value={row.sample_quantity || ''}
                  onChange={(e) => handleInputChange(e, row.row_number, 'sample_quantity')}
                />
              </td>   
              <td>
                <div className="dropzone" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, row.row_number)}>
                  <input
                    type="file"
                    className='form-edit-text-box'
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleFileSelect(e, row.row_number)}
                  />
                </div>
              </td>
              <td>
                <img src={row.example_visual_url || require('..//../shared/default_image.png')} alt="" className="thumbnail-image" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        <button type="button" onClick={addRow}>Satır Ekle</button>
        <button type="button" onClick={() => saveForm(form, rows)}>Kaydet</button>
      </div>
    );
  };

  