'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export type CarouselPackage = {
  id: string;
  name: string;
  price: string;
  highlight: boolean;
  points: string[];
};

interface PackagesCarouselProps {
  packages: CarouselPackage[];
  getPackageLabel: string;
  viewAllLabel?: string;
  whatsappPhone?: string;
}

export default function PackagesCarousel({
  packages,
  getPackageLabel,
  viewAllLabel,
  whatsappPhone,
}: PackagesCarouselProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = packages.length;

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= n) return;
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setActive(idx);
  }, [n]);

  // Sync active dot when user drags/swipes manually
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) {
          const idx = Array.from(track.children).indexOf(top.target as HTMLElement);
          if (idx >= 0) setActive(idx);
        }
      },
      { root: track, threshold: 0.6 },
    );
    Array.from(track.children).forEach(c => io.observe(c));
    return () => io.disconnect();
  }, []);

  const popularLabel = isRtl ? 'الأكثر طلباً' : 'Most Popular';

  return (
    <div>
      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-2 no-scrollbar"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="glass-card p-6 flex flex-col flex-shrink-0 transition-all duration-300 hover:-translate-y-1"
            style={{
              scrollSnapAlign: 'center',
              width: 'clamp(260px, 78vw, 295px)',
              ...(pkg.highlight
                ? { border: '1px solid var(--color-primary)', boxShadow: 'var(--shadow-glow)' }
                : {}),
            }}
          >
            {pkg.highlight && (
              <span
                className="text-xs font-black px-3 py-1 rounded-full mb-4 self-start"
                style={{ background: 'var(--color-primary)', color: '#fff' }}
              >
                ★ {popularLabel}
              </span>
            )}
            <h3 className="text-lg font-black mb-1" style={{ color: 'var(--color-white)' }}>
              {pkg.name}
            </h3>
            <p className="text-3xl font-black mb-4 gradient-text">${pkg.price}</p>
            <ul className="space-y-2 flex-1 mb-5">
              {pkg.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  <span style={{ color: 'var(--color-secondary)', flexShrink: 0 }}>✓</span>
                  {pt}
                </li>
              ))}
            </ul>
            {whatsappPhone ? (
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(pkg.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-2.5 text-center justify-center"
              >
                {getPackageLabel}
              </a>
            ) : (
              <Link href="/packages" className="btn-primary text-sm py-2.5 text-center justify-center">
                {getPackageLabel}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {/* Left arrow — "prev" in LTR, "next" in RTL */}
        <button
          onClick={() => goTo(isRtl ? active + 1 : active - 1)}
          disabled={isRtl ? active >= n - 1 : active <= 0}
          aria-label={isRtl ? 'التالي' : 'Previous'}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
          style={{ background: 'rgba(40,158,217,0.15)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* Dot indicators */}
        {packages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Package ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              height: '8px',
              width: i === active ? '24px' : '8px',
              background: i === active ? 'var(--color-primary)' : 'rgba(40,158,217,0.25)',
            }}
          />
        ))}

        {/* Right arrow — "next" in LTR, "prev" in RTL */}
        <button
          onClick={() => goTo(isRtl ? active - 1 : active + 1)}
          disabled={isRtl ? active <= 0 : active >= n - 1}
          aria-label={isRtl ? 'السابق' : 'Next'}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
          style={{ background: 'rgba(40,158,217,0.15)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      {viewAllLabel && (
        <div className="text-center mt-8">
          <Link href="/packages" className="btn-outline">{viewAllLabel}</Link>
        </div>
      )}
    </div>
  );
}
