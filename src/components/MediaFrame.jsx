import React from 'react';

import "../css/MediaFrame.css"

// Local files are given relative to public/galleries; full URLs are used as-is.
const resolveSource = (solution) =>
    /^https?:\/\//.test(solution) ? solution : `${process.env.PUBLIC_URL}/galleries/${solution}`;

const MediaFrame = ({ solution, solution_display_type }) => {
    if (solution_display_type === "none") {
        return null;
    }
    else if (solution_display_type === 'image') {
        return (
            <div className='mediaframe'>
                <img src={resolveSource(solution)} alt="Solution" />
            </div>
        );
    }
    else if (solution_display_type === 'video') {
        return (
            <div className='mediaframe'>
                <video src={resolveSource(solution)} controls />
            </div>
        );
    }
    else if (solution_display_type === 'youtube') {
        return (
            <div className='mediaframe mediaframe--youtube'>
                <iframe
                    src={solution}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                </iframe>
            </div>
        );
    } else {
        return <p>Invalid solution display type.</p>;
    }
};

export default MediaFrame;
