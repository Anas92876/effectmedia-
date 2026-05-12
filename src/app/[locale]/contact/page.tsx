'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';

export default function ContactPage() {
  const t = useTranslations('contact');
  const formT = useTranslations('contact.form');
  const faqT = useTranslations('contact.faq');

  const services = formT.raw('services') as string[];
  const faqList = faqT.raw('list') as Array<{ q: string; a: string }>;

  const [form, setForm] = useState({ name: '', company: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const phone = '963968653725';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `${form.name} | ${form.company} | ${form.phone} | ${form.service}\n${form.message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        label={t('hero.label')}
        title={t('hero.title')}
        text={t('hero.text')}
      />

      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12">
            {/* ── Contact Info ── */}
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: 'var(--color-white)' }}>
                {t('info.title')}
              </h2>

              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${t('info.email')}`}
                  className="flex items-center gap-4 glass-card p-4 transition-all duration-200 hover:border-opacity-60"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(40,158,217,0.2)', color: 'var(--color-primary)' }}>
                    ✉
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Email</p>
                    <p className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{t('info.email')}</p>
                  </div>
                </a>

                <a
                  href={`tel:${t('info.phone')}`}
                  className="flex items-center gap-4 glass-card p-4 transition-all duration-200 hover:border-opacity-60"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(40,158,217,0.2)', color: 'var(--color-primary)' }}>
                    📞
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Phone</p>
                    <p className="font-medium text-sm" dir="ltr" style={{ color: 'var(--color-text)' }}>{t('info.phone')}</p>
                  </div>
                </a>
              </div>

              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('info.whatsappBtn')}
              </a>
            </div>

            {/* ── Form ── */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-black mb-6" style={{ color: 'var(--color-white)' }}>
                {formT('title')}
              </h2>

              {submitted ? (
                <div className="text-center py-10">
                  <p className="text-4xl mb-4">✅</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--color-secondary)' }}>
                    {formT('success')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {(['name', 'company', 'phone'] as const).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                        {formT(field)}
                      </label>
                      <input
                        type={field === 'phone' ? 'tel' : 'text'}
                        required={field === 'name'}
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                        style={{
                          background: 'rgba(0,0,60,0.6)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text)',
                          fontFamily: 'var(--font-main)',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                      {formT('service')}
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        background: '#000060',
                        border: '1px solid var(--color-border)',
                        color: form.service ? 'var(--color-text)' : 'var(--color-text-muted)',
                        fontFamily: 'var(--font-main)',
                      }}
                    >
                      <option value="">{formT('service')}</option>
                      {services.map((svc, i) => <option key={i} value={svc}>{svc}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                      {formT('message')}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{
                        background: 'rgba(0,0,60,0.6)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-main)',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-3.5">
                    {formT('submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-bg-section)' }}>
        <div className="container-main max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center" style={{ color: 'var(--color-white)' }}>
            {faqT('title')}
          </h2>
          <div className="space-y-3">
            {faqList.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-start"
                >
                  <span className="font-bold text-sm" style={{ color: 'var(--color-white)' }}>{faq.q}</span>
                  <span
                    className="transition-transform duration-300 ms-4 flex-shrink-0"
                    style={{
                      color: 'var(--color-primary)',
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  >
                    ▼
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
