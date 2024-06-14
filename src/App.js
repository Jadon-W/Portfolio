import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './CustomCursor';

const HomeHero = lazy(() => import('./components/HomeHero'));
const AboutMe = lazy(() => import('./components/AboutMe/AboutMe'));
const Cube2Projects = lazy(() => import('./components/Cube2/Cube2Projects'));
const Cube3 = lazy(() => import('./components/Cube3/Cube3'));

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