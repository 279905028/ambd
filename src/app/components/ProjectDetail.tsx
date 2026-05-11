import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { ProjectData } from './projectsData';

export function ProjectDetail({
  project,
  onClose,
}: {
  project: ProjectData;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] inline-flex items-center gap-2 px-4 py-2 transition-colors"
        style={{
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--color-border-strong)',
          background: 'var(--color-bg-elevated)',
          color: 'var(--color-fg)',
          fontSize: 'var(--text-small)',
        }}
      >
        Close <X size={14} />
      </button>

      <div className="px-6 md:px-10 pt-24 pb-32 max-w-[1400px] mx-auto">
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            fontSize: 'var(--text-mono)',
            letterSpacing: 'var(--text-mono--letter-spacing)',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'var(--color-fg-subtle)' }}>({project.number})</span>
          <span style={{ color: 'var(--color-fg-muted)' }}>{project.slug}</span>
        </div>

        <h1
          className="mb-8 max-w-[60rem]"
          style={{
            fontSize: 'var(--text-h1)',
            lineHeight: 'var(--text-h1--line-height)',
            letterSpacing: 'var(--text-h1--letter-spacing)',
            fontWeight: 'var(--text-h1--font-weight)' as any,
          }}
        >
          {project.title}{' '}
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--color-fg-muted)',
            }}
          >
            — {project.category}
          </span>
        </h1>

        <p
          className="max-w-[44rem] mb-16"
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--text-body--line-height)',
            color: 'var(--color-fg-muted)',
            fontFamily: 'var(--font-cjk)',
          }}
        >
          {project.description}
        </p>

        <div
          className="w-full aspect-[16/10] mb-6 overflow-hidden"
          style={{
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface)',
          }}
        >
          <img
            src={project.hero}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.details.map((src, i) => (
            <div
              key={i}
              className="w-full aspect-[4/3] overflow-hidden"
              style={{
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)',
              }}
            >
              <img
                src={src}
                alt={`${project.title} ${i + 2}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
