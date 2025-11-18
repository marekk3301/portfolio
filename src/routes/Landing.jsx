import { Link } from "react-router-dom";

import "../css/Landing.css"


const Landing = () => {
    return (
        <>
            <div className="landing-page" role="main">
                <div className="container">
                    <h1>MK</h1>
                    <p>CREATOR & EDUCATOR</p>
                    <nav className="nav-links" aria-label="Main navigation">
                        <Link to={"/"} className="nav-link">HACKATHON PROJECTS</Link>
                        <Link to={"/odyssey"} className="nav-link">ODYSSEY OF THE MIND</Link>
                        <Link to={"/projects"} className="nav-link">OTHER PROJECTS</Link>
                        <Link to={"/skilltree"} className="nav-link">SKILL TREE</Link>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Landing;
