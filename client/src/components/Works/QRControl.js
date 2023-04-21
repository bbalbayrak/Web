import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QRControl = () => {
  const [checkedBoxes, setCheckedBoxes] = useState(new Array(10).fill(false));
  const navigate = useNavigate();

  const handleCheck = (index) => {
    const newCheckedBoxes = new Array(10).fill(false);
    newCheckedBoxes[index] = !checkedBoxes[index];
    setCheckedBoxes(newCheckedBoxes);
  };

  const handleSave = () => {
    // Save işlemini gerçekleştirebilirsiniz
  };

  const handleSend = () => {
    navigate('/qm-control');
  };

  const handleRevise = () => {
    // Revize işlemini gerçekleştirebilirsiniz
  };

  return (
    <div>
      <h2>QR Control</h2>
      <form>
        {checkedBoxes.map((isChecked, index) => (
          <div key={index} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`question-${index}`}
              checked={isChecked}
              onChange={() => handleCheck(index)}
            />
            <label className="form-check-label" htmlFor={`question-${index}`}>
              Question {index + 1}
            </label>
          </div>
        ))}
        <button onClick={handleSave} className="btn btn-primary">
          Save
        </button>
        <button onClick={handleSend} className="btn btn-success">
          Send
        </button>
        <button onClick={handleRevise} className="btn btn-warning">
          Revize
        </button>
      </form>
    </div>
  );
};

export default QRControl;
