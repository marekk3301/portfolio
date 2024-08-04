import React from 'react';

const MediaFrame = ({ solution_link, solution_display_type }) => {
    if (solution_display_type === 'image') {
        return <img src={solution_link} alt="Solution" />;
    } 
    else if (solution_display_type === 'youtube') {
        return (
            <div style={{ margin: '-10px' }}>
                <iframe 
                    width="100%" 
                    height="auto" 
                    src={solution_link} 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen >
                </iframe>
            </div>
        );
    } else {
        return <p>Invalid solution display type.</p>;
    }
};

export default MediaFrame;