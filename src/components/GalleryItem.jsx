import React from 'react';
import '../css/Gallery.css';

const GalleryItem = ({ image, onClick }) => {
  return (
    <div className="gallery-item" onClick={onClick}>
      <img src={image} alt="" className="gallery-item__image" />
    </div>
  );
};

export default GalleryItem;