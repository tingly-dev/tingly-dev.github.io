import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(180deg,
    rgba(37, 99, 235, 0.015) 0%,
    rgba(255, 255, 255, 1) 40%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const PatternCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface DottedCircle {
  x: number;
  y: number;
  radius: number;
  dotSpacing: number;
  dotSize: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

const LightPatternBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesRef = useRef<DottedCircle[]>([]);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.scale(dpr, dpr);
      initCircles();
    };

    // Initialize dotted circles
    const initCircles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const circles: DottedCircle[] = [];

      // Create several dotted circles of varying sizes
      const circleConfigs = [
        // Large background circles (subtle)
        { x: width * 0.15, y: height * 0.2, radius: Math.min(width, height) * 0.25, dotSpacing: 20, dotSize: 1.5, opacity: 0.08 },
        { x: width * 0.85, y: height * 0.3, radius: Math.min(width, height) * 0.2, dotSpacing: 18, dotSize: 1.5, opacity: 0.08 },
        { x: width * 0.5, y: height * 0.6, radius: Math.min(width, height) * 0.3, dotSpacing: 22, dotSize: 1.5, opacity: 0.06 },

        // Medium circles (more visible)
        { x: width * 0.25, y: height * 0.7, radius: Math.min(width, height) * 0.15, dotSpacing: 16, dotSize: 2, opacity: 0.1 },
        { x: width * 0.75, y: height * 0.75, radius: Math.min(width, height) * 0.12, dotSpacing: 15, dotSize: 2, opacity: 0.1 },
        { x: width * 0.6, y: height * 0.15, radius: Math.min(width, height) * 0.1, dotSpacing: 14, dotSize: 2, opacity: 0.12 },

        // Small accent circles
        { x: width * 0.1, y: height * 0.85, radius: Math.min(width, height) * 0.08, dotSpacing: 12, dotSize: 2, opacity: 0.12 },
        { x: width * 0.9, y: height * 0.6, radius: Math.min(width, height) * 0.07, dotSpacing: 12, dotSize: 2, opacity: 0.12 },
      ];

      for (const config of circleConfigs) {
        circles.push({
          ...config,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.003 + Math.random() * 0.003,
        });
      }

      circlesRef.current = circles;
    };

    // Draw a dotted circle
    const drawDottedCircle = (circle: DottedCircle, currentTime: number) => {
      const { x, y, radius, dotSpacing, dotSize, opacity, pulsePhase, pulseSpeed } = circle;

      // Calculate pulse effect
      const pulseFactor = Math.sin(pulsePhase + currentTime * pulseSpeed) * 0.5 + 0.5;
      const currentOpacity = opacity * (0.7 + pulseFactor * 0.3);

      // Purple color for dots
      ctx.fillStyle = `rgba(37, 99, 235, ${currentOpacity})`;

      // Draw dots along the circle circumference
      const circumference = 2 * Math.PI * radius;
      const numDots = Math.floor(circumference / dotSpacing);

      for (let i = 0; i < numDots; i++) {
        const angle = (i / numDots) * Math.PI * 2;
        const dotX = x + Math.cos(angle) * radius;
        const dotY = y + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw some filled circles with gradient for visual interest
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.3);
      gradient.addColorStop(0, `rgba(37, 99, 235, ${currentOpacity * 0.3})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${currentOpacity * 0.1})`);
      gradient.addColorStop(1, `rgba(37, 99, 235, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    let startTime = performance.now();
    const animate = () => {
      const currentTime = performance.now() - startTime;

      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw all circles
      for (const circle of circlesRef.current) {
        drawDottedCircle(circle, currentTime);
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();

    // Handle resize
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 250);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <BackgroundContainer>
      <PatternCanvas ref={canvasRef} />
    </BackgroundContainer>
  );
};

export default LightPatternBackground;
