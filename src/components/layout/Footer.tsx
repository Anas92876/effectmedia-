import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();

  const navLinks = [
    { key: 'home',      href: '/'          },
    { key: 'about',     href: '/about'     },
    { key: 'services',  href: '/services'  },
    { key: 'packages',  href: '/packages'  },
    { key: 'portfolio', href: '/portfolio' },
    { key: 'contact',   href: '/contact'   },
  ] as const;

  return (
    <footer
      className="border-t"
      style={{
        background: 'var(--color-bg-section)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logo/logo.svg"
              alt="Effect Media"
              width={160}
              height={52}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {t('tagline')}
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://wa.me/963968653725"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(40,158,217,0.15)', color: 'var(--color-primary)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="mailto:effectmedia05@gmail.com"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(40,158,217,0.15)', color: 'var(--color-primary)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-main)' }}
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
              {t('contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-secondary)' }}>✉</span>
                effectmedia05@gmail.com
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-secondary)' }}>📞</span>
                +963 968 653 725
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Effect Media. {t('rights')}.
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {locale === 'ar' ? 'نحن نصنع التأثير' : 'We Create Impact'}
          </p>
        </div>
      </div>
    </footer>
  );
}
