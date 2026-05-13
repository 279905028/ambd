import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="px-6 md:px-10 pt-32 pb-10">
      <div
        className="flex items-center gap-3 mb-10"
        style={{
          fontSize: 'var(--text-mono)',
          letterSpacing: 'var(--text-mono--letter-spacing)',
        }}
      >
        <span style={{ color: 'var(--color-fg-subtle)' }}>(CTA)</span>
        <span style={{ color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>
          Currently accepting projects
        </span>
      </div>
      <h2
        style={{
          fontSize: 'var(--text-display)',
          lineHeight: 'var(--text-display--line-height)',
          letterSpacing: 'var(--text-display--letter-spacing)',
          fontWeight: 300,
        }}
      >
        Let's{' '}
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          make
        </span>
        <br />
        something.
      </h2>

      <div className="mt-16 flex flex-wrap items-center gap-4">
        <a
          href="mailto:ambdes@163.com"
          className="inline-flex items-center gap-3 px-6 py-4"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-bg)',
            borderRadius: 'var(--radius-pill)',
            fontSize: 'var(--text-body)',
          }}
        >
          ambdes@163.com <ArrowUpRight size={18} />
        </a>
        <a
          href="mailto:ambdes@163.com?subject=Project%20Inquiry"
          className="inline-flex items-center gap-3 px-6 py-4"
          style={{
            border: '1px solid var(--color-border-strong)',
            color: 'var(--color-fg)',
            borderRadius: 'var(--radius-pill)',
            fontSize: 'var(--text-body)',
          }}
        >
          Book a call <ArrowUpRight size={18} />
        </a>
      </div>

      <div
        className="mt-24 pt-6 grid md:grid-cols-4 gap-8"
        style={{
          borderTop: '1px solid var(--color-border)',
          fontSize: 'var(--text-small)',
          color: 'var(--color-fg-muted)',
        }}
      >
        <div>
          <div style={{ color: 'var(--color-fg-subtle)' }}>Studio</div>
          <div className="mt-2" style={{ color: 'var(--color-fg)' }}>
            Shanghai · Wenzhou · Remote
          </div>
        </div>
        <div>
          <div style={{ color: 'var(--color-fg-subtle)' }}>Index</div>
          <ul className="mt-2 space-y-1">
            <li><a href="#top" className="link-underline">Top</a></li>
            <li><a href="#works" className="link-underline">Works</a></li>
            <li><a href="mailto:ambdes@163.com" className="link-underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <div style={{ color: 'var(--color-fg-subtle)' }}>Elsewhere</div>
          <ul className="mt-2 space-y-1">
            <li>Instagram: @ambd.studio</li>
            <li>WeChat: 1315831126</li>
            <li><a href="mailto:ambdes@163.com" className="link-underline">Email: ambdes@163.com</a></li>
          </ul>
        </div>
        <div className="md:text-right">
          <div style={{ color: 'var(--color-fg-subtle)' }}>© 2026</div>
          <div className="mt-2" style={{ color: 'var(--color-fg)' }}>
            Designed with intention.
          </div>
        </div>
      </div>
    </footer>
  );
}
