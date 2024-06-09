import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const InteractiveTrail = ({ count = 30, color = '#ffffff' }) => {
    const mesh = useRef();
    const { mouse, viewport } = useThree();
    const particles = useMemo(() => {
        const temp = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        temp.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return temp;
    }, [count]);

    useFrame(() => {
        const positions = particles.getAttribute('position');
        const l = positions.array.length;
        // Move particles gradually back in the trail
        for (let i = l - 3; i > 2; i -= 3) {
            positions.array[i] = positions.array[i - 3] * 0.95;
            positions.array[i + 1] = positions.array[i - 2] * 0.95;
        }
        // Introduce a new particle at the mouse position with some damping
        positions.array[0] = mouse.x * viewport.width * 0.5;
        positions.array[1] = mouse.y * viewport.height * 0.5;
        positions.needsUpdate = true;
    });

    return (
        <points ref={mesh} geometry={particles}>
            <pointsMaterial size={1} sizeAttenuation color={color} transparent opacity={0.3} />
        </points>
    );
};

export default InteractiveTrail;