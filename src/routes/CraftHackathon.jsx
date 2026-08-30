import React from 'react';
import '../css/CraftHackathon.css';

const toolsData = [
  {
    id: 'pc',
    name: 'Computers',
    icon: 'pc.svg',
    examples: '3D Models, Vector Paths, Slicing, Code, Machines Software'
  },
  {
    id: 'fdm',
    name: 'FDM 3D Printer',
    icon: 'fdm.svg',
    examples: 'Functional parts, Enclosures, Decorations, Household fixtures, Cosplay props, Art'
  },
  {
    id: 'sla',
    name: 'SLA Resin Printer',
    icon: 'sla.svg',
    examples: 'Tabletop Miniatures, Jewelry, Keycaps, Tiny gears, High-detail, precision parts'
  },
  {
    id: 'laser',
    name: 'Laser Cutter',
    icon: 'laser.svg',
    examples: 'Plywood Boxes, Veneer Inlays, Jigsaw puzzles, Architectural models, Fabric Patterns, Rubber Stamps, Metal Marking'
  },
  {
    id: 'vinyl',
    name: 'Vinyl Cutter',
    icon: 'vinyl.svg',
    examples: 'Custom Stickers, Stencils, T-shirts and apparel, Vehicle lettering'
  },
  {
    id: 'soldering',
    name: 'Soldering Station',
    icon: 'soldering.svg',
    examples: 'Electronic Circuits, Custom PCBs, Electronic repairs, Metal jewelry, Stained Glass'
  },
  {
    id: 'electronics',
    name: 'Electronic Components',
    icon: 'electronics.svg',
    examples: 'Home automation, Interactive art, Custom game controllers, LEDs, Sensors, Servos, Switches'
  },
  {
    id: 'dremel',
    name: 'Dremel Multitool',
    icon: 'dremel.svg',
    examples: 'Polished metalwork, Wood carvings, Engraved glassware'
  },
  {
    id: 'resin',
    name: '2K Resin',
    icon: 'resin.svg',
    examples: 'River tables, Custom dice sets, Silicone Mold Castings'
  },
  {
    id: 'paints',
    name: 'Airbrush & Paints',
    icon: 'paints.svg',
    examples: '3D printed miniatures, Wargaming terrain, Weathered props, Custom action figures, Graffiti art'
  },
  {
    id: 'powertools',
    name: 'Power Tools',
    icon: 'powertools.svg',
    examples: 'Cordless Drill, Orbital Sander, Heat Gun, Hot Glue Gun'
  },
  {
    id: 'handtools',
    name: 'Hand Tools',
    icon: 'handtools.svg',
    examples: 'Cutters, Pliers, Screwdrivers, Scalpels, Calipers, Clamps and many more...'
  }
];

const timelineData = [
  { time: '12:00', title: 'Coffee and tool tutorials' },
  { time: '14:00', title: 'Start working on projects' },
  { time: '18:00', title: 'Pizza' },
  { time: '11:00', title: 'Breakfast' },
  { time: '14:00', title: 'Projects deadline & showcase' },
  { time: '15:00', title: 'Heading out' }
];

const faqData = [
  {
    q: 'Who is this hackathon for?',
    a: 'Everyone invited! Whether you want to build hardware, craft, or make art, there is a space and tool for you.'
  },
  {
    q: 'Will materials be provided?',
    a: "Filament, 3D printing resin, plywood, stamp rubber, adhesive vinyl, HTV, EVA foam, solder, wire, basic electronic parts, casting resin, paints, and everyday consumables will be available on-site. If you plan to use anything unusual (or unreasonable amounts of anything), it's best to bring your own."
  },
  {
    q: 'What should I bring?',
    a: 'A laptop (if you need one) and any unique tools, components, or materials you want to experiment with. You can always ask beforehand if a specific tool or material will be available — we have too much gear to list here.'
  }
];

const CraftHackathon = () => {
  return (
    <div className="craft-page">
      {/* Background Subtle Gradient */}
      <div className="craft-ambient-glow" />

      {/* Hero Section */}
      <header className="craft-hero">
        <div className="craft-hero__subtitle">
          CRAFT HACKATHON
        </div>

        <h1 className="craft-hero__slogan">
          <span className="craft-hero__slogan-line1 glitch">
            You've consumed enough.
          </span>
          <span className="craft-hero__slogan-line2 glitch">
            It's time to CREATE
          </span>
        </h1>

        <div className="craft-hero__date glitch_no_blur">
          19.09.2026
        </div>

        <div className="craft-hero__scroll-hint">
          <span>↓</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="craft-container">
        
        {/* Section: Manifesto */}
        <section className="craft-section">
          <div className="craft-section__header">
            <span className="craft-section__num">01</span>
            <h2 className="craft-section__title">THE MANIFESTO</h2>
          </div>
          <div className="craft-manifesto__card">
            <p className="craft-manifesto__lead">
              We spend our days scrolling, tapping, and consuming digital content designed by others. 
              <strong> This Craft Hackathon is a remedy.</strong>
            </p>
            <p className="craft-manifesto__body">
              This is a sprint dedicated to tangible, hands-on creation. We are gathering to build physical artifacts, device prototypes, fashion pieces, scrapbooking and art that you can touch and hold in your hands.
            </p>
          </div>
        </section>

        {/* Section: Tools & Mediums */}
        <section className="craft-section">
          <div className="craft-section__header">
            <span className="craft-section__num">02</span>
            <h2 className="craft-section__title">TOOLS & MEDIUMS</h2>
          </div>

          <div className="craft-tools__grid">
            {toolsData.map((tool) => {
              const iconPath = `${process.env.PUBLIC_URL}/galleries/craft_tools/${tool.icon}`;
              return (
                <div key={tool.id} className="craft-tool__card">
                  <div className="craft-tool__icon-wrapper">
                    <img
                      src={iconPath}
                      alt={tool.name}
                      className="craft-tool__icon glitch"
                    />
                  </div>
                  <h3 className="craft-tool__name">{tool.name}</h3>

                  {/* Hover / Tap Reveal: Materials & Project Examples */}
                  <div className="craft-tool__overlay">
                    <h4 className="craft-tool__overlay-title">{tool.name}</h4>
                    <p className="craft-tool__overlay-examples">
                      {tool.examples}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Timeline & Logistics */}
        <section className="craft-section">
          <div className="craft-section__header">
            <span className="craft-section__num">03</span>
            <h2 className="craft-section__title">TIMELINE & LOGISTICS</h2>
          </div>

          <div className="craft-schedule__grid">
            {/* Simple Timeline */}
            <div className="craft-schedule__timeline">
              {timelineData.map((item, idx) => (
                <div key={idx} className="craft-schedule__item">
                  <div className="craft-schedule__time-badge glitch_no_blur">{item.time}</div>
                  <div className="craft-schedule__item-title">{item.title}</div>
                </div>
              ))}
            </div>

            {/* Logistics Block */}
            <div className="craft-logistics__card">
              <div className="craft-logistics__row">
                <span className="craft-logistics__label">DATE</span>
                <span className="craft-logistics__val">19.09.2026 – 20.09.2026</span>
              </div>
              <div className="craft-logistics__row">
                <span className="craft-logistics__label">HOURS</span>
                <span className="craft-logistics__val">sat 12:00 – sun 15:00 (24h+)</span>
              </div>
              <div className="craft-logistics__row">
                <span className="craft-logistics__label">LOCATION</span>
                <span className="craft-logistics__val">You know where I live.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: FAQ */}
        <section className="craft-section">
          <div className="craft-section__header">
            <span className="craft-section__num">04</span>
            <h2 className="craft-section__title">FAQ</h2>
          </div>
          <div className="craft-faq__grid">
            {faqData.map((faq, idx) => (
              <div key={idx} className="craft-faq__card">
                <h3 className="craft-faq__q">{faq.q}</h3>
                <p className="craft-faq__a">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="craft-footer">
        <p>CRAFT HACKATHON 2026 // ORGANIZED BY KINGA & MAREK</p>
      </footer>
    </div>
  );
};

export default CraftHackathon;
