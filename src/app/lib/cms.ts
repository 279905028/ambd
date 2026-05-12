export type PublicProject = {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  hero: string;
  details: string[];
};

type PublicProjectsResponse = {
  projects: PublicProject[];
};

export async function fetchPublicProjects(): Promise<PublicProject[]> {
  const response = await fetch('/api/projects', {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Failed to load projects (${response.status})`);
  }
  const data = (await response.json()) as PublicProjectsResponse;
  return Array.isArray(data.projects) ? data.projects : [];
}
