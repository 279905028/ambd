export function Hero() {
  return (
    <section id="top" className="px-6 md:px-10 pt-40 pb-24">
      <div
        className="flex items-center gap-3 mb-12"
        style={{
          fontSize: 'var(--text-mono)',
          letterSpacing: 'var(--text-mono--letter-spacing)',
        }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--color-accent)' }}
        />
        <span style={{ color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>
          Portfolio · 2026 · 19 works
        </span>
      </div>

      <h1
        style={{
          fontSize: 'var(--text-display)',
          lineHeight: 'var(--text-display--line-height)',
          letterSpacing: 'var(--text-display--letter-spacing)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 300,
        }}
      >
        Works{' '}
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'var(--color-fg-muted)',
          }}
        >
          that
        </span>
        <br />
        speak{' '}
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          quietly.
        </span>
      </h1>

      <div className="mt-16 grid md:grid-cols-12 gap-8">
        <p
          className="md:col-span-6 md:col-start-7 max-w-xl"
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--text-body--line-height)',
            color: 'var(--color-fg-muted)',
          }}
        >
          A curated archive of branding, identity, and visual design projects —
          built alongside founders, studios, and culture shapers. Scroll to
          explore 19 works spanning chemistry to ceramics, finance to fiber.
        </p>
      </div>
    </section>
  );
}
