'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    let ctxRevert: (() => void) | null = null;

    const init = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const mm = gsap.matchMedia();

          // ── Reduced motion: no animations ──────────────────────────
          mm.add('(prefers-reduced-motion: reduce)', () => {
            // Ensure elements are visible if user prefers reduced motion
            document.querySelectorAll<HTMLElement>('.gsap-fade, .gsap-stagger > *').forEach(
              (el) => { el.style.opacity = '1'; el.style.transform = 'none'; }
            );
          });

          // ── Mobile animations (lighter) ─────────────────────────────
          mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => {
            setupFade({ y: 22, dur: 0.55, ease: 'power2.out' });
            setupStagger({ y: 18, dur: 0.48, stagger: 0.065, ease: 'power2.out' });
          });

          // ── Desktop animations ──────────────────────────────────────
          mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
            setupFade({ y: 40, dur: 0.75, ease: 'power2.out' });
            setupStagger({ y: 28, dur: 0.65, stagger: 0.1, ease: 'power2.out' });
          });

          // ── fade-up for individual elements ─────────────────────────
          function setupFade({ y, dur, ease }: { y: number; dur: number; ease: string }) {
            document.querySelectorAll<HTMLElement>('.gsap-fade').forEach((el) => {
              const delay = parseFloat(el.dataset.gsapDelay ?? '0');
              gsap.fromTo(
                el,
                { opacity: 0, y },
                {
                  opacity: 1,
                  y: 0,
                  duration: dur,
                  delay,
                  ease,
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                  },
                }
              );
            });
          }

          // ── stagger for grid/list containers ────────────────────────
          function setupStagger({
            y, dur, stagger, ease,
          }: { y: number; dur: number; stagger: number; ease: string }) {
            document.querySelectorAll<HTMLElement>('.gsap-stagger').forEach((container) => {
              const kids = Array.from(container.children) as HTMLElement[];
              if (!kids.length) return;
              gsap.fromTo(
                kids,
                { opacity: 0, y },
                {
                  opacity: 1,
                  y: 0,
                  duration: dur,
                  ease,
                  stagger,
                  scrollTrigger: {
                    trigger: container,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                  },
                }
              );
            });
          }
        });

        ctxRevert = () => ctx.revert();
      } catch {
        // GSAP failed to load — degrade gracefully, keep elements visible
      }
    };

    init();
    return () => ctxRevert?.();
  }, [pathname]); // Re-run on every page navigation

  return null;
}
