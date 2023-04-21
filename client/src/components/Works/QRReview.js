import React from 'react';
import { useNavigate } from 'react-router-dom';

const QRReview = () => {
  const navigate = useNavigate();

  const handleSend = () => {
    navigate('/certificate');
  };

  return (
    <div>
      <h2>QR Review</h2>
      <p>QR Review sayfasındaki içerik burada olacak.</p>
      <button onClick={handleSend} className="btn btn-success">
        Send
      </button>
    </div>
  );
};

export default QRReview;
