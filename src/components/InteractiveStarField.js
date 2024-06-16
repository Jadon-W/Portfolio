import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
attribute float size;
attribute float scale;
varying vec3 vColor;

void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * scale * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}`;

const fragmentShader = `
varying vec3 vColor;

void main() {
  float distance = length(gl_PointCoord - vec2(0.5, 0.5));
  float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
  gl_FragColor = vec4(vColor, alpha * 0.9);
}`;

const InteractiveStarField = ({ count = 5000 }) => {
  const mesh = useRef();
  const { camera, raycaster, mouse } = useThree();

  const stars = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = new Float32Array(count);
    const scales = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions.push((Math.random() - 0.5) * 2000);
      positions.push((Math.random() - 0.5) * 2000);
      positions.push((Math.random() - 0.5) * 2000);
      color.setHSL(i / count, 0.7, 0.5 + Math.random() * 0.5);
      colors.push(color.r, color.g, color.b);
      sizes[i] = 10 + Math.random() * 10;
      scales[i] = 1;
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    return geometry;
  }, [count]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    const scaleArray = stars.attributes.scale.array;
    const colorArray = stars.attributes.color.array;

    for (let i = 0; i < count; i++) {
      scaleArray[i] = 1 + 0.3 * Math.sin(elapsedTime * 3 + i * 0.5);
      const brightness = 0.5 + 0.5 * Math.sin(elapsedTime * 3 + i);
      const color = new THREE.Color().setHSL(i / count, 0.7, 0.5 + 0.5 * brightness);
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    stars.attributes.scale.needsUpdate = true;
    stars.attributes.color.needsUpdate = true;
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(mesh.current);
      if (intersects.length > 0) {
        const { index } = intersects[0];
        stars.attributes.size.array[index] = 20;
        stars.attributes.color.setXYZ(index, 1, 1, 1);
        stars.attributes.size.needsUpdate = true;
        stars.attributes.color.needsUpdate = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (stars) {
        stars.dispose();
      }
    };
  }, [stars, raycaster, mouse, camera, count]);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [camera]);

  return (
    <points ref={mesh} geometry={stars}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          pointTexture: { value: new THREE.TextureLoader().load('/path_to_star_texture.png') }
        }}
        blending={THREE.AdditiveBlending}
        depthTest={false}
        transparent
        vertexColors
      />
    </points>
  );
};

export default InteractiveStarField;