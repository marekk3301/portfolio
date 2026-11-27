/*
  Placeholder content for Odyssey of the Mind project pages.

  Every field below is optional in odyssey.json: a project that leaves one out
  shows the placeholder instead. To fill a page in, copy the field into that
  project's entry in odyssey.json and replace the text.

  Figures are { "caption": "...", "src": "odyssey/<folder>/<file>.jpg", "ar": "4/3" }.
  "src" is relative to public/galleries; without it a dashed placeholder box is shown.
  "ar" is the box's aspect ratio (only used for placeholders, real images keep their own).

  Fields in odyssey.json:
    id, role ("member" | "coach"), season, title, problem, category, division,
    worldFinals (true | false), accent (colour for the hologram and timeline),
    model        path to an .stl file relative to public/galleries (null = placeholder vehicle)
    modelUp      which axis of the .stl points up: "z" (default, most CAD exports), "y" or "x"
    lede, score, placement, team, keyPhoto,
    vehicleSpec, specNote, buildLog,
    video        YouTube embed URL,
    performanceSpec, script, scriptNotes, rehearsalPhoto, costumes,
    trip         World Finals: location, dates, placement, distance, days
*/

const PLACEHOLDERS = {
    lede: "One or two sentences on the problem and your team's answer to it. What did the vehicle have to do, and what story did the performance tell?",
    score: "—",
    placement: "—",
    team: ["Member A", "Member B", "Member C", "Member D", "Member E", "Member F", "Member G"],
    keyPhoto: { caption: "Key photo · team with the vehicle", ar: "4/3" },

    vehicleSpec: [
        ["Length", "2200 mm"],
        ["Track", "1320 mm"],
        ["Mass", "— kg"],
        ["Drive", "—"],
        ["Power", "—"],
        ["Frame", "—"],
        ["CAD", "—"],
    ],
    specNote: "Figures here are example values that match the placeholder model.",

    buildLog: [
        {
            month: "Sep", week: "Week 01", title: "Reading the problem",
            text: "What the long-term problem asked for, the limits in the rulebook (size, budget, materials) and how the team interpreted them. Include the first sketches and the ideas you threw away.",
            figures: [{ caption: "Whiteboard session" }, { caption: "First concept sketch" }],
        },
        {
            month: "Nov", week: "Week 09", title: "First prototype",
            text: "The first version that actually moved. What it was made of, what broke, and what you learned from it. A short note on the CAD work: what you modelled before cutting anything.",
            figures: [{ caption: "Chassis on the bench" }, { caption: "CAD screenshot" }, { caption: "Drive test" }],
        },
        {
            month: "Jan", week: "Week 18", title: "Testing and redesign",
            text: "Runs on the real course, measurements, and the changes they forced. Good place for a before/after pair and a table of test results.",
            figures: [{ caption: "Before" }, { caption: "After" }],
        },
        {
            month: "Mar", week: "Week 26", title: "Competition build",
            text: "The final vehicle as it went to the competition: weight, finish, how it was transported and set up within the time limit.",
            figures: [{ caption: "Final vehicle" }, { caption: "Packed for transport" }],
        },
    ],

    video: null,
    performanceSpec: [
        ["Time limit", "8:00"],
        ["Incl.", "Setup"],
        ["Cast", "—"],
        ["Venue", "—"],
        ["Style score", "—"],
    ],

    // type: "scene" (heading, optional num), "action", "character", "paren", "line"
    script: [
        { type: "scene", text: "1. [Location] — [Time of day]", num: "1." },
        { type: "action", text: "Lights up. The vehicle sits centre stage under a sheet. [Stage direction describing who is where.]" },
        { type: "character", text: "Narrator" },
        { type: "line", text: "[Opening line that sets up the problem the team has to solve.]" },
        { type: "character", text: "Character A" },
        { type: "paren", text: "(stepping forward)" },
        { type: "line", text: "[Line of dialogue.]" },
        { type: "character", text: "Character B" },
        { type: "line", text: "[Reply. This is where the vehicle's first task is introduced.]" },
        { type: "action", text: "The sheet is pulled away. The vehicle drives to the first mark. [Note any cue the team used for timing.]" },
        { type: "scene", text: "2. [Location]", num: "2." },
        { type: "action", text: "[Scene change. How the set was rearranged and by whom.]" },
        { type: "character", text: "Narrator" },
        { type: "line", text: "[Line of dialogue.]" },
    ],
    scriptNotes: [
        "Use this column for the story behind the script: where the idea came from, how the plot tied into the problem's required elements, and what changed between rehearsals and the final run.",
    ],
    rehearsalPhoto: { caption: "Rehearsal", ar: "16/9" },

    costumes: [
        { caption: "Sketch · character A" }, { caption: "Build · character A" },
        { caption: "Sketch · character B" }, { caption: "Build · character B" },
        { caption: "Backdrop design" }, { caption: "Backdrop painted" },
        { caption: "Prop" }, { caption: "Full cast on stage" },
    ],

    trip: {
        location: "City, State",
        dates: "May —",
        placement: "— / —",
        distance: "— km",
        days: [
            {
                label: "Day 00", title: "Travel",
                text: "Packing the vehicle and set for the flight, getting through the airport with oversized cases, arrival.",
                figures: [{ caption: "Cases at the airport" }, { caption: "First look at campus" }, { caption: "Team on arrival" }],
            },
            {
                label: "Day 01", title: "Opening ceremony",
                text: "Pin trading, meeting teams from other countries, the parade.",
                figures: [{ caption: "Opening ceremony" }, { caption: "Pin trading" }, { caption: "Our delegation" }],
            },
            {
                label: "Day 02", title: "Competition", highlight: true,
                text: "Setup, the eight minutes on stage, the spontaneous problem. What went right and what didn't.",
                figures: [{ caption: "On stage" }, { caption: "Spontaneous room" }, { caption: "After the run" }],
            },
            {
                label: "Day 03", title: "Results",
                text: "Awards, final placement, and the trip home.",
                figures: [{ caption: "Awards" }, { caption: "Scoreboard" }, { caption: "Last day" }],
            },
        ],
    },
};

// Project entry with every missing field filled from the placeholders
export const withPlaceholders = (project) => ({
    ...PLACEHOLDERS,
    ...project,
    trip: { ...PLACEHOLDERS.trip, ...(project.trip || {}) },
});

export default PLACEHOLDERS;
