CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  hero_key TEXT NOT NULL DEFAULT '',
  detail_keys TEXT NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_projects_published_sort
  ON projects (published, sort_order, created_at);
