import React, { useState } from 'react';
import './gallery.css';

const images = [
  'https://picsum.photos/id/10/800/600',
  'https://picsum.photos/id/20/800/600',
  'https://picsum.photos/id/30/800/600'
];

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handlePrev = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNext = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  const toggleModal = (index) => {
    setCurrentImage(index);
    setShowModal(!showModal);
  };

  const closeModal = (event) => {
    if (event.target.classList.contains('gallery-modal')) {
      setShowModal(false);
    }
  };

  return (
    <div className="gallery-container">
      {images.map((image, index) => (
        <img
          key={index}
          className="gallery-image"
          src={image}
          alt={`Image ${index}`}
          onClick={() => toggleModal(index)}
        />
      ))}
      {showModal && (
        <div className="gallery-modal" onClick={closeModal}>
          <img
            className="modal-image"
            src={images[currentImage]}
            alt={`Image ${currentImage}`}
          />
          <div className="modal-arrows">
            <div className="modal-arrow modal-arrow-left" onClick={handlePrev}>
              &lt;
            </div>
            <div className="modal-arrow modal-arrow-right" onClick={handleNext}>
              &gt;
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
