import React, { useMemo } from 'react';

const escapeXml = (text) =>
    String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Placeholder general-arrangement drawing of the placeholder vehicle, all dimensions in mm
// (matches the hologram geometry). Built as an SVG string, same as the prototype.
const drawingSVG = (title) => {
    const S = 0.15, G = 330, X0 = 70, FX0 = 500;
    const sx = (x) => X0 + (x + 1100) * S, sy = (y) => G - y * S, fx = (z) => FX0 + (z + 660) * S;
    const r = (x1, y1, x2, y2) => `<rect x="${Math.min(x1, x2)}" y="${Math.min(y1, y2)}" width="${Math.abs(x2 - x1)}" height="${Math.abs(y2 - y1)}"/>`;
    const tick = (x, y) => `<path d="M${x - 4} ${y + 4}L${x + 4} ${y - 4}"/>`;
    const dimH = (x1, x2, y, label, ext1, ext2) => `<g class="d">
    <path d="M${x1} ${ext1}V${y + 5}M${x2} ${ext2}V${y + 5}M${x1} ${y}H${x2}"/>${tick(x1, y)}${tick(x2, y)}
    <text x="${(x1 + x2) / 2}" y="${y - 6}" text-anchor="middle">${label}</text></g>`;
    const dimV = (y1, y2, x, label, ext) => `<g class="d">
    <path d="M${ext} ${y1}H${x - 5}M${ext} ${y2}H${x - 5}M${x} ${y1}V${y2}"/>${tick(x, y1)}${tick(x, y2)}
    <text x="${x - 8}" y="${(y1 + y2) / 2}" text-anchor="middle" transform="rotate(-90 ${x - 8} ${(y1 + y2) / 2})">${label}</text></g>`;
    const wheel = (x) => `<circle cx="${sx(x)}" cy="${sy(260)}" r="${260 * S}"/><circle cx="${sx(x)}" cy="${sy(260)}" r="${70 * S}"/>`;

    return `<svg viewBox="0 0 800 470" fill="none" stroke="currentColor" font-family="Geist Mono, monospace" font-size="10" role="img" aria-label="Placeholder technical drawing: side and front view with overall dimensions">
    <style>.d{stroke-width:.6}.d text,.tb text{fill:currentColor;stroke:none;letter-spacing:.06em}.c{stroke-dasharray:10 3 2 3;stroke-width:.5}.h{stroke-width:.5;stroke-dasharray:3 2}</style>
    <rect x="10" y="10" width="780" height="450" stroke-width="1.2"/>
    <g stroke-width="1.4">
      ${r(sx(-1100), sy(260), sx(1100), sy(380))}
      ${r(sx(-900), sy(375), sx(500), sy(725))}
      ${r(sx(600), sy(350), sx(1100), sy(550))}
      ${wheel(-750)}${wheel(750)}
    </g>
    <path class="c" d="M${sx(-750)} ${sy(560)}V${sy(-40)}M${sx(750)} ${sy(560)}V${sy(-40)}"/>
    <path stroke-width=".8" d="M${sx(-1180)} ${G}H${sx(1180)}"/>
    ${dimH(sx(-1100), sx(1100), G + 56, "2200", G + 4, G + 4)}
    ${dimH(sx(-750), sx(750), G + 30, "1500", G, G)}
    ${dimV(sy(0), sy(725), sx(-1100) - 26, "725", sx(-900) - 4)}
    <text x="${sx(0)}" y="40" text-anchor="middle" class="tb" fill="currentColor" stroke="none" style="letter-spacing:.1em">SIDE VIEW</text>
    <g stroke-width="1.4">
      ${r(fx(-550), sy(260), fx(550), sy(380))}
      ${r(fx(-450), sy(375), fx(450), sy(725))}
      ${r(fx(-660), sy(0), fx(-540), sy(520))}
      ${r(fx(540), sy(0), fx(660), sy(520))}
    </g>
    <path class="h" d="M${fx(-540)} ${sy(260)}H${fx(540)}"/>
    <path class="c" d="M${fx(0)} ${sy(780)}V${sy(-40)}"/>
    <path stroke-width=".8" d="M${fx(-720)} ${G}H${fx(720)}"/>
    ${dimH(fx(-660), fx(660), G + 56, "1320", G + 4, G + 4)}
    <text x="${fx(0)}" y="40" text-anchor="middle" class="tb" fill="currentColor" stroke="none" style="letter-spacing:.1em">FRONT VIEW</text>
    <g class="tb" stroke-width=".8">
      <rect x="500" y="404" width="290" height="56"/>
      <path d="M500 432H790M650 404V460M720 404V460"/>
      <text x="508" y="422">${escapeXml(title.toUpperCase())}</text><text x="508" y="450">VEHICLE / GA</text>
      <text x="658" y="422">SCALE</text><text x="658" y="450">1:10</text>
      <text x="728" y="422">UNITS mm</text><text x="728" y="450">SHEET 1/1</text>
    </g>
  </svg>`;
};

const Drawing = ({ title }) => {
    const svg = useMemo(() => drawingSVG(title), [title]);
    return <div className="sheet" dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default Drawing;
