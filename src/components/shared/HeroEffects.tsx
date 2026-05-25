'use client';
import { useEffect, useRef } from 'react';

type Particle = {
  x: number; y: number; r: number;
  vx: number; vy: number;
  bvx: number; bvy: number;
};

export default function HeroEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let mx = -9999, my = -9999;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const N = 700;
    const pts: Particle[] = Array.from({ length: N }, () => {
      const bvx = (Math.random() - 0.5) * 0.3;
      const bvy = (Math.random() - 0.5) * 0.3;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.4,
        vx: bvx, vy: bvy, bvx, bvy,
      };
    });

    const onResize = () => resize();
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my;
        const d = Math.hypot(dx, dy);
        if (d < 120 && d > 0) {
          const force = (1 - d / 120) * 0.6;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
        // Drift back toward base velocity
        p.vx = p.vx * 0.96 + p.bvx * 0.04;
        p.vy = p.vy * 0.96 + p.bvy * 0.04;
        // Speed cap
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 5) { p.vx = (p.vx / spd) * 5; p.vy = (p.vy / spd) * 5; }

        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(40,158,217,0.5)';
        ctx.fill();
      }

      // Connecting lines between nearby particles
      for (let i = 0; i < N - 1; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(40,158,217,${(1 - d / 110) * 0.11})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 2 }}
    />
  );
}
