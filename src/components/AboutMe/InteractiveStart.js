import React, { useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import './InteractiveStart.css';

const InteractiveStart = ({ onNavigate }) => {
  const [active, setActive] = useState(null);
  
  const animationProps = useSpring({
    opacity: active ? 0.5 : 1,
    transform: active ? 'scale(0.95)' : 'scale(1)',
    config: { tension: 300, friction: 10 }
  });

  const handleNavigate = useCallback((sectionIndex) => {
    setActive(sectionIndex);
    setTimeout(() => {
      onNavigate(sectionIndex);
      setActive(null);
    }, 300);
  }, [onNavigate]);

  return (
    <animated.div className="interactive-start" style={animationProps}>
      <button onClick={() => handleNavigate(1)}>Tech Journey</button>
      <button onClick={() => handleNavigate(2)}>Major Projects</button>
      <button onClick={() => handleNavigate(3)}>Personal Insights</button>
    </animated.div>
  );
};

export default InteractiveStart;