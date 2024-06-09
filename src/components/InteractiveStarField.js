import React, { useRef, useMemo, useState } from 'react';
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
    gl_FragColor = vec4(vColor * alpha, alpha);
}`;

const InteractiveStarField = ({ count = 5000 }) => {
  const mesh = useRef();
  const [hoveredStar, setHoveredStar] = useState(null);
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

    // pronounced twinkling effect by modifying scale and brightness
    stars.attributes.scale.array.forEach((_, i) => {
      const scaleBase = 1 + 0.3 * Math.sin(elapsedTime * 3 + i * 0.5); //  varied scaling
      stars.attributes.scale.array[i] = scaleBase;
      const brightness = 0.5 + 0.5 * Math.sin(elapsedTime * 3 + i); // Brightness variation
      const originalColor = new THREE.Color().setHSL(i / count, 0.7, 0.5 + 0.5 * brightness);
      stars.attributes.color.setXYZ(i, originalColor.r, originalColor.g, originalColor.b);
    });
    stars.attributes.scale.needsUpdate = true;
    stars.attributes.color.needsUpdate = true;

    // Update raycaster for hover effects
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(mesh.current);
    if (intersects.length > 0) {
      const { index } = intersects[0];
      if (hoveredStar !== index) {
        setHoveredStar(index);
        stars.attributes.size.array[index] = 20; // Increase size for hover effect
        stars.attributes.color.setXYZ(index, 1, 1, 1); // Bright white on hover
        stars.attributes.size.needsUpdate = true;
        stars.attributes.color.needsUpdate = true;
      }
    } else if (hoveredStar !== null) {
      stars.attributes.size.array[hoveredStar] = 10 + Math.random() * 10; // Reset size
      const originalColor = new THREE.Color().setHSL(hoveredStar / count, 0.7, 0.5);
      stars.attributes.color.setXYZ(hoveredStar, originalColor.r, originalColor.g, originalColor.b);
      stars.attributes.size.needsUpdate = true;
      stars.attributes.color.needsUpdate = true;
      setHoveredStar(null);
    }
});

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
        transparent={true}
        vertexColors={true}
      />
    </points>
  );
};

export default InteractiveStarField;