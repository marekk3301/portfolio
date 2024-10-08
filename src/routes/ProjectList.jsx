import { Link } from "react-router-dom";

import "../css/ProjectList.css"

// import PdfModal from '../components/PdfModal';
// import ExternalLinks from '../components/ExternalLinks';

import hackathons from '../assets/hackathons.json';

const ProjectList = () => {

    const projectList = hackathons.map((hackathon) => {
        if (hackathon.icon == "") {
          hackathon.icon = "generic.svg"
        }

        if (hackathon.id) {
          console.log(hackathon.event.name, hackathon.event.date);
          return (
            <div className="project__icon">
              <Link to={"/project/" + hackathon.id}>
                <img className="glitch" src={process.env.PUBLIC_URL + "/galleries/project_icons/" + hackathon.icon} alt={hackathon.id} />
              </Link>
            </div>
          );
        }   
        return null;
    });

    return (
      <div className="list__container">
        <div className="list__mask">
          <div className="project__list">
            {projectList}
          </div>
        </div>
      </div>
    );
  }
 
  export default ProjectList