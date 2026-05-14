import { useEffect, useMemo, useState, type FormEvent } from 'react';

type AdminProject = {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  heroKey: string;
  heroUrl: string;
  detailKeys: string[];
  detailUrls: string[];
  sortOrder: number;
  published: boolean;
};

type AdminProjectsResponse = {
  projects: AdminProject[];
};

type SessionResponse = {
  authenticated: boolean;
  username?: string;
};

type UploadResponse = {
  key: string;
  url: string;
};

type Draft = {
  id?: string;
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  heroKey: string;
  detailKeys: string[];
  sortOrder: number;
  published: boolean;
  assetUrls: Record<string, string>;
};

function createEmptyDraft(): Draft {
  return {
    number: '',
    slug: '',
    title: '',
    category: '',
    description: '',
    heroKey: '',
    detailKeys: [],
    sortOrder: 0,
    published: true,
    assetUrls: {},
  };
}

function draftFromProject(project: AdminProject): Draft {
  const assetUrls: Record<string, string> = {};
  if (project.heroKey && project.heroUrl) assetUrls[project.heroKey] = project.heroUrl;
  project.detailKeys.forEach((key, idx) => {
    const url = project.detailUrls[idx];
    if (url) assetUrls[key] = url;
  });
  return {
    id: project.id,
    number: project.number,
    slug: project.slug,
    title: project.title,
    category: project.category,
    description: project.description,
    heroKey: project.heroKey,
    detailKeys: [...project.detailKeys],
    sortOrder: project.sortOrder,
    published: project.published,
    assetUrls,
  };
}

async function apiRequest<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...init,
    credentials: 'include',
    headers: {
      ...(init.headers || {}),
    },
  });

  const data = (await response.json().catch(() => null)) as any;
  if (!response.ok) {
    throw new Error(data?.error || `Request failed (${response.status})`);
  }
  return data as T;
}

function deriveAssetUrl(key: string) {
  return `/api/assets/${encodeURIComponent(key)}`;
}

function moveItem(items: string[], fromIndex: number, toIndex: number) {
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length ||
    fromIndex === toIndex
  ) {
    return items;
  }

  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

export function AdminApp() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(createEmptyDraft);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const selectedProject = useMemo(
    () => projects.find((item) => item.id === selectedId) || null,
    [projects, selectedId],
  );

  async function loadProjects() {
    const data = await apiRequest<AdminProjectsResponse>('/api/admin/projects');
    setProjects(data.projects || []);
    if (data.projects.length === 0) {
      setSelectedId(null);
      setDraft(createEmptyDraft());
      return;
    }
    const current = data.projects.find((item) => item.id === selectedId);
    const active = current || data.projects[0];
    setSelectedId(active.id);
    setDraft(draftFromProject(active));
  }

  useEffect(() => {
    (async () => {
      try {
        const session = await apiRequest<SessionResponse>('/api/admin/session');
        if (!session.authenticated) {
          setAuthenticated(false);
          return;
        }
        setAuthenticated(true);
        await loadProjects();
      } catch {
        setAuthenticated(false);
      } finally {
        setCheckingSession(false);
      }
    })();
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await apiRequest('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      setAuthenticated(true);
      setPassword('');
      await loadProjects();
      setMessage('Login successful');
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setBusy(false);
      setCheckingSession(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await apiRequest('/api/admin/logout', { method: 'POST' });
      setAuthenticated(false);
      setProjects([]);
      setSelectedId(null);
      setDraft(createEmptyDraft());
    } catch (err: any) {
      setError(err?.message || 'Logout failed');
    } finally {
      setBusy(false);
    }
  }

  async function handleSave() {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      if (draft.id) {
        await apiRequest(`/api/admin/projects/${draft.id}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(draft),
        });
        setMessage('Project updated');
      } else {
        await apiRequest('/api/admin/projects', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(draft),
        });
        setMessage('Project created');
      }
      await loadProjects();
    } catch (err: any) {
      setError(err?.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!draft.id) return;
    const confirmed = window.confirm(`Delete project "${draft.title}"?`);
    if (!confirmed) return;

    setBusy(true);
    setError('');
    setMessage('');
    try {
      await apiRequest(`/api/admin/projects/${draft.id}`, {
        method: 'DELETE',
      });
      setMessage('Project deleted');
      await loadProjects();
    } catch (err: any) {
      setError(err?.message || 'Delete failed');
    } finally {
      setBusy(false);
    }
  }

  async function uploadOne(file: File) {
    const body = new FormData();
    body.append('file', file);
    const result = await apiRequest<UploadResponse>('/api/admin/upload', {
      method: 'POST',
      body,
    });
    return result;
  }

  async function handleHeroUpload(file: File | null) {
    if (!file) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const uploaded = await uploadOne(file);
      setDraft((prev) => ({
        ...prev,
        heroKey: uploaded.key,
        assetUrls: {
          ...prev.assetUrls,
          [uploaded.key]: uploaded.url,
        },
      }));
      setMessage('Hero image uploaded');
    } catch (err: any) {
      setError(err?.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  async function handleDetailUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const uploaded = await Promise.all(Array.from(files).map((file) => uploadOne(file)));
      setDraft((prev) => {
        const nextUrls = { ...prev.assetUrls };
        uploaded.forEach((item) => {
          nextUrls[item.key] = item.url;
        });
        return {
          ...prev,
          detailKeys: [...prev.detailKeys, ...uploaded.map((item) => item.key)],
          assetUrls: nextUrls,
        };
      });
      setMessage(`${uploaded.length} image(s) uploaded`);
    } catch (err: any) {
      setError(err?.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  function setField<K extends keyof Draft>(field: K, value: Draft[K]) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  function moveDetailImage(index: number, direction: 'up' | 'down') {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    setDraft((prev) => ({
      ...prev,
      detailKeys: moveItem(prev.detailKeys, index, targetIndex),
    }));
  }

  if (checkingSession) {
    return (
      <div className="admin-shell flex items-center justify-center">
        <p style={{ color: 'var(--color-fg-muted)' }}>Checking admin session...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="admin-shell flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="admin-panel w-full max-w-[420px] p-8 space-y-4"
        >
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>AMBd2 CMS</h1>
            <p style={{ color: 'var(--color-fg-muted)', marginTop: 8 }}>
              Sign in to manage portfolio projects.
            </p>
          </div>
          <label className="block">
            <div style={{ marginBottom: 8, color: 'var(--color-fg-muted)' }}>Username</div>
            <input
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label className="block">
            <div style={{ marginBottom: 8, color: 'var(--color-fg-muted)' }}>Password</div>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error ? <p style={{ color: '#ff9d9d' }}>{error}</p> : null}
          <button className="admin-btn primary" type="submit" disabled={busy}>
            {busy ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell px-6 py-8 md:px-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>AMBd2 CMS</h1>
          <p style={{ color: 'var(--color-fg-muted)', marginTop: 6 }}>
            Manage projects, text content, and image assets stored in R2.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a className="admin-btn" href="/" target="_blank" rel="noreferrer">
            Open site
          </a>
          <button className="admin-btn" type="button" onClick={handleLogout} disabled={busy}>
            Sign out
          </button>
        </div>
      </header>

      {error ? <p style={{ color: '#ff9d9d', marginBottom: 12 }}>{error}</p> : null}
      {message ? <p style={{ color: '#a9ff9a', marginBottom: 12 }}>{message}</p> : null}

      <div className="admin-layout">
        <aside className="admin-panel p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: '1rem' }}>Projects ({projects.length})</h2>
            <button
              type="button"
              className="admin-btn"
              onClick={() => {
                setSelectedId(null);
                setDraft(createEmptyDraft());
              }}
            >
              New
            </button>
          </div>
          <div className="space-y-2 max-h-[70vh] overflow-auto pr-1">
            {projects.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`admin-list-item ${item.id === selectedId ? 'active' : ''}`}
                onClick={() => {
                  setSelectedId(item.id);
                  setDraft(draftFromProject(item));
                }}
              >
                <div style={{ fontSize: '0.82rem', color: 'var(--color-fg-subtle)' }}>
                  {item.number || '--'} / {item.slug}
                </div>
                <div style={{ marginTop: 6 }}>{item.title}</div>
              </button>
            ))}
          </div>
        </aside>

        <section className="admin-panel p-5 md:p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label>
              <div style={{ marginBottom: 8, color: 'var(--color-fg-muted)' }}>Number</div>
              <input
                className="admin-input"
                value={draft.number}
                onChange={(e) => setField('number', e.target.value)}
                placeholder="01"
              />
            </label>
            <label>
              <div style={{ marginBottom: 8, color: 'var(--color-fg-muted)' }}>Slug</div>
              <input
                className="admin-input"
                value={draft.slug}
                onChange={(e) => setField('slug', e.target.value)}
                placeholder="project-slug"
              />
            </label>
            <label>
              <div style={{ marginBottom: 8, color: 'var(--color-fg-muted)' }}>Sort Order</div>
              <input
                type="number"
                className="admin-input"
                value={draft.sortOrder}
                onChange={(e) => setField('sortOrder', Number(e.target.value || 0))}
              />
            </label>
          </div>

          <label className="block">
            <div style={{ marginBottom: 8, color: 'var(--color-fg-muted)' }}>Title</div>
            <input
              className="admin-input"
              value={draft.title}
              onChange={(e) => setField('title', e.target.value)}
            />
          </label>

          <label className="block">
            <div style={{ marginBottom: 8, color: 'var(--color-fg-muted)' }}>Category</div>
            <input
              className="admin-input"
              value={draft.category}
              onChange={(e) => setField('category', e.target.value)}
            />
          </label>

          <label className="block">
            <div style={{ marginBottom: 8, color: 'var(--color-fg-muted)' }}>Description</div>
            <textarea
              className="admin-textarea"
              value={draft.description}
              onChange={(e) => setField('description', e.target.value)}
            />
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => setField('published', e.target.checked)}
            />
            Published
          </label>

          <div className="space-y-3">
            <h3>Hero Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => void handleHeroUpload(e.target.files?.[0] || null)}
            />
            {draft.heroKey ? (
              <div className="space-y-2">
                <div style={{ color: 'var(--color-fg-muted)' }}>{draft.heroKey}</div>
                <img
                  src={draft.assetUrls[draft.heroKey] || deriveAssetUrl(draft.heroKey)}
                  alt="hero preview"
                  style={{
                    width: '100%',
                    maxWidth: 360,
                    borderRadius: 12,
                    border: '1px solid var(--color-border)',
                  }}
                />
              </div>
            ) : null}
          </div>

          <div className="space-y-3">
            <h3>Detail Images</h3>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => void handleDetailUpload(e.target.files)}
            />
            {draft.detailKeys.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {draft.detailKeys.map((key, index) => (
                  <div key={key} className="admin-panel p-2">
                    <div
                      className="flex items-center justify-between mb-2"
                      style={{ color: 'var(--color-fg-muted)', fontSize: '0.85rem' }}
                    >
                      <span>#{index + 1}</span>
                      <span className="truncate max-w-[65%]" title={key}>
                        {key}
                      </span>
                    </div>
                    <img
                      src={draft.assetUrls[key] || deriveAssetUrl(key)}
                      alt={key}
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                    />
                    <div className="admin-image-actions">
                      <button
                        type="button"
                        className="admin-btn"
                        disabled={index === 0}
                        onClick={() => moveDetailImage(index, 'up')}
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        className="admin-btn"
                        disabled={index === draft.detailKeys.length - 1}
                        onClick={() => moveDetailImage(index, 'down')}
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        className="admin-btn danger"
                        onClick={() =>
                          setField(
                            'detailKeys',
                            draft.detailKeys.filter((item) => item !== key),
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              className="admin-btn primary"
              onClick={() => void handleSave()}
              disabled={busy}
            >
              {busy ? 'Saving...' : draft.id ? 'Save Changes' : 'Create Project'}
            </button>
            <button
              type="button"
              className="admin-btn danger"
              onClick={() => void handleDelete()}
              disabled={busy || !draft.id}
            >
              Delete Project
            </button>
            {selectedProject ? (
              <a className="admin-btn" href={`/#works`} target="_blank" rel="noreferrer">
                View on site
              </a>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
