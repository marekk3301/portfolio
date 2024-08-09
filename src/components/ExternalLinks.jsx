import React from 'react';

import "../css/Lists.css"

const ExternalLinks = ({ links }) => {
    return (
        <div>
            <ul className='links__list'>
                {Object.entries(links).map(([text, href]) => (
                    <li key={text}>
                        <a className='link' href={href} target='blank'>
                            {text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExternalLinks;