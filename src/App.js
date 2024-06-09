import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeHero from './components/HomeHero';
import CustomCursor from './CustomCursor';
import AboutMe from './components/AboutMe/AboutMe';  
import Cube2Projects from './components/Cube2/Cube2Projects';
import Cube3 from './components/Cube3/Cube3';


function App() {
  return (
    <Router>
      <CustomCursor />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomeHero />} />
          <Route path="/about-me" element={<AboutMe />} />  
          <Route path="/projects" element={<Cube2Projects />} />
          <Route path="/Cube3" element={<Cube3 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;