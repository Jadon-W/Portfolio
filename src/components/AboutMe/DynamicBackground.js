import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const DynamicBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Guard against no ref being attached
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Geometry setup
        const geometry = new THREE.PlaneGeometry(5, 5, 10, 10);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Camera position
        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            plane.rotation.x += 0.01;
            plane.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup function
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            scene.remove(plane);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default DynamicBackground;