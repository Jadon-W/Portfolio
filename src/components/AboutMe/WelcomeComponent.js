import React, { useRef, useEffect, useCallback } from 'react';
import './WelcomeComponent.css';
import InteractiveStart from './InteractiveStart';

const WelcomeComponent = ({ onNavigate }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth * window.devicePixelRatio;
    let h = canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const waves = [];
    const speed = 0.02;
    let cloudOffset = 0;
    let clouds = [];
    let lastPulseTime = Date.now();
    let sunPulse = 80;
    let isPulsing = false;
    let flapAngle = 10;
    const flapIncrement = 0.2;
    const maxFlapAngle = 20;
    const minFlapAngle = 5;
    let flapDirection = 1;

    class Wave {
      constructor(y, color, amplitude, frequency, phaseShift = 0) {
        this.y = y;
        this.x = 0;
        this.color = color;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.phaseShift = phaseShift;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let i = 0; i < w; i++) {
          ctx.lineTo(i, this.y + Math.sin(i * this.frequency + this.x + this.phaseShift) * this.amplitude);
        }
        ctx.lineTo(w, h);
        ctx.fill();
        this.x += speed;
      }
    }

    const initClouds = () => {
      clouds = [];
      for (let i = 0; i < 5; i++) {
        clouds.push({
          x: Math.random() * w,
          y: Math.random() * (h * 0.3),
          size: 40 + Math.random() * 30
        });
      }
    };

    const drawSun = () => {
      const now = Date.now();
      if (now - lastPulseTime >= 20000) {
        isPulsing = true;
        lastPulseTime = now;
      }

      if (isPulsing) {
        sunPulse += 0.1;
        if (sunPulse >= 97) {
          isPulsing = false;
        }
      } else {
        if (sunPulse > 80) {
          sunPulse -= 0.08;
        }
      }

      ctx.fillStyle = 'gold';
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'yellow';
      ctx.beginPath();
      ctx.arc(w * 0.8, h * 0.2, sunPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, w, h);
      const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.5);
      skyGradient.addColorStop(0, '#87CEEB');
      skyGradient.addColorStop(1, '#B0E0E6');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, w, h);
      drawSun();
      drawClouds();
      drawBirds();
    };

    const drawClouds = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      const cloudPositions = [
        { x: cloudOffset + w * 0.1, y: h * 0.1 },
        { x: cloudOffset + w * 0.35, y: h * 0.15 },
        { x: cloudOffset + w * 0.6, y: h * 0.2 },
        { x: cloudOffset + w * 0.85, y: h * 0.1 },
      ];

      cloudPositions.forEach(pos => {
        const effectiveX = pos.x % (w + 200);
        if (effectiveX < w) {
          ctx.beginPath();
          ctx.arc(effectiveX, pos.y, 40, Math.PI * 0.5, Math.PI * 1.5);
          ctx.arc(effectiveX + 60, pos.y - 20, 70, Math.PI * 1, Math.PI * 2);
          ctx.arc(effectiveX + 130, pos.y, 40, Math.PI * 1.5, Math.PI * 0.5);
          ctx.fill();
        }
      });
      cloudOffset += 0.1;
      if (cloudOffset > w + 200) cloudOffset = 0;
    };

    const drawBirds = () => {
      ctx.fillStyle = 'white';
      const birdPositions = [
        { x: w * 0.2, y: h * 0.3 },
        { x: w * 0.3, y: h * 0.35 },
        { x: w * 0.5, y: h * 0.25 },
        { x: w * 0.7, y: h * 0.3 }
      ];
      birdPositions.forEach(pos => {
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x - 15 * Math.cos(Math.PI / 180 * flapAngle), pos.y - 15 * Math.sin(Math.PI / 180 * flapAngle));
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x + 15 * Math.cos(Math.PI / 180 * flapAngle), pos.y - 15 * Math.sin(Math.PI / 180 * flapAngle));
        ctx.stroke();
      });
    };

    const updateFlap = () => {
      flapAngle += flapIncrement * flapDirection;
      if (flapAngle >= maxFlapAngle || flapAngle <= minFlapAngle) {
        flapDirection *= -1;
      }
    };

    const init = () => {
      initClouds();
      waves.push(new Wave(h * 0.6, 'rgba(106, 160, 203, 0.5)', 10, 0.05));
      waves.push(new Wave(h * 0.6 + 20, 'rgba(87, 111, 114, 0.5)', 15, 0.04, Math.PI / 2));
      waves.push(new Wave(h * 0.6 + 40, 'rgba(106, 160, 203, 0.4)', 8, 0.06, Math.PI));
      animate();
    };

    const animate = () => {
      drawBackground();
      updateFlap();
      waves.forEach(wave => wave.draw());
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth * window.devicePixelRatio;
      h = canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initClouds();
      waves.length = 0;
      init();
    };

    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    window.addEventListener('resize', debounce(handleResize, 100));

    init();

    return () => {
      window.removeEventListener('resize', debounce(handleResize, 100));
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="welcome-section">
      <canvas ref={canvasRef} className="background-canvas"></canvas>
      <div className="welcome-content">
        <h1>Welcome Everyone!</h1>
        <p>My name is Jadon Webb, and this section is all about me!</p>
        <InteractiveStart onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default WelcomeComponent;