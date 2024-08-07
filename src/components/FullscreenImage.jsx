import React from 'react';
import '../css/Gallery.css';

const FullscreenImage = ({ image, onClose }) => {
  return (
    <div className="fullscreen-image" onClick={onClose}>
      <img src={image} alt="" className="fullscreen-image__img" />
    </div>
  );
};

export default FullscreenImage;