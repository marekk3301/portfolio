import React from 'react';
import '../css/CraftHackathon.css';

const toolsData = [
  {
    id: 'pc',
    name: 'PC & Workstations',
    icon: 'pc.svg',
    examples: '3D Models, Vector Paths, Slicing, Code, Generative Art, PCB Layouts'
  },
  {
    id: 'fdm',
    name: 'FDM 3D Printer',
    icon: 'fdm.svg',
    examples: 'PLA, PETG, Functional Brackets, Shells, Custom Enclosures'
  },
  {
    id: 'sla',
    name: 'SLA Resin Printer',
    icon: 'sla.svg',
    examples: 'UV Resin, Miniatures, High-Detail Figurines, Precision Parts'
  },
  {
    id: 'laser',
    name: '40W Laser Cutter',
    icon: 'laser.svg',
    examples: 'Plywood, Acrylic, Cardboard, Laser Engravings, Box Joints'
  },
  {
    id: 'vinyl',
    name: 'Vinyl Cutter',
    icon: 'vinyl.svg',
    examples: 'Adhesive Vinyl, Custom Stickers, Stencils, Heat-Press Foil'
  },
  {
    id: 'soldering',
    name: 'Soldering Station',
    icon: 'soldering.svg',
    examples: 'Lead-Free Solder, Heat Shrink, Custom Cables, Circuit Assembly'
  },
  {
    id: 'electronics',
    name: 'Electronic Components',
    icon: 'electronics.svg',
    examples: 'ESP32, Arduino, LEDs, Sensors, Servos, Switches, Batteries'
  },
  {
    id: 'dremel',
    name: 'Dremel Multitool',
    icon: 'dremel.svg',
    examples: 'Cutting Wheels, Sanding Drums, Polishing Bits, Surface Engraving'
  },
  {
    id: 'resin',
    name: '2K Resin',
    icon: 'resin.svg',
    examples: 'Epoxy, Polyurethane, Silicone Molds, Encapsulation, Clear Casts'
  },
  {
    id: 'paints',
    name: 'Paints & Finishes',
    icon: 'paints.svg',
    examples: 'Acrylics, Spray Cans, Primers, Washes, Weathering & Detailing'
  },
  {
    id: 'powertools',
    name: 'Power Tools',
    icon: 'powertools.svg',
    examples: 'Cordless Drill, Orbital Sander, Jigsaw, Heat Gun, Hot Glue'
  },
  {
    id: 'handtools',
    name: 'Hand Tools',
    icon: 'handtools.svg',
    examples: 'Flush Cutters, Pliers, Screwdrivers, Scalpels, Calipers, Clamps'
  }
];

const timelineData = [
  { time: '12:00', title: 'Coffee and Tool Tutorials' },
  { time: '14:00', title: 'Start Projects' },
  { time: '18:00', title: 'Pizza' },
  { time: '11:00', title: 'Breakfast' },
  { time: '14:00', title: 'Projects DEADLINE & Showcase' },
  { time: '15:00', title: 'Get out xd' }
];

const faqData = [
  {
    q: 'Who is this hackathon for?',
    a: 'Everyone invited! Whether you want to build hardware, code, craft, or sculpt, there is a space and tool for you.'
  },
  {
    q: 'What should I bring?',
    a: 'Your laptop, chargers, and any weird components or materials you want to play with.'
  },
  {
    q: 'Will materials be provided?',
    a: 'Filaments, resin, plywood, acrylic, solder, wire, paints, and basic consumables will be ready on-site.'
  }
];

const CraftHackathon = () => {
  return (
    <div className="craft-page">
      {/* Background Subtle Gradient */}
      <div className="craft-ambient-glow" />

      {/* Hero Section */}
      <header className="craft-hero">
        <div className="craft-hero__subtitle glitch_no_blur">
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
              We spend our days scrolling, tapping, and consuming digital streams designed by others. 
              <strong> The Craft Hackathon is an antidote.</strong>
            </p>
            <p className="craft-manifesto__body">
              This is a sprint dedicated to tangible, hands-on creation. No theoretical slide decks or abstract repos—we are gathering to build physical artifacts, interactive machines, wearable tech, cybernetic sculptures, and crafted prototypes that you can touch, test, and hold in your hands.
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
                <span className="craft-logistics__val">12:00 – 15:00 (24h+)</span>
              </div>
              <div className="craft-logistics__row">
                <span className="craft-logistics__label">LOCATION</span>
                <span className="craft-logistics__val">You know where I live.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: FAQ (Preserved in code, hidden via CSS) */}
        <section className="craft-section craft-faq-hidden">
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
