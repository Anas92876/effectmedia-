import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';

export default function ServicesPage() {
  const t = useTranslations('services');
  const servicesList = t.raw('list') as Array<{
    id: string; title: string; desc: string; points: string[]; image: string;
  }>;

  const phone = '963968653725';

  return (
    <>
      <PageHero
        label={t('hero.label')}
        title={t('hero.title')}
        text={t('hero.text')}
        image="/images/effect-media/man-filming-with-professional-camera (2).jpg"
      />

      {/* ── Services List ─────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-main">
          <div className="space-y-8 gsap-stagger">
            {servicesList.map((svc, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={svc.id}
                  className="glass-card overflow-hidden grid md:grid-cols-2 group transition-all duration-300 hover:shadow-lg"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  {/* Image — alternates sides on desktop */}
                  <div
                    className={`relative h-56 md:h-full min-h-[280px] ${!isEven ? 'md:order-2' : ''}`}
                  >
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: 'rgba(0,0,76,0.35)' }} />
                  </div>

                  {/* Content */}
                  <div className={`p-8 flex flex-col justify-center ${!isEven ? 'md:order-1' : ''}`}>
                    <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: 'var(--color-white)' }}>
                      {svc.title}
                    </h2>
                    <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--color-text-muted)' }}>
                      {svc.desc}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {svc.points.map((pt, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                          <span style={{ color: 'var(--color-secondary)' }}>◆</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/${phone}?text=${encodeURIComponent(svc.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary self-start"
                    >
                      {t('requestBtn')}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-padding text-center"
        style={{ background: 'linear-gradient(135deg, #000060, #00004C)' }}>
        <div className="container-main gsap-fade">
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
