import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const Particles = ({ count }) => {
  const mesh = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) { 
      const x = (Math.random() - 0.5) * 1000;
      const y = (Math.random() - 0.5) * 1000;
      const z = (Math.random() - 0.5) * 1000;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.0005;
      mesh.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={5 * aspect} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
};

export default Particles;