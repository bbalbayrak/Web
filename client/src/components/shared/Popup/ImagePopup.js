import React, { useState, useRef, useEffect } from 'react';
import './ImagePopup.css';

export default function ImagePopup({ onClose, imageList }) {
  const popupContentRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupContentRef.current && !popupContentRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="image-popup">
      <div className="popup-content" ref={popupContentRef}>
        <div className="image-container">
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image} alt={`Resim ${index}`} className="popup-image" />
              <div className="image-controls">
                <button className="btn btn-approve">Onayla</button>
                <button className="btn btn-reject">Reddet</button>
              </div>
            </div>
          ))}
        </div>
        <div className="close-button-container">
          <button className="popup-close" onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
