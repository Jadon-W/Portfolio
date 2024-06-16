import React, { useState, useMemo, useCallback, useEffect, Profiler, Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';
import '../HomeHero.css';
import InteractiveStarField from './InteractiveStarField';

const AboutMe = lazy(() => import('./AboutMe/AboutMe'));
const Cube2Projects = lazy(() => import('./Cube2/Cube2Projects'));
const Cube3 = lazy(() => import('./Cube3/Cube3'));
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

const Project = React.memo(({ position, title, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { scale, color, emissive } = useSpring({
    scale: isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1],
    color: isHovered ? '#ffffff' : '#aaaaaa',
    emissive: isHovered ? '#88ccff' : '#222222',
    config: { duration: 200 }
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
});

const HomeHero = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [contextLost, setContextLost] = useState(false);

  const handleProjectClick = useCallback((title) => {
    setSelectedProject(title);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const projects = useMemo(() => ([
    { position: [-150, 0, 0], title: 'About Me' },
    { position: [0, 0, 0], title: 'All Projects' },
    { position: [150, 0, 0], title: 'Technical Showcase' }
  ]), []);

  const handleContextLost = useCallback((event) => {
    event.preventDefault();
    setContextLost(true);
  }, []);

  const handleContextRestored = useCallback(() => {
    setContextLost(false);
  }, []);

  useEffect(() => {
    window.addEventListener('webglcontextlost', handleContextLost);
    window.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [handleContextLost, handleContextRestored]);

  const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    console.log(`${id} [${phase}] - Actual Duration: ${actualDuration}, Base Duration: ${baseDuration}`);
  };

  return (
    <div className="hero">
      <Profiler id="HomeHero" onRender={onRenderCallback}>
        <Suspense fallback={<div>Loading...</div>}>
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
              {!contextLost ? (
                <Canvas camera={{ fov: 75, position: [0, 0, 300] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  {projects.map((project) => (
                    <Project
                      key={project.title}
                      position={project.position}
                      title={project.title}
                      onClick={handleProjectClick}
                    />
                  ))}
                  <OrbitControls />
                  <InteractiveStarField />
                </Canvas>
              ) : (
                <div className="context-lost">
                  WebGL Context Lost. Please refresh the page.
                </div>
              )}
            </>
          )}
        </Suspense>
      </Profiler>
    </div>
  );
};

export default HomeHero;