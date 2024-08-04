import React from 'react';

const ProjectInfo = ({ name, description }) => {
    return (
        <div>
            <h1 className='project__name'>{name}</h1>
            <p className='project__description'>{description}</p>
        </div>
    );
};

export default ProjectInfo;