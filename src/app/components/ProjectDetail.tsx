import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { PublicProject } from '../lib/cms';

export function ProjectDetail({
  project,
  onClose,
}: {
  project: PublicProject;
  onClose: () => void;
}) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const images = [project.hero, ...project.details];

  function movePreview(direction: 'prev' | 'next') {
    setPreviewIndex((current) => {
      if (current === null) return current;
      const delta = direction === 'prev' ? -1 : 1;
      return (current + delta + images.length) % images.length;
    });
  }

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewIndex !== null) {
          setPreviewIndex(null);
          return;
        }
        onClose();
      }
      if (previewIndex === null) return;
      if (e.key === 'ArrowLeft') movePreview('prev');
      if (e.key === 'ArrowRight') movePreview('next');
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, previewIndex, images.length]);

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
            - {project.category}
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
            onClick={() => setPreviewIndex(0)}
            style={{ cursor: 'zoom-in' }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.details.map((src, i) => (
            <div
              key={src + i}
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
                onClick={() => setPreviewIndex(i + 1)}
                style={{ cursor: 'zoom-in' }}
              />
            </div>
          ))}
        </div>
      </div>

      {previewIndex !== null ? (
        <div
          className="fixed inset-0 z-[260] flex items-center justify-center p-6 md:p-10"
          style={{ background: 'rgb(8 8 8 / 0.92)' }}
          onClick={() => setPreviewIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewIndex(null);
            }}
            className="fixed top-6 right-6 z-[270] inline-flex items-center gap-2 px-4 py-2 transition-colors"
            style={{
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgb(255 255 255 / 0.18)',
              background: 'rgb(20 20 20 / 0.7)',
              color: '#fff',
              fontSize: 'var(--text-small)',
            }}
          >
            Close <X size={14} />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  movePreview('prev');
                }}
                className="absolute left-4 md:left-6 z-[270] px-4 py-3"
                style={{
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgb(255 255 255 / 0.16)',
                  background: 'rgb(20 20 20 / 0.72)',
                  color: '#fff',
                }}
              >
                Prev
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  movePreview('next');
                }}
                className="absolute right-4 md:right-6 z-[270] px-4 py-3"
                style={{
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgb(255 255 255 / 0.16)',
                  background: 'rgb(20 20 20 / 0.72)',
                  color: '#fff',
                }}
              >
                Next
              </button>
            </>
          ) : null}

          <div
            className="max-w-[92vw] max-h-[88vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[previewIndex]}
              alt={`${project.title} preview ${previewIndex + 1}`}
              className="block max-w-full max-h-[80vh] object-contain"
            />
            <div
              style={{
                color: 'rgb(255 255 255 / 0.78)',
                fontSize: 'var(--text-small)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {previewIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
