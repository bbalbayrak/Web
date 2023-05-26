import React, { useState, useRef, useEffect } from 'react';
import './ImagePopup.css';

export default function ImagePopup({ onClose, imageList }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const popupContentRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < imageList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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
        <img src={imageList[currentIndex]} alt="Resim" className="popup-image" />
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
        <button className="popup-close" onClick={onClose}>
          Kapat
        </button>
      </div>
    </div>
  );
}
