import type { Env } from './context';

export type ProjectRow = {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  hero_key: string;
  detail_keys: string;
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
};

type ProjectInput = {
  number?: string;
  slug?: string;
  title?: string;
  category?: string;
  description?: string;
  heroKey?: string;
  detailKeys?: string[];
  sortOrder?: number;
  published?: boolean;
};

export function buildAssetUrl(env: Env, key: string) {
  const base = String(env.CMS_ASSET_BASE_URL || '').trim().replace(/\/+$/, '');
  if (base) return `${base}/${encodeURIComponent(key)}`;
  return `/api/assets/${encodeURIComponent(key)}`;
}

function parseDetailKeys(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((k) => String(k)).filter(Boolean);
  } catch {
    return [];
  }
}

export function mapProjectRow(env: Env, row: ProjectRow) {
  const detailKeys = parseDetailKeys(row.detail_keys);
  return {
    id: row.id,
    number: row.number,
    slug: row.slug,
    title: row.title,
    category: row.category,
    description: row.description,
    heroKey: row.hero_key,
    heroUrl: row.hero_key ? buildAssetUrl(env, row.hero_key) : '',
    detailKeys,
    detailUrls: detailKeys.map((k) => buildAssetUrl(env, k)),
    sortOrder: Number(row.sort_order || 0),
    published: Boolean(row.published),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapPublicProject(env: Env, row: ProjectRow) {
  const mapped = mapProjectRow(env, row);
  return {
    id: mapped.id,
    number: mapped.number,
    slug: mapped.slug,
    title: mapped.title,
    category: mapped.category,
    description: mapped.description,
    hero: mapped.heroUrl,
    details: mapped.detailUrls,
  };
}

export function normalizeSlug(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeProjectInput(input: ProjectInput) {
  const title = String(input.title || '').trim();
  const slugSource = String(input.slug || title);
  const slug = normalizeSlug(slugSource);
  if (!title) throw new Error('title is required');
  if (!slug) throw new Error('slug is required');

  return {
    number: String(input.number || '').trim(),
    slug,
    title,
    category: String(input.category || '').trim(),
    description: String(input.description || '').trim(),
    heroKey: String(input.heroKey || '').trim(),
    detailKeys: Array.isArray(input.detailKeys)
      ? input.detailKeys.map((x) => String(x).trim()).filter(Boolean)
      : [],
    sortOrder: Number.isFinite(Number(input.sortOrder)) ? Number(input.sortOrder) : 0,
    published: Boolean(input.published),
  };
}
