'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { key: 'home',      href: '/'          },
  { key: 'about',     href: '/about'     },
  { key: 'services',  href: '/services'  },
  { key: 'packages',  href: '/packages'  },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'contact',   href: '/contact'   },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: next });
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(0,0,76,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(40,158,217,0.15)' : 'none',
      }}
    >
      <div className="container-main flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo/logo.svg"
            alt="Effect Media"
            width={160}
            height={52}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              style={{
                color: pathname === href ? 'var(--color-primary)' : 'var(--color-text)',
                background: pathname === href ? 'rgba(40,158,217,0.1)' : 'transparent',
                fontFamily: 'var(--font-main)',
              }}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language switcher — desktop only */}
          <button
            onClick={switchLocale}
            className="hidden md:block text-sm font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 hover:scale-105"
            style={{
              color: 'var(--color-primary)',
              borderColor: 'var(--color-border)',
              fontFamily: 'var(--font-main)',
            }}
          >
            {locale === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* CTA button — desktop only */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="btn-primary text-sm py-2 px-5"
            >
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: 'var(--color-primary)',
                transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: 'var(--color-primary)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: 'var(--color-primary)',
                transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: 'rgba(0,0,76,0.98)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="container-main py-4 flex flex-col gap-1">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                style={{
                  color: pathname === href ? 'var(--color-primary)' : 'var(--color-text)',
                  background: pathname === href ? 'rgba(40,158,217,0.1)' : 'transparent',
                  fontFamily: 'var(--font-main)',
                }}
              >
                {t(key)}
              </Link>
            ))}

            {/* Divider */}
            <div className="my-2 h-px" style={{ background: 'var(--color-border)' }} />

            {/* Language switcher */}
            <button
              onClick={() => { switchLocale(); setMenuOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-bold transition-all duration-200"
              style={{
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-main)',
                background: 'rgba(40,158,217,0.08)',
                border: '1px solid var(--color-border)',
              }}
            >
              <span>🌐</span>
              {locale === 'ar' ? 'English' : 'عربي'}
            </button>

            {/* Contact CTA */}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-1 justify-center text-center"
            >
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
