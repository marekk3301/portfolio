import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Topbar from '../components/odyssey/Topbar';
import useIndexTheme from '../components/useIndexTheme';
import usePageTitle from '../components/usePageTitle';

import "../css/Index.css"
import "../css/Odyssey.css"

import projects from '../assets/odyssey.json';

const pad = (n, width) => String(n).padStart(width, "0");

const ProjectRow = ({ project }) => (
    <li>
        <Link className="row" to={`/odyssey/${project.id}`} style={{ "--c": project.accent }}>
            <span className="row-idx mono dim">{pad(project.id, 2)}</span>
            <span className="row-season">{project.season}</span>
            <span className="row-main">
                <span className="row-title fill">{project.title}</span>
                <span className="mono dim">{project.problem} · {project.category}</span>
            </span>
            <span className="row-div mono dim">Div. {project.division}</span>
            <span className="row-wf mono">
                {project.worldFinals
                    ? <><span className="sw" />World Finals</>
                    : <span className="dim">Regional / national</span>}
            </span>
        </Link>
    </li>
);

const OdysseyList = () => {
    const [, , themeAttr] = useIndexTheme();
    usePageTitle("Odyssey of the Mind");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const competed = projects.filter((p) => p.role === "member");
    const coached = projects.filter((p) => p.role === "coach");

    return (
        <div className="idx ootm" data-theme={themeAttr}>
            <div className="wrap">
                <Topbar
                    back="/main"
                    backLabel="Back to index"
                    crumbs={[{ label: "Index", to: "/main" }, { label: "Odyssey of the Mind" }]}
                />

                <header className="ot-head">
                    <h1 className="ot-title">Odyssey<br />of the Mind</h1>
                    <div>
                        <p className="ot-intro">A creative problem-solving competition. Each season a team of up to seven solves one long-term problem: a built solution and an eight-minute performance, judged on technical work, style and spontaneity.</p>
                        <div className="ot-stats mono dim">
                            <div><strong>{competed.length}</strong>seasons competed</div>
                            <div><strong>{coached.length}</strong>teams coached</div>
                            <div><strong>{projects.filter((p) => p.worldFinals).length}</strong>World Finals</div>
                        </div>
                    </div>
                </header>

                <div className="group-h"><h2>Competed</h2><span className="mono dim">Team member</span></div>
                <ul className="rows">
                    {competed.map((p) => <ProjectRow key={p.id} project={p} />)}
                </ul>

                <div className="group-h"><h2>Coached</h2><span className="mono dim">Coach</span></div>
                <ul className="rows">
                    {coached.map((p) => <ProjectRow key={p.id} project={p} />)}
                </ul>
            </div>
        </div>
    );
};

export default OdysseyList;
