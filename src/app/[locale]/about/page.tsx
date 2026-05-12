import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/shared/PageHero';
import SectionHeader from '@/components/shared/SectionHeader';

export default function AboutPage() {
  const t = useTranslations('about');

  const values = t.raw('values.list') as Array<{ title: string; icon: string }>;
  const diffPoints = t.raw('difference.points') as string[];

  return (
    <>
      <PageHero
        label={t('hero.label')}
        title={t('hero.title')}
        text={t('hero.text')}
        image="/images/effect-media/insightstudios-img24.jpg"
      />

      {/* ── Who We Are ───────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden">
              <Image
                src="/images/effect-media/man-filming-with-professional-camera (3).jpg"
                alt="Effect Media"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,76,0.6), transparent)' }} />
            </div>
            <div>
              <p className="section-label mb-2">{t('whoWeAre.label')}</p>
              <div className="divider-line" />
              <h2 className="text-3xl md:text-4xl font-black mt-3 mb-5" style={{ color: 'var(--color-white)' }}>
                {t('whoWeAre.title')}
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {t('whoWeAre.text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision ───────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-bg-section)' }}>
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-2">{t('vision.label')}</p>
              <div className="divider-line" />
              <h2 className="text-3xl md:text-4xl font-black mt-3 mb-5" style={{ color: 'var(--color-white)' }}>
                {t('vision.title')}
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {t('vision.text')}
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/effect-media/Jakob_Owens_2017-03-31_(Unsplash_ycExgCMRggc).jpg"
                alt="Our Vision"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,76,0.5)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeader
            label={t('values.label')}
            title={t('values.title')}
            centered
          />
          <div className="flex flex-wrap justify-center gap-5">
            {values.map((val, i) => (
              <div
                key={i}
                className="glass-card p-6 flex flex-col items-center text-center w-40 md:w-48 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-4xl mb-3">{val.icon}</span>
                <p className="text-sm font-bold" style={{ color: 'var(--color-white)' }}>{val.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Makes Us Different ───────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-bg-section)' }}>
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <SectionHeader label={t('difference.label')} title={t('difference.title')} />
            <ul className="space-y-4">
              {diffPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                    style={{ background: 'var(--color-primary)', color: '#fff' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>{pt}</p>
                </li>
              ))}
            </ul>
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
