import React, { useState, useRef, useEffect } from 'react';
import { updateImageStatusapproved, updateImageStatusrejected } from './ImagePopupApi';
import './ImagePopup.css';

export default function ImagePopup({ onClose, imageList }) {
  const popupContentRef = useRef(null);
  const [images, setImages] = useState(imageList);

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

  const handleApproval = async (imageId) => {
    try {
      const response = await updateImageStatusapproved(imageId);
      if (response) {
        setImages(images.map(img => img.id === imageId ? {...img, status: 'approved'} : img));
      }
    } catch (error) {
      console.error('Error updating image status:', error);
    }
  };

  const handleRejection = async (imageId) => {
    try {
      const response = await updateImageStatusrejected(imageId);
      if (response) {
        setImages(images.map(img => img.id === imageId ? {...img, status: 'rejected'} : img));
      }
    } catch (error) {
      console.error('Error updating image status:', error);
    }
  };

  const getImageStatusClass = (status) => {
    switch(status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-unknown';
    }
  }

  return (
    <div className="image-popup">
      <div className="popup-content" ref={popupContentRef}>
        <div className="image-container">
        {images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.url} alt={`Resim ${index}`} className={`popup-image ${getImageStatusClass(image.status)}`} />
              <div className="image-controls">
                <button className="btn btn-approve" onClick={() => handleApproval(image.id)}>Onayla</button>
                <button className="btn btn-reject" onClick={() => handleRejection(image.id)}>Reddet</button>
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
