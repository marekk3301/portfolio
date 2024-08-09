import { Link } from "react-router-dom";

import "../css/ProjectList.css"

import hackathons from '../assets/hackathons.json';

const ProjectList = () => {

    const projectList = hackathons.map((hackathon) => (
        console.log(hackathon.event.name, hackathon.event.date),
        <div className="project__icon"><Link to={"/project/" + hackathon.id}>
            <img className="glitch" src={process.env.PUBLIC_URL + "/galleries/project_icons/" + hackathon.icon} alt={hackathon.id} />
        </Link></div>
    ));

    const list1 = [];
    const list2 = [];
    const list3 = [];

    projectList.forEach((project, index) => {
      if (index % 3 === 0) {
      list1.push(project);
      } else if (index % 3 === 1) {
      list2.push(project);
      } else {
      list3.push(project);
      }
    });

    return (
      <div className="list__container">
        <div className="project__list">
          <div className="list__column">
            {list1}
          </div>
          <div className="list__column">
            {list2}
          </div>
          <div className="list__column">
            {list3}
          </div>
        </div>
        <div className="arrows">
          <div className="arrow_down">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7,9l5,5,5-5H7Z" fill="#e8eaed"/>
            </svg>
          </div>

          <div className="arrow_down">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7,9l5,5,5-5H7Z" fill="#e8eaed"/>
            </svg>
          </div>

          <div className="arrow_down">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7,9l5,5,5-5H7Z" fill="#e8eaed"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
 
  export default ProjectList