import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { WorksGrid } from './components/WorksGrid';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { About } from './components/About';
import { fetchPublicProjects, type PublicProject } from './lib/cms';

export default function App() {
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [active, setActive] = useState<PublicProject | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchPublicProjects();
        if (!cancelled) setProjects(rows);
      } catch (err: any) {
        if (!cancelled) setError(err?.message || 'Failed to load projects');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="grain min-h-full"
      style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <Nav onAboutClick={() => setAboutOpen(true)} />
      <main>
        <Hero />
        <Marquee />
        {loading ? (
          <section id="works" className="px-6 md:px-10 pb-32">
            <p style={{ color: 'var(--color-fg-muted)' }}>Loading projects...</p>
          </section>
        ) : error ? (
          <section id="works" className="px-6 md:px-10 pb-32">
            <p style={{ color: '#ff8b8b' }}>{error}</p>
          </section>
        ) : (
          <WorksGrid projects={projects} onSelect={setActive} />
        )}
        <Footer />
      </main>
      {active && (
        <ProjectDetail project={active} onClose={() => setActive(null)} />
      )}
      {aboutOpen && <About onClose={() => setAboutOpen(false)} />}
    </div>
  );
}
