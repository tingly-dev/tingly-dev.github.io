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
  background: #f8fafc;
`;

const PatternCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface LaserBeam {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  color: string;
  width: number;
  opacity: number;
}

const laserColors = [
  'rgba(37, 99, 235, 0.6)',    // Blue
  'rgba(99, 102, 241, 0.5)',   // Indigo
  'rgba(168, 85, 247, 0.4)',   // Purple
  'rgba(236, 72, 153, 0.35)',  // Pink
  'rgba(14, 165, 233, 0.4)',   // Cyan
  'rgba(34, 197, 94, 0.3)',    // Green
  'rgba(251, 146, 60, 0.25)',  // Orange
];

const LightPatternBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lasersRef = useRef<LaserBeam[]>([]);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.scale(dpr, dpr);
      initLasers();
    };

    const initLasers = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const lasers: LaserBeam[] = [];

      // Create multiple laser beams
      for (let i = 0; i < 25; i++) {
        lasers.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: 100 + Math.random() * 300,
          angle: Math.random() * Math.PI * 2,
          speed: 2 + Math.random() * 6,
          color: laserColors[Math.floor(Math.random() * laserColors.length)],
          width: 1 + Math.random() * 2.5,
          opacity: 0.1 + Math.random() * 0.4,
        });
      }

      lasersRef.current = lasers;
    };

    const drawLaser = (laser: LaserBeam) => {
      const { x, y, length, angle, color, width, opacity } = laser;

      // Calculate end point
      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      // Create gradient for the laser beam
      const gradient = ctx.createLinearGradient(x, y, endX, endY);
      gradient.addColorStop(0, color.replace(/[\d.]+\)$/g, '0)'));
      gradient.addColorStop(0.3, color.replace(/[\d.]+\)$/g, String(opacity)));
      gradient.addColorStop(0.7, color.replace(/[\d.]+\)$/g, String(opacity * 0.8)));
      gradient.addColorStop(1, color.replace(/[\d.]+\)$/g, '0)'));

      // Draw the main beam
      ctx.strokeStyle = gradient;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Draw glow effect
      ctx.strokeStyle = color.replace(/[\d.]+\)$/g, String(opacity * 0.3));
      ctx.lineWidth = width * 4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Draw bright center
      ctx.strokeStyle = color.replace(/[\d.]+\)$/g, String(opacity * 1.5));
      ctx.lineWidth = width * 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    };

    const animate = () => {
      // Clear with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(248, 250, 252, 0.15)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update and draw all lasers
      for (const laser of lasersRef.current) {
        // Move laser
        laser.x += Math.cos(laser.angle) * laser.speed;
        laser.y += Math.sin(laser.angle) * laser.speed;

        // Wrap around screen
        if (laser.x < -laser.length) laser.x = width + laser.length;
        if (laser.x > width + laser.length) laser.x = -laser.length;
        if (laser.y < -laser.length) laser.y = height + laser.length;
        if (laser.y > height + laser.length) laser.y = -laser.length;

        // Occasionally change direction slightly
        if (Math.random() < 0.005) {
          laser.angle += (Math.random() - 0.5) * 0.3;
        }

        // Pulse opacity
        laser.opacity = 0.15 + Math.sin(Date.now() * 0.001 + laser.x) * 0.1;

        drawLaser(laser);
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
