import React, { useRef, useEffect } from 'react';
import './LoginSuccessfulPopup.css';
import { useNavigate } from 'react-router-dom';

export default function LoginSuccessfulPopup({ onClose }) {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/');

  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, popupRef]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="login-successful-popup">
      <div className="popup-content" ref={popupRef}>
        <h2 className="popup-title">Giriş başarılı</h2>
        <p className="popup-message">Başarıyla giriş yaptınız!</p>
        <button className="popup-close" onClick={handleClose}>
          Tamam
        </button>
      </div>
    </div>
  );
}
