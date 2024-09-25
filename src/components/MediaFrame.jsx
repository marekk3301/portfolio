import React from 'react';

import "../css/MediaFrame.css"

const MediaFrame = ({ solution, solution_display_type }) => {
    if (solution_display_type === "none") {
        return ("");
    } 
    else if (solution_display_type === 'image') {
        return (
        <div className='mediaframe'>
            <img src={solution} alt="Solution" />
        </div>
        );
    } 
    else if (solution_display_type === 'video') {
        return (
            <div className='mediaframe'>
                <video src={process.env.PUBLIC_URL + "/galleries/" + solution} controls />
            </div>
        );
    }
    else if (solution_display_type === 'youtube') {
        return (
            <div className='mediaframe' style={{ margin: '-10px -10px 0 -10px; width: 100%' }}>
                <iframe 
                    width="100%" 
                    height="250px" 
                    src={solution} 
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