import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GalleryItem from './GalleryItem';
import FullscreenImage from './FullscreenImage';
import '../css/Gallery.css';

const Gallery = ({ gallery }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const folderName = gallery[0];
    const imageList = gallery.slice(1).map((image) => `${process.env.PUBLIC_URL}/galleries/${folderName}/${image}`);

    // The open image lives in history state, so the browser's Back button closes it
    // instead of leaving the project page.
    const fullscreenImage = location.state?.fullscreenImage;

    const handleImageClick = (image) => {
        navigate(location.pathname, { state: { fullscreenImage: image } });
    };

    const closeFullscreenImage = () => {
        navigate(-1);
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
