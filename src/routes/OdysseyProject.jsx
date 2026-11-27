import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Topbar from '../components/odyssey/Topbar';
import Figure from '../components/odyssey/Figure';
import Drawing from '../components/odyssey/Drawing';
import useIndexTheme from '../components/useIndexTheme';
import usePageTitle from '../components/usePageTitle';

import "../css/Index.css"
import "../css/Odyssey.css"

import projects from '../assets/odyssey.json';
import { withPlaceholders } from '../assets/odysseyPlaceholders';

// three.js is only downloaded when a project page with the hologram is opened
const HoloViewer = lazy(() => import('../components/odyssey/HoloViewer'));

const pad = (n, width) => String(n).padStart(width, "0");

const Frame = () => (
    <div className="frame" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
);

const SectionHeading = ({ title, note }) => (
    <div className="sec-h"><h3>{title}</h3><span className="mono dim">{note}</span></div>
);

const SpecList = ({ rows, note }) => (
    <dl className="spec mono">
        {rows.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
        {note && <p>{note}</p>}
    </dl>
);

const SCRIPT_CLASSES = { scene: "scene", action: "act", character: "who", paren: "par", line: "line" };

/* ---------------- Technical ---------------- */
const TechnicalPanel = ({ project }) => (
    <section className="panel" id="pn-tech" role="tabpanel" aria-labelledby="tab-tech">
        <SectionHeading title="Vehicle" note="3D model" />
        <div className="holo-row">
            <Suspense fallback={<div className="viewer"><div className="v-msg mono">Loading 3D view…</div></div>}>
                <HoloViewer accent={project.accent} model={project.model} modelUp={project.modelUp} />
            </Suspense>
            <SpecList rows={project.vehicleSpec} note={project.specNote} />
        </div>

        <SectionHeading title="Drawings" note="General arrangement" />
        <Drawing title={project.title} />

        <SectionHeading title="Build log" note="From brief to competition" />
        <div className="log">
            {project.buildLog.map((entry, i) => (
                <article className="entry" key={i}>
                    <div className="entry-meta mono dim"><strong>{entry.month}</strong><span>{entry.week}</span></div>
                    <div className="entry-body">
                        <h4>{entry.title}</h4>
                        <p>{entry.text}</p>
                        {entry.figures && entry.figures.length > 0 && (
                            <div className="figs">
                                {entry.figures.map((fig, j) => (
                                    <Figure key={j} figure={fig} ar={entry.figures.length === 2 ? "4/3" : "1/1"} />
                                ))}
                            </div>
                        )}
                    </div>
                </article>
            ))}
        </div>
    </section>
);

/* ---------------- Artistic ---------------- */
const ArtisticPanel = ({ project }) => (
    <section className="panel" id="pn-art" role="tabpanel" aria-labelledby="tab-art">
        <SectionHeading title="Performance" note="Full run" />
        <div className="video-row">
            {project.video ? (
                <div className="video video--embed">
                    <iframe
                        src={project.video}
                        title={`${project.title} performance`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            ) : (
                <div className="video">
                    <div className="v-ui t mono"><span><b>●</b> Recording</span><span>00:00 / 08:00</span></div>
                    <div className="play" aria-hidden="true"></div>
                    <div className="timebar"><i></i></div>
                    <div className="v-ui b mono"><span>Video coming soon</span><span>16:9</span></div>
                </div>
            )}
            <SpecList rows={project.performanceSpec} />
        </div>

        <SectionHeading title="Script" note="Excerpt" />
        <div className="script-row">
            <div className="script-page" tabIndex={0} aria-label="Script excerpt">
                {project.script.map((line, i) => (
                    <p key={i} className={SCRIPT_CLASSES[line.type] || "line"}>
                        {line.text}
                        {line.num && <span className="num">{line.num}</span>}
                    </p>
                ))}
            </div>
            <div className="notes">
                {project.scriptNotes.map((note, i) => <p key={i}>{note}</p>)}
                <Figure figure={project.rehearsalPhoto} ar="16/9" />
            </div>
        </div>

        <SectionHeading title="Costumes & set" note="Sketches and builds" />
        <div className="costumes">
            {project.costumes.map((fig, i) => <Figure key={i} figure={fig} ar="3/4" />)}
        </div>
    </section>
);

/* ---------------- World Finals ---------------- */
const WorldFinalsPanel = ({ project }) => {
    if (!project.worldFinals) {
        return (
            <section className="panel" id="pn-wf" role="tabpanel" aria-labelledby="tab-wf">
                <p className="wf-none mono dim">The team did not qualify for World Finals this season.</p>
            </section>
        );
    }

    const { trip } = project;
    return (
        <section className="panel" id="pn-wf" role="tabpanel" aria-labelledby="tab-wf">
            <div className="wf-strip mono dim">
                <div>Location<strong>{trip.location}</strong></div>
                <div>Dates<strong>{trip.dates}</strong></div>
                <div>Placement<strong>{trip.placement}</strong></div>
                <div>Distance<strong>{trip.distance}</strong></div>
            </div>
            <div className="days">
                {trip.days.map((day, i) => (
                    <article className={`day${day.highlight ? " hl" : ""}`} key={i}>
                        <span className="mono dim">{day.label}</span>
                        <h4>{day.title}</h4>
                        <p>{day.text}</p>
                        {day.figures && day.figures.length > 0 && (
                            <div className="figs">
                                {day.figures.map((fig, j) => <Figure key={j} figure={fig} ar={j === 0 ? "16/10" : "4/5"} />)}
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
};

const CHAPTERS = [
    { key: "tech", number: "T / 01", title: "Technical", note: () => "Model · drawings · build log", Panel: TechnicalPanel },
    { key: "art", number: "T / 02", title: "Artistic", note: () => "Performance · script · costumes", Panel: ArtisticPanel },
    { key: "wf", number: "T / 03", title: "World Finals", note: (p) => (p.worldFinals ? "Trip log" : "Not qualified this season"), Panel: WorldFinalsPanel },
];

const ProjectPage = ({ project }) => {
    const [tab, setTab] = useState("tech");
    const ActivePanel = CHAPTERS.find((c) => c.key === tab).Panel;

    return (
        <>
            <header className="pj-hero">
                <div>
                    <div className="pj-kicker mono dim">
                        <span className="sw" style={{ margin: 0 }} />
                        <span>{project.season}</span>
                        <span>{project.role === "coach" ? "Coach" : "Team member"}</span>
                    </div>
                    <h1 className="pj-title">{project.title}</h1>
                    <p className="pj-lede">{project.lede}</p>
                    <dl className="facts mono">
                        <div><dt>Problem</dt><dd>{project.problem}</dd></div>
                        <div><dt>Category</dt><dd>{project.category || "—"}</dd></div>
                        <div><dt>Division</dt><dd>{project.division}</dd></div>
                        <div><dt>Furthest</dt><dd>{project.worldFinals ? "World Finals" : "Regional"}</dd></div>
                        <div><dt>Score</dt><dd>{project.score}</dd></div>
                        <div><dt>Placement</dt><dd>{project.placement}</dd></div>
                    </dl>
                    <div className="team mono dim">
                        {project.team.map((member) => <span key={member}>{member}</span>)}
                    </div>
                </div>
                <Figure figure={project.keyPhoto} ar="4/3" />
            </header>

            <div className="chapters" role="tablist" aria-label="Chapters">
                {CHAPTERS.map((chapter) => {
                    const selected = chapter.key === tab;
                    return (
                        <button
                            key={chapter.key}
                            type="button"
                            className={`chap${selected ? " frame-on fill-on" : ""}`}
                            role="tab"
                            id={`tab-${chapter.key}`}
                            aria-controls={`pn-${chapter.key}`}
                            aria-selected={selected}
                            onClick={() => setTab(chapter.key)}
                        >
                            <Frame />
                            <span className="mono dim">{chapter.number}</span>
                            <span>
                                <span className="chap-t fill">{chapter.title}</span>
                                <span className="chap-note mono dim">{chapter.note(project)}</span>
                            </span>
                        </button>
                    );
                })}
            </div>

            <ActivePanel project={project} />
        </>
    );
};

const OdysseyProject = () => {
    const { id } = useParams();
    const [, , themeAttr] = useIndexTheme();
    const entry = projects.find((p) => String(p.id) === id);
    const project = entry ? withPlaceholders(entry) : null;

    usePageTitle(project ? `${project.title} · Odyssey of the Mind` : "Odyssey of the Mind");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="idx ootm pj" data-theme={themeAttr} style={project ? { "--accent": project.accent, "--c": project.accent } : undefined}>
            <div className="wrap">
                <Topbar
                    back="/odyssey"
                    backLabel="Back to Odyssey list"
                    crumbs={[
                        { label: "Index", to: "/main" },
                        { label: "Odyssey of the Mind", to: "/odyssey" },
                        { label: project ? pad(project.id, 2) : id },
                    ]}
                />
                {project ? (
                    // key resets the open chapter when moving between projects
                    <ProjectPage key={project.id} project={project} />
                ) : (
                    <p className="mono dim">Project {id} not found. <Link to="/odyssey">Back to the list</Link></p>
                )}
            </div>
        </div>
    );
};

export default OdysseyProject;
