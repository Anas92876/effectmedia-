'use client';
import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; r: number; vx: number; vy: number; bvx: number; bvy: number };

const CONN_DIST    = 110;
const CONN_DIST_SQ = CONN_DIST * CONN_DIST;
const BUCKETS      = 6; // opacity buckets for batched line drawing

export default function HeroEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip entirely for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let mx = -9999, my = -9999;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    // Mobile gets far fewer particles to stay smooth
    const N = window.innerWidth < 768 ? 180 : 700;

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
    const onMove   = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    window.addEventListener('resize',    onResize, { passive: true });
    window.addEventListener('mousemove', onMove,   { passive: true });

    // Pre-allocate bucket arrays to avoid GC churn each frame
    const buckets: [number, number, number, number][][] = Array.from({ length: BUCKETS }, () => []);

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // ── Update physics + batch ALL dots into one fill() call ────
      ctx.beginPath();
      ctx.fillStyle = 'rgba(40,158,217,0.5)';
      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my;
        const d  = Math.hypot(dx, dy);
        if (d < 120 && d > 0) {
          const force = (1 - d / 120) * 0.6;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
        p.vx = p.vx * 0.96 + p.bvx * 0.04;
        p.vy = p.vy * 0.96 + p.bvy * 0.04;
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 5) { p.vx = (p.vx / spd) * 5; p.vy = (p.vy / spd) * 5; }
        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;
        // Add to shared path — single fill() at the end
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      ctx.fill();

      // ── Connecting lines: squared-dist cull + opacity buckets ───
      // Reset buckets without reallocating arrays
      for (let b = 0; b < BUCKETS; b++) buckets[b].length = 0;

      for (let i = 0; i < N - 1; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx  = pts[i].x - pts[j].x;
          const dy  = pts[i].y - pts[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CONN_DIST_SQ) {
            // sqrt only computed for pairs that will actually be drawn
            const d      = Math.sqrt(dSq);
            const bucket = Math.min(BUCKETS - 1, Math.floor((1 - d / CONN_DIST) * BUCKETS));
            buckets[bucket].push([pts[i].x, pts[i].y, pts[j].x, pts[j].y]);
          }
        }
      }

      // One stroke() call per bucket instead of one per line
      ctx.lineWidth = 0.5;
      for (let b = 0; b < BUCKETS; b++) {
        if (!buckets[b].length) continue;
        const opacity = ((b + 0.5) / BUCKETS) * 0.11;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(40,158,217,${opacity.toFixed(3)})`;
        for (const [x1, y1, x2, y2] of buckets[b]) {
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',    onResize);
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
