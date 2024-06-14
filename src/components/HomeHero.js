import React, { useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';
import '../HomeHero.css';
import InteractiveStarField from './InteractiveStarField';
import AboutMe from './AboutMe/AboutMe';
import Cube2Projects from './Cube2/Cube2Projects';
import Cube3 from './Cube3/Cube3';

const edgeGlowShader = {
  vertexShader: `
  varying vec3 vNormal;
  void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  fragmentShader: `
  varying vec3 vNormal;
  void main() {
      float intensity = pow(0.5 - dot(vNormal, vec3(0, 0, 1)), 4.0);
      gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0) * intensity;
  }
  `
};

const Project = ({ position, title, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { scale, color, emissive } = useSpring({
    scale: isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1],
    color: isHovered ? '#ffffff' : '#aaaaaa',
    emissive: isHovered ? '#88ccff' : '#222222',
    config: { duration: 200 }
  });

  useFrame(() => {
    if (isHovered) {
      const time = performance.now() / 1000;
      scale.start({
        to: [
          1 + 0.1 * Math.sin(time * 10),
          1 + 0.1 * Math.sin(time * 10),
          1 + 0.1 * Math.sin(time * 10)
        ]
      });
    }
  });

  return (
    <a.mesh
      position={position}
      scale={scale}
      onClick={() => onClick(title)}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry args={[50, 50, 50]} />
      <a.meshStandardMaterial
        attach="material"
        color={color}
        emissive={emissive}
        roughness={0.5}
        metalness={0.1}
        transparent
        opacity={0.6}
      />
      <Html scaleFactor={10}>
        <div className="project-tooltip">{title}</div>
      </Html>
    </a.mesh>
  );
};

const HomeHero = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = useCallback((title) => {
    setSelectedProject(title);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="hero">
      {selectedProject === 'About Me' ? (
        <>
          <AboutMe />
          <button className="back-button" onClick={handleBack}>Back</button>
        </>
      ) : selectedProject === 'All Projects' ? (
        <>
          <Cube2Projects onBack={handleBack} />
        </>
      ) : selectedProject === 'Technical Showcase' ? (
        <>
          <Cube3 onBack={handleBack} />
          <button className="back-button" onClick={handleBack}>Back</button>
        </>
      ) : (
        <>
          <Canvas camera={{ fov: 75, position: [0, 0, 300] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Project position={[-150, 0, 0]} title="About Me" onClick={handleProjectClick} />
            <Project position={[0, 0, 0]} title="All Projects" onClick={handleProjectClick} />
            <Project position={[150, 0, 0]} title="Technical Showcase" onClick={handleProjectClick} />
            <OrbitControls />
            <InteractiveStarField />
          </Canvas>
        </>
      )}
    </div>
  );
};

export default HomeHero;