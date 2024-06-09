import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Timeline.css';
import FullScreenModal from './FullScreenModal';


const timelineData = [
  {
    year: "2023 - Present",
    title: "Lead Developer, Campus Tech Initiatives",
    description: "Leading the development of an AI-driven campus navigation system aimed at improving accessibility for physically challenged students."
  },
  {
    year: "2022",
    title: "Internship at Innovative Solutions Tech",
    description: "Developed several front-end features for an e-commerce platform using React and TypeScript."
  },
  {
    year: "2021",
    title: "Freelance Web Developer",
    description: "Designed and deployed websites for local businesses, focusing on mobile-first design and SEO optimization."
  }
];

const TimelineEntry = ({ item, isActive, onClick }) => {
  const props = useSpring({
    to: {
      height: isActive ? 200 : 100,
      opacity: isActive ? 1 : 0.6,
      transform: isActive ? 'scale(1.05)' : 'scale(1)'
    },
    from: {
      height: 100,
      opacity: 0.6,
      transform: 'scale(1)'
    },
    config: { duration: 400 },
  });

  return (
    <animated.div style={props} className="timeline-entry" onClick={onClick}>
      <h3>{item.year}</h3>
      <p>{item.title}</p>
      <p>{item.description}</p>
    </animated.div>
  );
};

const Timeline = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="timeline">
      <h2>My Journey</h2>
      {timelineData.map((item, index) => (
        <TimelineEntry
          key={index}
          item={item}
          isActive={index === selected}
          onClick={() => setSelected(index === selected ? null : index)}
        />
      ))}
    </div>
  );
};

export default Timeline;