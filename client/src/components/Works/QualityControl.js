import React from 'react';
import { useNavigate } from 'react-router-dom';

const QualityControl = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/workorders');
  };

  return (
    <div className="qc-form-page-container">
      <h2 className="qc-heading">Quality Control</h2>
      <input type="file" className="qc-file-input" />
      <button onClick={handleComplete} className="qc-btn qc-btn-primary">
        Complete
      </button>
    </div>
  );
};

export default QualityControl;
