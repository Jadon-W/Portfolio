import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

const RotatingBox = () => {
    const meshRef = useRef();
    useFrame(() => (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01));

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
};

const Interactive3DScene = () => {
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <RotatingBox />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default Interactive3DScene;