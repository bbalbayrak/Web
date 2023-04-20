import React from 'react';
import { useNavigate } from 'react-router-dom';

const Certificate = () => {
  const navigate = useNavigate();

  const handleSend = () => {
    navigate('/qr-certificate');
  };

  const handleContinueWithoutSending = () => {
    navigate('/qr-certificate');
  };

  return (
    <div>
      <h2>Certificate</h2>
      <input type="file" />
      <button onClick={handleSend} className="btn btn-primary">
        Gönder
      </button>
      <button onClick={handleContinueWithoutSending} className="btn btn-secondary">
        Göndermeden Devam Et
      </button>
    </div>
  );
};

export default Certificate;
