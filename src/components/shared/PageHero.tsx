interface PageHeroProps {
  label: string;
  title: string;
  text: string;
  image?: string;
}

export default function PageHero({ label, title, text, image }: PageHeroProps) {
  return (
    <section
      className="relative pt-32 pb-20 overflow-hidden"
      style={{
        background: image
          ? undefined
          : 'linear-gradient(135deg, #00003a 0%, #00004C 50%, #000060 100%)',
      }}
    >
      {image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,76,0.85)' }} />
        </>
      )}

      {/* Decorative glow */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)' }}
      />

      <div className="container-main relative z-10">
        <p className="section-label mb-3">{label}</p>
        <div className="divider-line" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 mb-5 leading-tight" style={{ color: 'var(--color-white)' }}>
          {title}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {text}
        </p>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-20"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-background))' }}
      />
    </section>
  );
}
