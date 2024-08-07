import React, { useState } from 'react';

const ProjectDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <p
      className={`project__description ${isExpanded ? 'expanded' : ''}`}
      onClick={toggleExpand}
    >
      {description}
    </p>
  );
};

export default ProjectDescription;