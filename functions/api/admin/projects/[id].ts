import { requireAuth } from '../../../_shared/auth';
import {
  normalizeProjectInput,
  type ProjectRow,
} from '../../../_shared/projects';
import { badRequest, json, notFound } from '../../../_shared/response';
import type { RouteContext } from '../../../_shared/context';

async function getProjectById(context: RouteContext, id: string) {
  return context.env.DB.prepare('SELECT * FROM projects WHERE id = ?')
    .bind(id)
    .first<ProjectRow>();
}

export const onRequestPut = async (context: RouteContext<{ id: string }>) => {
  const denied = await requireAuth(context);
  if (denied) return denied;

  const id = String(context.params?.id || '');
  if (!id) return notFound();

  const exists = await getProjectById(context, id);
  if (!exists) return notFound('Project not found');

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }

  let input;
  try {
    input = normalizeProjectInput(body as Record<string, unknown>);
  } catch (error: any) {
    return badRequest(error?.message || 'Invalid payload');
  }

  const now = new Date().toISOString();
  const result = await context.env.DB.prepare(
    `UPDATE projects
     SET number = ?, slug = ?, title = ?, category = ?, description = ?,
         hero_key = ?, detail_keys = ?, sort_order = ?, published = ?, updated_at = ?
     WHERE id = ?`,
  )
    .bind(
      input.number,
      input.slug,
      input.title,
      input.category,
      input.description,
      input.heroKey,
      JSON.stringify(input.detailKeys),
      input.sortOrder,
      input.published ? 1 : 0,
      now,
      id,
    )
    .run();

  if (!result.success) {
    return badRequest('Failed to update project. Slug may already exist.');
  }

  return json({ ok: true });
};

export const onRequestDelete = async (context: RouteContext<{ id: string }>) => {
  const denied = await requireAuth(context);
  if (denied) return denied;

  const id = String(context.params?.id || '');
  if (!id) return notFound();

  const row = await getProjectById(context, id);
  if (!row) return notFound('Project not found');

  let keys: string[] = [];
  try {
    const detailKeys = JSON.parse(row.detail_keys);
    keys = [
      row.hero_key,
      ...(Array.isArray(detailKeys) ? detailKeys : []),
    ]
      .map((k) => String(k || '').trim())
      .filter(Boolean);
  } catch {
    keys = [row.hero_key].filter(Boolean);
  }

  await Promise.all(keys.map((key) => context.env.ASSETS.delete(key)));
  await context.env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(id).run();

  return json({ ok: true });
};
