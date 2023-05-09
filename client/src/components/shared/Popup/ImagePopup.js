import React, { useRef, useEffect } from 'react';
import './ImagePopup.css';

export default function ImagePopup({ onClose, imageUrl }) {
  console.log("ImagePopup called with imageUrl:", imageUrl);
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
        <img src={imageUrl} alt="Resim" className="popup-image" />
        <button className="popup-close" onClick={onClose}>
          Kapat
        </button>
      </div>
    </div>
  );
}
