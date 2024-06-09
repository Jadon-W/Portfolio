import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import './PersonalIntro.css';


const PersonalIntro = () => {
  const animationProps = useSpring({
    to: { opacity: 1, transform: 'translateY(0)' },
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { duration: 1000 }
  });

  return (
    <div className="personal-intro">
      <h1>Jadon Webb - Aspiring Technologist</h1>
      <animated.div style={animationProps}>
        <p>As a Computer Engineering student at Michigan State University, I am deeply engaged with AI, full-stack development, and UI/UX design. My projects aim to merge functionality with user-centric design.</p>
        <ul>
          <li>Winner of MSU Hackathon 2023, developed an AI-driven educational tool.</li>
          <li>Contributor to open-source projects focused on accessibility and sustainability.</li>
          <li>Enthusiastic about using technology to improve digital inclusivity.</li>
        </ul>
      </animated.div>
    </div>
  );
};

export default PersonalIntro;