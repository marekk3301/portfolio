import { Link } from "react-router-dom";

import hackathons from '../assets/hackathons.json';

const ProjectList = () => {

    const projectList = hackathons.map((hackathon) => (
        <li><Link to={"/project/" + hackathon.id}>
            {hackathon.name}
        </Link></li>
    ));

    return (
      <ul>
        {projectList}
      </ul>
    );
  }
 
  export default ProjectList