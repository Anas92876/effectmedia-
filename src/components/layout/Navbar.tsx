'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { key: 'home',      href: '/'          },
  { key: 'about',     href: '/about'     },
  { key: 'services',  href: '/services'  },
  { key: 'packages',  href: '/packages'  },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'contact',   href: '/contact'   },
] as const;

// Easing curve for link entrance (custom cubic-bezier for a snappy feel)
const linkEase = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Scroll detection ────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Scroll lock + Escape key ────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const switchLocale = useCallback(() => {
    const next = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: next });
  }, [locale, pathname, router]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* ── Fixed header bar ─────────────────────────────────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background:
            scrolled || menuOpen ? 'rgba(0,0,76,0.97)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(40,158,217,0.15)'
            : 'none',
        }}
      >
        <div className="container-main flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex-shrink-0 relative z-10"
          >
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
                  color: isActive(href)
                    ? 'var(--color-primary)'
                    : 'var(--color-text)',
                  background: isActive(href)
                    ? 'rgba(40,158,217,0.1)'
                    : 'transparent',
                  fontFamily: 'var(--font-main)',
                }}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
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

            {/* CTA — desktop only */}
            <div className="hidden md:block">
              <Link href="/contact" className="btn-primary text-sm py-2 px-5">
                {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </div>

            {/* ── Hamburger button ─────────────────────────────────── */}
            {/*
              BUG FIX: Previous code used wrong transform order and values.
              Correct transforms to form an X cross:
                - Container: w-5 h-4 (20×16px)
                - Top bar center at y=1px, middle at y=8px → distance 7px
                - translateY(7px) before rotate() → translates in document space first
            */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={
                menuOpen
                  ? locale === 'ar' ? 'إغلاق القائمة' : 'Close menu'
                  : locale === 'ar' ? 'فتح القائمة' : 'Open menu'
              }
              aria-expanded={menuOpen}
              className="md:hidden relative z-10 flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200"
              style={{
                background: menuOpen
                  ? 'rgba(40,158,217,0.12)'
                  : 'transparent',
              }}
            >
              <div className="relative w-5 h-4">
                {/* Top bar */}
                <span
                  className="absolute inset-x-0 top-0 h-0.5 rounded-full origin-center transition-all duration-300"
                  style={{
                    background: 'var(--color-primary)',
                    transform: menuOpen
                      ? 'translateY(7px) rotate(45deg)'
                      : 'none',
                  }}
                />
                {/* Middle bar */}
                <span
                  className="absolute inset-x-0 h-0.5 rounded-full origin-center transition-all duration-200"
                  style={{
                    background: 'var(--color-primary)',
                    top: '7px',
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? 'scaleX(0.3)' : 'scaleX(1)',
                  }}
                />
                {/* Bottom bar */}
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full origin-center transition-all duration-300"
                  style={{
                    background: 'var(--color-primary)',
                    transform: menuOpen
                      ? 'translateY(-7px) rotate(-45deg)'
                      : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile menu overlay ──────────────────────── */}
      {/*
        z-40 so the header (z-50) sits above the overlay,
        keeping the hamburger/X button clickable at all times.
      */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{ background: 'rgba(0,0,14,0.97)' }}
            /* Close when tapping the backdrop itself */
            onClick={(e) =>
              e.target === e.currentTarget && setMenuOpen(false)
            }
          >
            {/* Ambient radial glow — purely decorative */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 80% 55% at 50% 48%, rgba(40,158,217,0.07) 0%, transparent 70%)',
              }}
            />
            {/* Top accent line */}
            <div
              className="absolute top-0 inset-x-0 h-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--color-primary) 50%, transparent)',
              }}
            />
            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(40,158,217,0.35) 50%, transparent)',
              }}
            />

            {/* ── Navigation links (vertically + horizontally centered) */}
            <nav
              className="relative z-10 flex flex-col items-center gap-0 mb-12"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map(({ key, href }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{
                    delay: 0.03 + i * 0.05,
                    duration: 0.38,
                    ease: linkEase,
                  }}
                >
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="group relative block py-2.5 px-10 text-center transition-all duration-200"
                  >
                    {/* Active / hover underline */}
                    <span
                      className="absolute inset-x-10 bottom-1.5 h-px transition-all duration-200 origin-center"
                      style={{
                        background: 'var(--color-primary)',
                        transform:
                          isActive(href)
                            ? 'scaleX(1)'
                            : 'scaleX(0)',
                        opacity: isActive(href) ? 1 : 0,
                      }}
                    />
                    <span
                      className="text-[2rem] font-black leading-tight tracking-wide transition-all duration-200 group-hover:opacity-80"
                      style={{
                        color: isActive(href)
                          ? 'var(--color-primary)'
                          : 'var(--color-text)',
                        fontFamily: 'var(--font-main)',
                        display: 'block',
                      }}
                    >
                      {t(key)}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* ── Bottom actions ────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.38, duration: 0.35, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center gap-3 w-full px-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Divider */}
              <div
                className="w-12 h-px mb-1"
                style={{ background: 'var(--color-border)' }}
              />

              {/* Language switcher */}
              <button
                onClick={() => {
                  switchLocale();
                  closeMenu();
                }}
                className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl border transition-all duration-200 hover:scale-105"
                style={{
                  color: 'var(--color-primary)',
                  borderColor: 'var(--color-border)',
                  background: 'rgba(40,158,217,0.08)',
                  fontFamily: 'var(--font-main)',
                }}
              >
                🌐 {locale === 'ar' ? 'English' : 'عربي'}
              </button>

              {/* Contact CTA */}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="btn-primary justify-center text-center w-full max-w-xs"
              >
                {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
