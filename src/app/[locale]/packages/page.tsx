import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import SectionHeader from '@/components/shared/SectionHeader';
import PackagesCarousel from '@/components/shared/PackagesCarousel';

export default function PackagesPage() {
  const t = useTranslations('packages');
  const locale = useLocale();

  const socialPkgs = t.raw('social') as Array<{
    id: string; name: string; price: string; highlight: boolean; points: string[];
  }>;
  const exhibitionPkgs = t.raw('exhibition') as Array<{
    id: string; name: string; price: string; highlight: boolean; duration: string; points: string[];
  }>;

  const phone = '963968653725';

  return (
    <>
      <PageHero
        label={t('hero.label')}
        title={t('hero.title')}
        text={t('hero.text')}
      />

      <div className="container-main">
        <p className="text-xs text-center py-3 mb-2" style={{ color: 'var(--color-text-muted)' }}>
          {t('priceNote')}
        </p>
      </div>

      {/* ── Social Media Packages ─────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeader
            title={t('socialTitle')}
            subtitle={t('socialSubtitle')}
            centered
          />
          <PackagesCarousel
            packages={socialPkgs}
            getPackageLabel={t('requestBtn')}
            whatsappPhone={phone}
          />
        </div>
      </section>

      {/* ── Exhibition Packages ───────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-bg-section)' }}>
        <div className="container-main">
          <SectionHeader
            title={t('exhibitionTitle')}
            subtitle={t('exhibitionSubtitle')}
            centered
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {exhibitionPkgs.map((pkg) => (
              <div
                key={pkg.id}
                className="glass-card p-6 flex flex-col transition-all duration-300 hover:-translate-y-2"
                style={
                  pkg.highlight
                    ? { border: '1px solid var(--color-primary)', boxShadow: 'var(--shadow-glow)' }
                    : {}
                }
              >
                {pkg.highlight && (
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full mb-4 self-start"
                    style={{ background: 'var(--color-primary)', color: '#fff' }}
                  >
                    ★ {locale === 'ar' ? 'الأفضل' : 'Best Value'}
                  </span>
                )}
                <h3 className="text-xl font-black mb-1" style={{ color: 'var(--color-white)' }}>
                  {pkg.name}
                </h3>
                <p className="text-4xl font-black mb-1 gradient-text">${pkg.price}</p>
                <p className="text-xs mb-4 px-2 py-1 rounded self-start"
                  style={{ background: 'rgba(73,196,216,0.15)', color: 'var(--color-secondary)' }}>
                  ⏱ {pkg.duration}
                </p>
                <ul className="space-y-2 flex-1 mb-6">
                  {pkg.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      <span style={{ color: 'var(--color-secondary)', flexShrink: 0 }}>✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${phone}?text=${encodeURIComponent(pkg.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-2.5 text-center justify-center"
                >
                  {t('requestBtn')}
                </a>
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
