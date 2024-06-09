import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';

const ProjectNode = ({ position, color, title, description, onNodeClick }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
        onNodeClick(title);
    };

    return (
        <mesh position={position} onClick={toggleVisibility}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color={color} />
            <Html distanceFactor={10}>
                <div className="node-info" style={{ display: visible ? 'block' : 'none' }}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </Html>
        </mesh>
    );
};

const SkillsShowcase3D = () => {
    const handleNodeClick = (title) => {
        console.log(`Node clicked: ${title}`); // log to the console
    };

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />
                <ProjectNode
                    position={[-2, 0, 0]}
                    color="red"
                    title="Project 1"
                    description="A detailed description of Project 1."
                    onNodeClick={handleNodeClick}
                />
                <ProjectNode
                    position={[2, 0, 0]}
                    color="blue"
                    title="Project 2"
                    description="A detailed description of Project 2."
                    onNodeClick={handleNodeClick}
                />
                <ProjectNode
                    position={[0, 2, 0]}
                    color="green"
                    title="Technology Node"
                    description="Details about a technology used."
                    onNodeClick={handleNodeClick}
                />
            </Canvas>
        </div>
    );
};

export default SkillsShowcase3D;