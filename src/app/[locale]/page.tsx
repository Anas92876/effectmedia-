import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/shared/SectionHeader';
import HeroEffects from '@/components/shared/HeroEffects';
import PackagesCarousel from '@/components/shared/PackagesCarousel';

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale();
  const meta = useTranslations('meta');

  const services = useTranslations('services');
  const servicesList = services.raw('list') as Array<{
    id: string; title: string; desc: string; points: string[]; image: string;
  }>;

  const pkgs = useTranslations('packages');
  const homePkgs = useTranslations('home.packages');
  const socialPackages = pkgs.raw('social') as Array<{
    id: string; name: string; price: string; highlight: boolean; points: string[];
  }>;

  const whyPoints = t.raw('whyUs.points') as Array<{ title: string; desc: string }>;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/effect-media/man-filming-with-professional-camera.jpg"
            alt="Effect Media Production"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,76,0.82)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,60,0.6) 0%, transparent 100%)' }} />
        </div>

        {/* Animated glow */}
        <div
          className="absolute top-1/3 start-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: 'var(--color-primary)' }}
        />

        {/* Interactive particle effects */}
        <HeroEffects />

        <div className="container-main relative z-10 pt-24 pb-16">
          {/* Company tagline */}
          <p className="text-2xl md:text-3xl font-black mb-6 gradient-text tracking-wide">
            {meta('tagline')}
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 max-w-3xl"
            style={{ color: 'var(--color-white)' }}>
            {t('hero.headline')}
          </h1>

          <p className="text-lg md:text-xl max-w-xl leading-relaxed mb-10"
            style={{ color: 'var(--color-text-muted)' }}>
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary text-base px-8 py-3.5">
              {t('hero.cta_primary')}
            </Link>
            <Link href="/portfolio" className="btn-outline text-base px-8 py-3.5">
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-background))' }} />
      </section>

      {/* ── Company Intro ─────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-bg-section)' }}>
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="gsap-fade">
              <p className="section-label mb-2">{t('intro.label')}</p>
              <div className="divider-line" />
              <h2 className="text-3xl md:text-4xl font-black mt-3 mb-5" style={{ color: 'var(--color-white)' }}>
                {t('intro.title')}
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                {t('intro.text')}
              </p>
              <Link href="/about" className="btn-outline">
                {t('intro.link')}
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 gsap-fade">
              <Image
                src="/images/effect-media/insightstudios-img24.jpg"
                alt="Effect Media Team"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,76,0.3), transparent)' }} />
              <div className="absolute bottom-4 start-4 px-4 py-2 rounded-lg"
                style={{ background: 'rgba(0,0,76,0.8)', border: '1px solid var(--color-border)' }}>
                <p className="text-sm font-bold gradient-text">{locale === 'ar' ? 'نحن نصنع التأثير' : 'We Create Impact'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Preview ──────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <div className="gsap-fade">
            <SectionHeader
              label={t('services.label')}
              title={t('services.title')}
              subtitle={t('services.subtitle')}
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 gsap-stagger">
            {servicesList.slice(0, 6).map((svc) => (
              <div key={svc.id} className="glass-card p-6 group transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                  <Image src={svc.image} alt={svc.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'rgba(0,0,76,0.4)' }} />
                </div>
                <h3 className="text-lg font-black mb-2" style={{ color: 'var(--color-white)' }}>{svc.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{svc.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center gsap-fade">
            <Link href="/services" className="btn-outline">{t('services.viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-bg-section)' }}>
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="gsap-fade">
              <SectionHeader label={t('whyUs.label')} title={t('whyUs.title')} />
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {t('whyUs.text')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gsap-stagger">
              {whyPoints.map((pt, i) => (
                <div key={i} className="glass-card p-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 text-sm font-black"
                    style={{ background: 'rgba(40,158,217,0.2)', color: 'var(--color-primary)' }}>
                    {i + 1}
                  </div>
                  <h4 className="font-bold mb-1" style={{ color: 'var(--color-white)' }}>{pt.title}</h4>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Packages Preview ──────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <div className="gsap-fade">
            <SectionHeader label={homePkgs('label')} title={homePkgs('title')} centered />
          </div>
          <div className="gsap-fade">
            <PackagesCarousel
              packages={socialPackages.slice(0, 4)}
              getPackageLabel={pkgs('requestBtn')}
              viewAllLabel={homePkgs('viewAll')}
            />
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="section-padding relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #000060, #00004C, #000038)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)' }} />
          <div className="absolute bottom-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--color-secondary), transparent)' }} />
        </div>
        <div className="container-main relative z-10 text-center gsap-fade">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4" style={{ color: 'var(--color-white)' }}>
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary px-10 py-4 text-base">
              {t('cta.btn')}
            </Link>
            <a
              href="https://wa.me/963968653725"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-10 py-4 text-base"
              style={{ borderColor: '#25D366', color: '#25D366' }}
            >
              {t('cta.whatsapp')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
