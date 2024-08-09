import React from 'react';
import { useParams } from 'react-router-dom';

import ProjectDescription from '../components/ProjectDescription';
import MediaFrame from '../components/MediaFrame';
import EventInfo from '../components/EventInfo';
import Authors from '../components/Authors';
import ExternalLinks from '../components/ExternalLinks';
import Gallery from '../components/Gallery';

import hackathons from '../assets/hackathons.json';

const Project = () => {
    const { id } = useParams();
    const hackathon = hackathons.find(h => h.id == id);

    if (!hackathon) {
        return <div>Project {id} not found</div>;
    }

    return (
        <div className='content'>
            <MediaFrame solution={hackathon.solution} solution_display_type={hackathon.solution_display_type} />
            <h1 className='project__name'>{hackathon.name}</h1>
            <ProjectDescription description={hackathon.description}/>
            <EventInfo event={hackathon.event} />
            <h2>External Links:</h2>
            <ExternalLinks links={hackathon.links} />
            <h2>Authors:</h2>
            <Authors team={hackathon.team} />
            {hackathon.gallery.length > 0 && (
                <>
                <h2>Gallery:</h2>
                <Gallery gallery={hackathon.gallery} />
                </>
            )}
        </div>
    );
};

export default Project;