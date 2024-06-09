import React from 'react';
import { animated, useSpring } from 'react-spring';

const FullScreenModal = ({ isOpen, close, children }) => {
  const style = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `translateY(0)` : `translateY(-100%)`,
    config: { tension: 210, friction: 20 }
  });

  return (
    <animated.div style={{ ...style, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', zIndex: 1000, display: isOpen ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        {children}
        <button onClick={close} style={{ position: 'absolute', top: 20, right: 20 }}>Close</button>
      </div>
    </animated.div>
  );
};

export default FullScreenModal;