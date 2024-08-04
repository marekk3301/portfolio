import './App.css';
import ProjectInfo from './components/ProjectInfo';
import MediaFrame from './components/MediaFrame';
import Awards from './components/Awards';
import EventInfo from './components/EventInfo';

import hackathons from './assets/hackathons.json';

const hackathon = hackathons[0];

function App() {
  return (
    <div className="App">
      <MediaFrame solution_link={hackathon.solution_link} solution_display_type={hackathon.solution_display_type} />
      <ProjectInfo name={hackathon.name} description={hackathon.description} />
      <Awards place={hackathon.event.place} />
      <EventInfo event={hackathon.event} />
    </div>
  );
}

export default App;
