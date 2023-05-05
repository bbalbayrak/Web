import React, { useRef, useEffect } from 'react';
import './ImagePopup.css';

export default function ImagePopup({ onClose, imageUrl }) {
  const popupRef = useRef(null);

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

  return (
    <div className="image-popup">
      <div className="popup-content" ref={popupRef}>
        <img src="https://fastly.picsum.photos/id/128/200/300.jpg?hmac=7to6-3CeagytIcDSNoyBUAgdzKPBMw3CYRpVrm7DBSA" alt="Resim" className="popup-image" />
        <button className="popup-close" onClick={onClose}>
          Kapat
        </button>
      </div>
    </div>
  );
}
