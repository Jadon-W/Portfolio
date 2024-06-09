import React, { useRef, useEffect } from 'react';
import './WelcomeComponent.css';

const WelcomeComponent = ({ onNavigate }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        const waves = [];
        const waveHeight = 20;
        const speed = 0.02;
        let cloudOffset = 0;
        let clouds = []; // Store cloud details dynamically
        let lastPulseTime = Date.now();
        let sunPulse = 80; // Default sun size
        let isPulsing = false;
        let flapAngle = 10; // Initial flap angle
        let flapIncrement = 0.2; // Angle increment per frame
        let maxFlapAngle = 20; // Maximum angle for wings
        let minFlapAngle = 5; // Minimum angle for wings
        let flapDirection = 1; // Direction of flap: 1 for increasing angle, -1 for decreasing


        class Wave {
            constructor(y, color) {
                this.y = y;
                this.x = 0;
                this.color = color;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(0, h);
                for (let i = 0; i < w; i++) {
                    this.y += Math.sin(i * 0.05 + this.x) * 0.5;
                    ctx.lineTo(i, this.y);
                }
                ctx.lineTo(w, h);
                ctx.fill();
                this.x += speed;
            }
        }

        function initClouds() {
            // Initial cloud setup with random positioning and sizes
            for (let i = 0; i < 5; i++) {
                clouds.push({
                    x: Math.random() * w,
                    y: Math.random() * (h * 0.3),
                    size: 40 + Math.random() * 30
                });
            }
        }
        function drawSun() {
            const now = Date.now();
            if (now - lastPulseTime >= 20000) { // Trigger pulse every 20 seconds
                isPulsing = true;
                lastPulseTime = now;
            }

            if (isPulsing) {
                sunPulse += .1; // Increase the sun size quickly for the pulse
                if (sunPulse >= 97) { // Maximum size reached
                    isPulsing = false; // Stop pulsing
                }
            } else {
                if (sunPulse > 80) { // Gradually return to normal size
                    sunPulse -= .08;
                }
            }

            // Draw the sun
            ctx.fillStyle = 'gold';
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'yellow';
            ctx.beginPath();
            ctx.arc(w * 0.8, h * 0.2, sunPulse, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        function drawBackground() {
            ctx.clearRect(0, 0, w, h);  // Clear the canvas first

            // Drawing the sky
            const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.5);
            skyGradient.addColorStop(0, '#87CEEB');
            skyGradient.addColorStop(1, '#B0E0E6');
            ctx.fillStyle = skyGradient;
            ctx.fillRect(0, 0, w, h);



            
            drawSun();
            drawClouds();
            drawBirds();
        }

         function drawClouds() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            // Adjust cloudPositions to ensure clouds exit completely before wrapping
            const cloudPositions = [
                { x: cloudOffset + w * 0.1, y: h * 0.1 },
                { x: cloudOffset + w * 0.35, y: h * 0.15 },
                { x: cloudOffset + w * 0.6, y: h * 0.2 },
                { x: cloudOffset + w * 0.85, y: h * 0.1 },
            ];
        
            cloudPositions.forEach(pos => {
                const effectiveX = pos.x % (w + 200); // Include cloud width in wrap-around calculation
                if (effectiveX < w) { // Only draw if cloud is within the visible canvas width
                    ctx.beginPath();
                    ctx.arc(effectiveX, pos.y, 40, Math.PI * 0.5, Math.PI * 1.5);
                    ctx.arc(effectiveX + 60, pos.y - 20, 70, Math.PI * 1, Math.PI * 2);
                    ctx.arc(effectiveX + 130, pos.y, 40, Math.PI * 1.5, Math.PI * 0.5);
                    ctx.fill();
                }
            });
            cloudOffset += 0.1; // Slowly move clouds to the right
            if (cloudOffset > w + 200) cloudOffset = 0; // Reset cloud position after moving off screen
        }
        

        function drawBirds() {
            ctx.fillStyle = 'white'; // Ensure birds are white
            const birdPositions = [
                { x: w * 0.2, y: h * 0.3 },
                { x: w * 0.3, y: h * 0.35 },
                { x: w * 0.5, y: h * 0.25 },
                { x: w * 0.7, y: h * 0.3 }
            ];
            birdPositions.forEach(pos => {
                ctx.beginPath();
                // Draw body (static)
                ctx.moveTo(pos.x, pos.y); // Middle of the 'M'
        
                // Left wing
                ctx.lineTo(pos.x - 15 * Math.cos(Math.PI / 180 * flapAngle), pos.y - 15 * Math.sin(Math.PI / 180 * flapAngle));
        
                // Right wing
                ctx.moveTo(pos.x, pos.y); // Return to middle
                ctx.lineTo(pos.x + 15 * Math.cos(Math.PI / 180 * flapAngle), pos.y - 15 * Math.sin(Math.PI / 180 * flapAngle));
        
                ctx.stroke();
            });
        }

        function updateFlap() {
            flapAngle += flapIncrement * flapDirection;
            if (flapAngle >= maxFlapAngle || flapAngle <= minFlapAngle) {
                flapDirection *= -1; // Change the direction of the flap
            }
        }

        function init() {
            initClouds();
            waves.push(new Wave(h * 0.6, 'rgba(106, 160, 203, 0.5)'));
            waves.push(new Wave(h * 0.6 + waveHeight, 'rgba(87, 111, 114, 0.5)'));
            requestAnimationFrame(animate);
        }

        function animate() {
            drawBackground();
            updateFlap(); // Update the wing flap height
            drawBirds();
            waves.forEach(wave => wave.draw());
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            clouds = []; // Reset clouds to prevent clustering on resize
            init();
        });

        init();
    }, []);

    return (
        <div className="welcome-section">
            <canvas ref={canvasRef} className="background-canvas"></canvas>
            <h1>Welcome to My World!</h1>
            <p>I'm Jadon Webb, a passionate developer diving deep into the world of technology.</p>
            <div className="navigation-buttons">
                <button onClick={() => onNavigate(1)}>Tech Journey</button>
                <button onClick={() => onNavigate(3)}>Major Projects</button>
                <button onClick={() => onNavigate(4)}>Personal Insights</button>
            </div>
        </div>
    );
};

export default WelcomeComponent;