import * as THREE from 'three';


const GlowShaderMaterial = {
  uniforms: {
    color: { value: new THREE.Color(0xffffff) }
  },
  vertexShader: `
    uniform float size;
    varying vec3 vColor;

    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    varying vec3 vColor;
    void main() {
      float intensity = 1.0 - distance(gl_PointCoord, vec2(0.5, 0.5));
      gl_FragColor = vec4(color * vColor * intensity, 1.0);
    }
  `
};

export { GlowShaderMaterial };