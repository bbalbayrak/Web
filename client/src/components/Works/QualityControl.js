import React from 'react';
import { useNavigate } from 'react-router-dom';

const QualityControl = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/workorders');
  };

  return (
    <div className="form-page-container">
      <h2>Quality Control</h2>
      <input type="file" />
      <button onClick={handleComplete} className="btn btn-primary">
        Complete
      </button>
    </div>
  );
};

export default QualityControl;
