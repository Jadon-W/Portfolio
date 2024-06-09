import React, { useState, useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const particleInterval = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      clearInterval(particleInterval.current); // Clear previous interval if any
      particleInterval.current = setInterval(() => {
        createParticles(position.x, position.y);
      }, 100); // Continuously create particles every 100ms while mouse is down
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      clearInterval(particleInterval.current);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      clearInterval(particleInterval.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position]);

  const createParticles = (x, y) => {
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      document.body.appendChild(particle);

      const angle = Math.random() * 2 * Math.PI;
      const radius = 20 + Math.random() * 20;
      const particleX = x + radius * Math.cos(angle);
      const particleY = y + radius * Math.sin(angle);

      particle.style.left = `${particleX}px`;
      particle.style.top = `${particleY}px`;
      particle.style.position = 'fixed';
      particle.style.width = '5px';
      particle.style.height = '5px';
      particle.style.borderRadius = '50%';
      particle.style.background = 'rgba(255, 255, 255, 0.8)';
      particle.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.9)';
      particle.style.transform = 'translate(-50%, -50%) scale(1)';
      particle.style.transition = 'all 0.5s ease-out';
      particle.style.opacity = 1;

      setTimeout(() => {
        particle.style.opacity = 0;
        particle.style.transform = 'translate(-50%, -50%) scale(0)';
      }, 500); // Fade and shrink particles quickly

      setTimeout(() => {
        particle.remove();
      }, 600); // Remove after fading out
    }
  };

  return (
    <div
      className={`custom-cursor ${isClicking ? 'clicking' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    ></div>
  );
};

export default CustomCursor;