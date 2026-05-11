import { ArrowUpRight } from 'lucide-react';
import { projects, type ProjectData } from './projectsData';

export function WorksGrid({ onSelect }: { onSelect: (p: ProjectData) => void }) {
  return (
    <section id="works" className="px-6 md:px-10 pb-32">
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-20">
        {projects.map((p) => (
          <article key={p.slug} className="flex flex-col">
            <button
              type="button"
              onClick={() => onSelect(p)}
              className="work-card block w-full aspect-[16/10] text-left"
              style={{
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)',
              }}
            >
              <img
                src={p.hero}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="work-overlay absolute inset-0 flex items-end p-6"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,10,10,0.75), transparent 55%)',
                }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2"
                  style={{
                    background: 'var(--color-accent)',
                    color: 'var(--color-bg)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 'var(--text-small)',
                  }}
                >
                  View case <ArrowUpRight size={14} />
                </div>
              </div>
            </button>

            <div className="mt-5 flex items-baseline justify-between gap-4">
              <div>
                <h3
                  style={{
                    fontSize: 'var(--text-h3)',
                    lineHeight: 'var(--text-h3--line-height)',
                    letterSpacing: 'var(--text-h3--letter-spacing)',
                    color: 'var(--color-fg)',
                  }}
                >
                  {p.title}{' '}
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      color: 'var(--color-fg-muted)',
                      fontWeight: 400,
                    }}
                  >
                    — {p.category}
                  </span>
                </h3>
                <p
                  className="mt-2 max-w-[36rem] line-clamp-2"
                  style={{
                    fontSize: 'var(--text-small)',
                    lineHeight: 'var(--text-small--line-height)',
                    color: 'var(--color-fg-muted)',
                    fontFamily: 'var(--font-cjk)',
                  }}
                >
                  {p.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
