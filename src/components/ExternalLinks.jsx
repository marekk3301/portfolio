import React from 'react';

const ExternalLinks = ({ links }) => {
    return (
        <div>
            <ul className='links__list'>
                {Object.entries(links).map(([text, href]) => (
                    <li key={text}>
                        <a className='link' href={href}>
                            {text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExternalLinks;