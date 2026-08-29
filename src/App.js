import { Route, Routes } from 'react-router-dom';
import './App.css';

import Project from './routes/Project';
import ProjectList from './routes/ProjectList';
import Landing from './routes/Landing';
import CraftHackathon from './routes/CraftHackathon';

function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const desktopLock = false;

  if (!isMobile && desktopLock) {
    return (
      <div className="App">
        <h2>Sorry! Desktop view is currently under construction.</h2>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Routes>
           <Route path='/' element={<ProjectList/>} />
           <Route path='/project/:id' element={<Project />} />
           <Route path='/main' element={<Landing />} />
           <Route path='/craft' element={<CraftHackathon />} />
           <Route path='/crafthack' element={<CraftHackathon />} />
           <Route path='/craft-hackathon' element={<CraftHackathon />} />
         </Routes>
      </div>
    );
  }
  
}

export default App;
