interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ label, title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && <p className="section-label mb-2">{label}</p>}
      <div className={`divider-line ${centered ? 'mx-auto' : ''}`} />
      <h2 className="text-3xl md:text-4xl font-black mt-3 leading-tight" style={{ color: 'var(--color-white)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
