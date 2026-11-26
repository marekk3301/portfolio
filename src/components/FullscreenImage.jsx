import React, { useEffect } from 'react';
import '../css/Gallery.css';

const FullscreenImage = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fullscreen-image" onClick={onClose}>
      <img src={image} alt="" className="fullscreen-image__img" />
    </div>
  );
};

export default FullscreenImage;
