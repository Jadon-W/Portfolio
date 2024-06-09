import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const InteractiveBackground = () => {
  const ref = useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const moveX = (clientX - window.innerWidth / 2) / 30; 
      const moveY = (clientY - window.innerHeight / 2) / 30;
      ref.current.position.x = moveX;
      ref.current.position.y = -moveY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[50, 32, 32]} />
      <meshStandardMaterial color="#888888" transparent opacity={0.1} />
    </mesh>
  );
};

export default InteractiveBackground;
