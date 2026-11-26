import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import "../css/Landing.css"

import hackathons from '../assets/hackathons.json';
// ArUco DICT_4X4_50: inner 4×4 bits per id, 1 = white (exported from OpenCV)
import arucoDict from '../assets/aruco_4x4_50.json';

const CONFIG = {
    name: ["Marek", "Kudła"],
    roles: ["Maker", "Engineer", "Programmer", "Educator"],
    sections: [
        // area: grid placement, count: number shown on the tile
        { area: "hack",  title: "Hackathon projects",  to: "/",          unit: "entries", count: hackathons.filter((h) => h.id).length },
        { area: "odys",  title: "Odyssey of the Mind", to: "/odyssey",   unit: "entries", count: 6 },
        { area: "other", title: "Other projects",      to: "/projects",  unit: "entries", count: 23 },
        { area: "tools", title: "Tools & skills",      to: "/skilltree", unit: "items",   count: 31 },
    ],
};

const THEME_KEY = "idx-theme";
const THEMES = [["dark", "Dark"], ["light", "Light"], ["auto", "Auto"]];
const PIXEL_GRID = 6; // squares per side in the hover fill

const readTheme = () => {
    try {
        return localStorage.getItem(THEME_KEY) || "dark";
    } catch (e) {
        return "dark";
    }
};

const pad = (n, width) => String(n).padStart(width, "0");

const randomMarkerId = (except) => {
    let id;
    do {
        id = Math.floor(Math.random() * arucoDict.length);
    } while (id === except && arucoDict.length > 1);
    return id;
};

// Small seeded PRNG so each tile gets its own, stable pixel pattern
const seededRandom = (seed) => () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
};

const Pixels = ({ seed }) => {
    const squares = useMemo(() => {
        const rand = seededRandom(seed);
        return Array.from({ length: PIXEL_GRID * PIXEL_GRID }, () => ({
            "--d": `${Math.round(rand() * 420)}ms`,
            "--o": (0.04 + rand() * 0.12).toFixed(3),
        }));
    }, [seed]);

    return (
        <div className="pixels" aria-hidden="true">
            {squares.map((style, i) => <span key={i} style={style} />)}
        </div>
    );
};

const Frame = () => (
    <div className="frame" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
);

const ArucoTag = ({ bits }) => (
    <svg viewBox="0 0 6 6" aria-hidden="true">
        <rect x="0" y="0" width="6" height="6" fill="var(--tag-black)" />
        {bits.map((row, y) =>
            [...row].map((bit, x) =>
                bit === "1" && <rect key={`${x}-${y}`} x={x + 1} y={y + 1} width="1" height="1" fill="var(--tag-white)" />
            )
        )}
    </svg>
);

const Landing = () => {
    const [theme, setTheme] = useState(readTheme);
    const [markerId, setMarkerId] = useState(() => randomMarkerId());

    useEffect(() => {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {}
    }, [theme]);

    useEffect(() => {
        const previousTitle = document.title;
        document.title = CONFIG.name.join(" ");
        return () => {
            document.title = previousTitle;
        };
    }, []);

    return (
        <div className="landing" data-theme={theme === "auto" ? undefined : theme}>
            <main className="cross">
                <section className="cell meta" aria-label="About">
                    <div className="mono dim">Index / personal archive</div>
                    <h1 className="name">
                        {CONFIG.name[0]}<br />{CONFIG.name[1]}
                    </h1>
                    <ul className="roles mono">
                        {CONFIG.roles.map((role) => <li key={role}>{role}</li>)}
                    </ul>
                </section>

                {CONFIG.sections.map((section, i) => (
                    <Link key={section.area} className={`cell arm arm-${section.area}`} to={section.to}>
                        <Pixels seed={i + 7} />
                        <Frame />
                        <div className="arm-body">
                            <div className="arm-count">{pad(section.count, 2)}</div>
                            <div className="arm-unit mono dim">{section.unit}</div>
                        </div>
                        <div className="arm-title">{section.title}</div>
                    </Link>
                ))}

                <div className="cell core" aria-label="Reserved">
                    <span className="mono dim">Reserved</span>
                </div>

                <div className="cell tag">
                    <button
                        type="button"
                        className="aruco"
                        onClick={() => setMarkerId(randomMarkerId(markerId))}
                        aria-label={`ArUco marker 4×4_50 id ${markerId}. Generate another`}
                        title="Generate another marker"
                    >
                        <ArucoTag bits={arucoDict[markerId]} />
                    </button>
                    <span className="mono dim">4×4_50 / id {pad(markerId, 2)}</span>
                </div>

                <aside className="cell sys" aria-label="Display">
                    <div className="seg mono" role="group" aria-label="Theme">
                        {THEMES.map(([value, label]) => (
                            <button
                                key={value}
                                type="button"
                                aria-pressed={theme === value}
                                onClick={() => setTheme(value)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default Landing;
