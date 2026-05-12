'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';

export default function PortfolioPage() {
  const t = useTranslations('portfolio');
  const filters = t.raw('filters') as Record<string, string>;
  const items = t.raw('items') as Array<{
    id: string; title: string; type: string; desc: string; image: string;
  }>;

  const filterKeys = Object.keys(filters);
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? items : items.filter((i) => i.type === active);

  return (
    <>
      <PageHero
        label={t('hero.label')}
        title={t('hero.title')}
        text={t('hero.text')}
        image="/images/effect-media/man-is-holding-camera-is-set-up-shooting-photographer-looks-into-camera-s-viewfinder-takes-pictures.jpg"
      />

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <section className="py-8" style={{ background: 'var(--color-bg-section)' }}>
        <div className="container-main flex flex-wrap gap-3 justify-center">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200"
              style={
                active === key
                  ? { background: 'var(--color-primary)', color: '#fff' }
                  : { background: 'rgba(40,158,217,0.1)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }
              }
            >
              {filters[key]}
            </button>
          ))}
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="glass-card overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(40,158,217,0.2)' }} />
                  <span
                    className="absolute top-3 start-3 text-xs px-3 py-1 rounded-full font-bold"
                    style={{ background: 'rgba(0,0,76,0.85)', color: 'var(--color-secondary)', border: '1px solid rgba(73,196,216,0.3)' }}
                  >
                    {filters[item.type] ?? item.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black mb-2" style={{ color: 'var(--color-white)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-padding text-center"
        style={{ background: 'linear-gradient(135deg, #000060, #00004C)' }}>
        <div className="container-main">
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--color-white)' }}>
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-8 max-w-lg mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            {t('cta.subtitle')}
          </p>
          <Link href="/contact" className="btn-primary px-10 py-4 text-base">
            {t('cta.btn')}
          </Link>
        </div>
      </section>
    </>
  );
}
