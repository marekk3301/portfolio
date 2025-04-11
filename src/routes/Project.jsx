import React from 'react';
import { useParams } from 'react-router-dom';

import ProjectDescription from '../components/ProjectDescription';
import MediaFrame from '../components/MediaFrame';
import EventInfo from '../components/EventInfo';
import Authors from '../components/Authors';
import ExternalLinks from '../components/ExternalLinks';
import Gallery from '../components/Gallery';
import CloseButton from '../components/CloseButton';

import "../css/Project.css"

import hackathons from '../assets/hackathons.json';


const Project = () => {
    const { id } = useParams();
    const hackathon = hackathons.find(h => h.id == id);

    if (!hackathon) {
        return <div style={{marginTop: "45%", textAlign: "center"}}>Project #{id} not found</div>;
    }

    return (
        <div className='content'>
            <MediaFrame solution={hackathon.solution} solution_display_type={hackathon.solution_display_type} />
            <div className='project_panel'>
                <h1 className='project__name'>{hackathon.name}</h1>
                <ProjectDescription description={hackathon.description}/>
            </div>
            <div className='project_details'>
                <EventInfo event={hackathon.event} />
                <h2>External Links:</h2>
                <ExternalLinks links={hackathon.links} />
                <h2>Authors:</h2>
                <Authors team={hackathon.team} />
            </div>
            {hackathon.gallery.length > 0 && (
                <div className='project_gallery'>
                    <h2>Gallery:</h2>
                    <Gallery gallery={hackathon.gallery} />
                </div>
            )}
            <CloseButton></CloseButton> {/* todo: change close button behaviour inside fullscreen picture */}
        </div>
    );
};

export default Project;