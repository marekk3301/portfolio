import React, { useState } from 'react';
import GalleryItem from './GalleryItem';
import FullscreenImage from './FullscreenImage';
import '../css/Gallery.css';

const Gallery = ({ gallery }) => {

    const folderName = gallery[0];
    const imageList = gallery.slice(1).map((image) => `/galleries/${folderName}/${image}`);
    
    const [fullscreenImage, setFullscreenImage] = useState(null);

    const handleImageClick = (image) => {
        setFullscreenImage(image);
    };

    const closeFullscreenImage = () => {
        setFullscreenImage(null);
    };

    return (
        <div>
        <div className="gallery">
            {imageList.map((image, index) => (
            <GalleryItem
                key={index}
                image={image}
                onClick={() => handleImageClick(image)}
            />
            ))}
        </div>
        {fullscreenImage && (
            <FullscreenImage image={fullscreenImage} onClose={closeFullscreenImage} />
        )}
        </div>
    );
};

export default Gallery;