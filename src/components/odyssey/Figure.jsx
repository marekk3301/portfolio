import React from 'react';

// An image with a caption. Without a src it renders a dashed placeholder box of the given aspect ratio.
const Figure = ({ figure, ar = "4/3" }) => {
    const ratio = figure.ar || ar;

    return (
        <figure className="fig">
            {figure.src ? (
                <img src={`${process.env.PUBLIC_URL}/galleries/${figure.src}`} alt={figure.caption || ""} loading="lazy" />
            ) : (
                <div className="ph" style={{ "--ar": ratio }} data-ar={ratio.replace("/", ":")}>
                    <span className="mono">Image</span>
                </div>
            )}
            {figure.caption && <figcaption className="mono">{figure.caption}</figcaption>}
        </figure>
    );
};

export default Figure;
