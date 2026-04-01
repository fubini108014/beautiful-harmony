interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  sub?: string;
}

export default function SectionHeader({ subtitle, title, sub }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      {subtitle && (
        <p className="font-script text-xl text-secondary mb-2">{subtitle}</p>
      )}
      <h2 className="font-headline text-4xl text-gold-light">{title}</h2>
      <div
        className="mx-auto mt-3 mb-2"
        style={{
          width: 80, height: 1,
          background: 'linear-gradient(to right, transparent, #D4AF6A, transparent)',
        }}
      />
      {sub && (
        <p className="text-sm tracking-widest" style={{ color: 'var(--color-ink-dim)' }}>
          {sub}
        </p>
      )}
    </div>
  );
}
