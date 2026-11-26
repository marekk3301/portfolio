import { Link } from "react-router-dom";

import "../css/ProjectList.css"

import hackathons from '../assets/hackathons.json';

const ProjectList = () => {

    const projectList = hackathons
      .filter((hackathon) => hackathon.id)
      .map((hackathon) => (
        <div className="project__icon" key={hackathon.id}>
          <Link to={"/project/" + hackathon.id}>
            <img className="glitch" src={process.env.PUBLIC_URL + "/galleries/project_icons/" + (hackathon.icon || "generic.svg")} alt={hackathon.name} />
          </Link>
        </div>
      ));

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
