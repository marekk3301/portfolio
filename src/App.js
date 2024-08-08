import { Route, Routes } from 'react-router-dom';
import './App.css';

import Project from './routes/Project';
import ProjectList from './routes/ProjectList';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path='/' element={<ProjectList/>} />
         <Route path='/project/:id' element={<Project />} />
       </Routes>
    </div>
  );
}

export default App;
