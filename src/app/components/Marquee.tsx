export function Marquee() {
  const items = [
    'Brand Identity',
    'Art Direction',
    'Editorial',
    'Digital Product',
    'Type Design',
    'Packaging',
    'Strategy',
    'Motion',
  ];
  const row = [...items, ...items];
  return (
    <section
      className="py-10 overflow-hidden"
      style={{
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="flex marquee-track whitespace-nowrap">
        {row.map((item, i) => (
          <div key={i} className="flex items-center shrink-0 px-8">
            <span
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontFamily: 'var(--font-serif)',
                fontStyle: i % 2 === 0 ? 'normal' : 'italic',
                color: i % 3 === 0 ? 'var(--color-fg)' : 'var(--color-fg-subtle)',
                letterSpacing: '-0.02em',
              }}
            >
              {item}
            </span>
            <span className="mx-8" style={{ color: 'var(--color-accent)' }}>✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
