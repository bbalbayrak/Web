import React from 'react';
import { useNavigate } from 'react-router-dom';

const VendorControl = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/qr-review');
  };

  return (
    <div>
      <h2>Vendor Control</h2>
      <p>Vendor Control sayfasındaki içerik burada olacak.</p>
      <button onClick={handleProceed} className="btn btn-primary">
        Proceed to QR Review
      </button>
    </div>
  );
};

export default VendorControl;
