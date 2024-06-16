import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { animated, useSpring, config } from 'react-spring';
import WelcomeComponent from './WelcomeComponent';
import TechJourney from './TechJourney';
import MajorProjects from './MajorProjects';
import PersonalInsights from './PersonalInsights';
import './AboutMe.css';

const AboutMe = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const sections = useMemo(() => [
    <WelcomeComponent onNavigate={setActiveSection} />,
    <TechJourney />,
    <MajorProjects />,
    <PersonalInsights />,
  ], []);

  const props = useSpring({
    transform: `translateY(-${activeSection * 100}vh)`,
    config: { ...config.stiff, clamp: true },
  });

  const handleScroll = useCallback((event) => {
    if (scrolling) return;
    setScrolling(true);
    if (event.deltaY > 0) {
      setActiveSection((prev) => Math.min(prev + 1, 3));
    } else if (event.deltaY < 0) {
      setActiveSection((prev) => Math.max(prev - 1, 0));
    }
    setTimeout(() => setScrolling(false), 500);
  }, [scrolling]);

  const handleKeyDown = useCallback((event) => {
    if (scrolling) return;
    setScrolling(true);
    if (event.key === 'ArrowDown') {
      setActiveSection((prev) => Math.min(prev + 1, 3));
    } else if (event.key === 'ArrowUp') {
      setActiveSection((prev) => Math.max(prev - 1, 0));
    }
    setTimeout(() => setScrolling(false), 500);
  }, [scrolling]);

  const handleDotClick = useCallback((index) => {
    setActiveSection(index);
  }, []);

  const handleProgressBarClick = useCallback((event) => {
    const clickPosition = event.clientX / window.innerWidth;
    const targetSection = Math.floor(clickPosition * 4);
    setActiveSection(targetSection);
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScroll, handleKeyDown]);

  return (
    <div className="about-me-container">
      <animated.div className="scroll-container" style={props}>
        {sections.map((Section, index) => (
          <div className="section" key={index}>
            {Section}
          </div>
        ))}
      </animated.div>
      <div className="navigation-dots">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`dot ${index === activeSection ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            title={['Welcome', 'Tech Journey', 'Major Projects', 'Personal Insights'][index]}
          />
        ))}
        <div className="underline" style={{ left: `${activeSection * 25}%` }} />
      </div>
      <div className="progress-bar" onClick={handleProgressBarClick}>
        <div className="progress" style={{ width: `${(activeSection / 3) * 100}%` }} />
      </div>
    </div>
  );
};

export default AboutMe;