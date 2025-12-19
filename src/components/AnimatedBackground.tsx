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
  background: #0a0a0f;
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
  color: string;
  alpha: number;
  targetX: number;
  targetY: number;
  maxRadius: number;
  minRadius: number;
  pulseSpeed: number;
  pulsePhase: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color palette for blue-purple-cyan tech theme
    const colors = [
      { r: 139, g: 92, b: 246 },  // Purple
      { r: 59, g: 130, b: 246 },   // Blue
      { r: 34, g: 211, b: 238 },   // Cyan
      { r: 99, g: 102, b: 241 },   // Indigo
      { r: 168, g: 85, b: 247 },   // Violet
      { r: 6, g: 182, b: 212 },    // Light Blue
    ];

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 15000));
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const maxRadius = Math.random() * 150 + 100;
        const minRadius = Math.random() * 30 + 20;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * (maxRadius - minRadius) + minRadius,
          maxRadius,
          minRadius,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, `,
          alpha: Math.random() * 0.15 + 0.05,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
          pulseSpeed: Math.random() * 0.01 + 0.005,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      particlesRef.current = particles;
    };

    initParticles();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      bgGradient.addColorStop(0, 'rgba(15, 15, 25, 0.9)');
      bgGradient.addColorStop(0.5, 'rgba(10, 10, 20, 0.95)');
      bgGradient.addColorStop(1, 'rgba(5, 5, 15, 1)');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update pulse
        particle.pulsePhase += particle.pulseSpeed;
        const pulseFactor = Math.sin(particle.pulsePhase) * 0.5 + 0.5;
        particle.radius = particle.minRadius + (particle.maxRadius - particle.minRadius) * pulseFactor;

        // Slowly move particles
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Attraction to mouse with subtle effect
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.02;
          particle.vx += dx * force * 0.001;
          particle.vy += dy * force * 0.001;
        }

        // Apply damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx = -particle.vx;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy = -particle.vy;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius
        );

        const baseAlpha = particle.alpha * (0.5 + pulseFactor * 0.5);
        gradient.addColorStop(0, particle.color + baseAlpha + ')');
        gradient.addColorStop(0.4, particle.color + (baseAlpha * 0.5) + ')');
        gradient.addColorStop(1, particle.color + '0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          particle.x - particle.radius,
          particle.y - particle.radius,
          particle.radius * 2,
          particle.radius * 2
        );

        // Draw connections between nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const pdx = particle.x - otherParticle.x;
          const pdy = particle.y - otherParticle.y;
          const pDistance = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pDistance < particle.radius + otherParticle.radius) {
            const connectionGradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              otherParticle.x,
              otherParticle.y
            );

            const midX = (particle.x + otherParticle.x) / 2;
            const midY = (particle.y + otherParticle.y) / 2;
            const mouseToMidDistance = Math.sqrt(
              Math.pow(mouseRef.current.x - midX, 2) +
              Math.pow(mouseRef.current.y - midY, 2)
            );

            const connectionAlpha = Math.max(0, 0.15 - mouseToMidDistance / 2000) *
                                 Math.min(particle.alpha, otherParticle.alpha);

            connectionGradient.addColorStop(0, particle.color + connectionAlpha + ')');
            connectionGradient.addColorStop(0.5, particle.color + (connectionAlpha * 1.5) + ')');
            connectionGradient.addColorStop(1, otherParticle.color + connectionAlpha + ')');

            ctx.strokeStyle = connectionGradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    setIsInitialized(true);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
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