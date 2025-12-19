import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: #0a0a0fda;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetRadius: number;
  maxRadius: number;
  minRadius: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
  baseAlpha: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef<number>(0);
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isVisibleRef = useRef(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false,
      willReadFrequently: false,
      desynchronized: true
    });
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharper rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.scale(dpr, dpr);

      // Update offscreen canvas for background
      createBackgroundCanvas(width, height);
    };

    // Create offscreen canvas for static background
    const createBackgroundCanvas = (width: number, height: number) => {
      if (!bgCanvasRef.current) {
        bgCanvasRef.current = document.createElement('canvas');
        bgCtxRef.current = bgCanvasRef.current.getContext('2d', { alpha: false });
      }

      if (bgCanvasRef.current && bgCtxRef.current) {
        bgCanvasRef.current.width = width;
        bgCanvasRef.current.height = height;

        // Create gradient background once
        const bgGradient = bgCtxRef.current.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          Math.max(width, height) / 2
        );
        bgGradient.addColorStop(0, 'rgba(15, 15, 25, 0.9)');
        bgGradient.addColorStop(0.5, 'rgba(10, 10, 20, 0.95)');
        bgGradient.addColorStop(1, 'rgba(5, 5, 15, 1)');

        bgCtxRef.current.fillStyle = bgGradient;
        bgCtxRef.current.fillRect(0, 0, width, height);
      }
    };

    resizeCanvas();
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 250);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Enhanced color palette for better visibility
    const colors = [
      { r: 168, g: 85, b: 247 },   // Vibrant Violet
      { r: 99, g: 102, b: 241 },   // Bright Indigo
      { r: 59, g: 130, b: 246 },   // Strong Blue
      { r: 34, g: 211, b: 238 },   // Bright Cyan
      { r: 139, g: 92, b: 246 },   // Purple
      { r: 6, g: 182, b: 212 },    // Light Blue
    ];

    // Initialize particles with performance optimizations
    const initParticles = () => {
      const particleCount = Math.min(40, Math.floor((window.innerWidth * window.innerHeight) / 20000));
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const maxRadius = Math.random() * 300 + 200;
        const minRadius = Math.random() * 60 + 40;

        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: minRadius,
          targetRadius: minRadius,
          maxRadius,
          minRadius,
          color: `rgba(${color.r}, ${color.g}, ${color.b}`,
          baseAlpha: Math.random() * 0.15 + 0.15,
          pulseSpeed: Math.random() * 0.015 + 0.008,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      particlesRef.current = particles;
    };

    initParticles();

    // Mouse move handler with throttling
    let mouseUpdateTimeout: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseUpdateTimeout) return;
      mouseUpdateTimeout = requestAnimationFrame(() => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
        mouseUpdateTimeout = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Visibility API to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
      if (isVisibleRef.current && !animationIdRef.current) {
        lastTimeRef.current = performance.now();
        animate(lastTimeRef.current);
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionFactor = prefersReducedMotion ? 0.1 : 1;

    // Animation loop with performance optimizations
    const animate = (currentTime: number) => {
      if (!isVisibleRef.current) {
        animationIdRef.current = 0;
        return;
      }

      // Calculate delta time for frame-rate independent animation
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Skip frames if delta is too small to save resources
      if (deltaTime < 8) { // Slightly lower threshold for smoother animation
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaFactor = Math.min(deltaTime / 16.67, 2); // Normalize to 60fps

      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw cached background gradient
      if (bgCtxRef.current && bgCanvasRef.current) {
        ctx.globalAlpha = 0.98;
        ctx.drawImage(bgCanvasRef.current, 0, 0);
        ctx.globalAlpha = 1;
      }

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const particles = particlesRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Update pulse
        particle.pulsePhase += particle.pulseSpeed * deltaFactor * motionFactor;
        const pulseFactor = Math.sin(particle.pulsePhase) * 0.5 + 0.5;
        particle.targetRadius = particle.minRadius + (particle.maxRadius - particle.minRadius) * pulseFactor;

        // Smooth radius transitions
        particle.radius += (particle.targetRadius - particle.radius) * 0.1;

        // Update position with delta time
        particle.x += particle.vx * deltaFactor * motionFactor;
        particle.y += particle.vy * deltaFactor * motionFactor;

        // Mouse interaction with optimized distance calculation
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distSq = dx * dx + dy * dy;
        const effectRadiusSq = 350 * 350;

        if (distSq < effectRadiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (350 - dist) / 350 * 0.03;
          particle.vx += (dx / dist) * force * deltaFactor * 0.0015;
          particle.vy += (dy / dist) * force * deltaFactor * 0.0015;
        }

        // Apply damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundary collision
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;

        if (particle.x < particle.radius || particle.x > canvasWidth - particle.radius) {
          particle.vx = -particle.vx * 0.9;
          particle.x = particle.x < particle.radius ? particle.radius : canvasWidth - particle.radius;
        }
        if (particle.y < particle.radius || particle.y > canvasHeight - particle.radius) {
          particle.vy = -particle.vy * 0.9;
          particle.y = particle.y < particle.radius ? particle.radius : canvasHeight - particle.radius;
        }

        // Draw particle with cached gradient
        const alpha = particle.baseAlpha * (0.5 + pulseFactor * 0.5);

        // Use save/restore for performance
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius
        );

        gradient.addColorStop(0, particle.color + ', ' + alpha + ')');
        gradient.addColorStop(0.4, particle.color + ', ' + (alpha * 0.5) + ')');
        gradient.addColorStop(1, particle.color + ', 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          particle.x - particle.radius,
          particle.y - particle.radius,
          particle.radius * 2,
          particle.radius * 2
        );

        ctx.restore();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    lastTimeRef.current = performance.now();
    animate(lastTimeRef.current);
    setIsInitialized(true);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
      if (mouseUpdateTimeout) {
        cancelAnimationFrame(mouseUpdateTimeout);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (bgCanvasRef.current) {
        bgCanvasRef.current = null;
        bgCtxRef.current = null;
      }
    };
  }, []);

  return (
    <BackgroundContainer>
      <Canvas ref={canvasRef} />
      {isInitialized && (
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          canvas {
            animation: fadeIn 2s ease-out;
          }
        `}</style>
      )}
    </BackgroundContainer>
  );
};

export default AnimatedBackground;