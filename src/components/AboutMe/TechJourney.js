import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { animated, useTransition } from 'react-spring';
import './TechJourney.css';

const milestonesData = [
  { year: "2019", title: "Started my journey 🖥️", description: "Wanted to explore and learn about everything there was to Computer Science.", bg: '#FCE4EC', icons: ['🖥️', '⌨️', '💾'] },
  { year: "2019", title: "Learned Front-end Technologies 🌐", description: "Took courses on HTML, CSS, and JavaScript.", bg: '#E3F2FD', icons: ['🌐', '🖌️', '📜'] },
  { year: "2020", title: "Built My First Website 🌐", description: "Created my first personal website using HTML, CSS, and some JS", bg: '#E1F5FE', icons: ['🌐', '🖥️', '👨‍💻'] },
  { year: "2020", title: "Explored Version Control 📚", description: "Started using Git and GitHub to manage my projects.", bg: '#E8F5E9', icons: ['📚', '💻', '🌐'] },
  { year: "2021", title: "Learned JavaScript Frameworks 📦", description: "Dove into React.js and started building dynamic web applications.", bg: '#F3E5F5', icons: ['📦', '⚛️', '🌐'] },
  { year: "2021", title: "Contributed to Open Source 👐", description: "Made my first contributions to open-source projects that I found on GitHub.", bg: '#FFF3E0', icons: ['👐', '📈', '🖥️'] },
  { year: "2021", title: "Explored Back-end Development 🖧", description: "Learned Node.js and built my first REST API.", bg: '#F0F4C3', icons: ['🖧', '📡', '💾'] },
  { year: "2022", title: "Improved My Algorithms & Data Structures 📊", description: "Practiced on LeetCode and HackerRank to strengthen and refine my problem-solving skills.", bg: '#F3E5F5', icons: ['📊', '🖥️', '📚'] },
  { year: "2022", title: "Attended Tech Conferences 📅", description: "Participated in some conferences where I learned about some of the ins and outs of the industry.", bg: '#FFF3E0', icons: ['📅', '🎤', '🖥️'] },
  { year: "2023", title: "First Major Project 🏘️", description: "Started developing the Next Door Helpers app.", bg: '#E8F5E9', icons: ['🏘️', '👫', '🤝'] },
  { year: "2023", title: "Participated MSU Hackathon 🤖", description: "Worked with a team to develop a dynamic website.", bg: '#FFF3E0', icons: ['🤖', '🧠', '🎓'] },
  { year: "2023", title: "Moved to bigger applications 🍺", description: "Focused on advanced frameworks and started the Bar Crawl project.", bg: '#F3E5F5', icons: ['🍺', '📊', '📈'] }
];

const TechJourney = () => {
  const [background, setBackground] = useState('linear-gradient(to right, #B2DFDB, #E0F2F1)');
  const [icons, setIcons] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const timelineRef = useRef(null);

  const milestones = useMemo(() => milestonesData, []);

  const iconTransitions = useTransition(icons, {
    from: { opacity: 0, transform: 'translateY(-40px)' },
    enter: item => ({ opacity: 1, transform: 'translateY(0px)', top: `${item.y}%`, left: `${item.x}%` }),
    leave: { opacity: 0, transform: 'translateY(40px)' },
    config: { duration: 500 },
  });

  const handleMouseEnter = useCallback((milestone) => {
    setBackground(`linear-gradient(120deg, ${milestone.bg} 40%, #E0F2F1 60%)`);
    const newIcons = milestone.icons.map(icon => ({
      icon,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80
    }));
    setIcons(newIcons);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setBackground('linear-gradient(to right, #B2DFDB, #E0F2F1)');
    setIcons([]);
  }, []);

  const scrollUp = useCallback(() => {
    setScrollPosition(prev => Math.max(prev - 1, 0));
  }, []);

  const scrollDown = useCallback(() => {
    setScrollPosition(prev => Math.min(prev + 1, milestones.length - 1));
  }, [milestones.length]);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = scrollPosition * timelineRef.current.clientHeight;
    }
  }, [scrollPosition]);

  return (
    <div className="tech-journey-container" style={{ background }}>
      <div className="timeline-container" ref={timelineRef}>
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="timeline-item"
            onMouseEnter={() => handleMouseEnter(milestone)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-date">{milestone.year}</div>
            <div className="timeline-content">
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
      {iconTransitions((style, item) => (
        <animated.span style={style} className="floating-icon">{item.icon}</animated.span>
      ))}
      <div className="arrow-container">
        <button className="scroll-button scroll-up" onClick={scrollUp} disabled={scrollPosition === 0}>
          <div className="arrow up"></div>
        </button>
        <button className="scroll-button scroll-down" onClick={scrollDown} disabled={scrollPosition === milestones.length - 1}>
          <div className="arrow down"></div>
        </button>
      </div>
    </div>
  );
};

export default TechJourney;