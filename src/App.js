import { Route, Routes } from 'react-router-dom';
import './App.css';

import Project from './routes/Project';
import HackathonProjectList from './routes/HackathonProjectList';
import MainPage from './routes/MainPage';

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
           <Route path='/' element={<MainPage/>} />
           <Route path='/hackathons' element={<HackathonProjectList/>} />
           <Route path='/project/:id' element={<Project />} />
         </Routes>
      </div>
    );
  }
  
}

export default App;
