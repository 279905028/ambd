import { useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { WorksGrid } from './components/WorksGrid';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { About } from './components/About';
import type { ProjectData } from './components/projectsData';

export default function App() {
  const [active, setActive] = useState<ProjectData | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div
      className="grain min-h-full"
      style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <Nav onAboutClick={() => setAboutOpen(true)} />
      <main>
        <Hero />
        <Marquee />
        <WorksGrid onSelect={setActive} />
        <Footer />
      </main>
      {active && (
        <ProjectDetail project={active} onClose={() => setActive(null)} />
      )}
      {aboutOpen && <About onClose={() => setAboutOpen(false)} />}
    </div>
  );
}
