import { Link } from "react-router-dom";

import hackathons from '../assets/hackathons.json';

const ProjectList = () => {

    const projectList = hackathons.map((hackathon) => (
        <li className="project__icon"><Link to={"/project/" + hackathon.id}>
            <img className="glitch" src={process.env.PUBLIC_URL + "/galleries/project_icons/" + hackathon.icon} alt={hackathon.id} />
        </Link></li>
    ));

    return (
      <ul>
        {projectList}
      </ul>
    );
  }
 
  export default ProjectList