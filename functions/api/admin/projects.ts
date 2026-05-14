import { requireAuth } from '../../_shared/auth';
import {
  mapProjectRow,
  normalizeProjectInput,
  type ProjectRow,
} from '../../_shared/projects';
import { badRequest, json } from '../../_shared/response';
import type { RouteContext } from '../../_shared/context';

export const onRequestGet = async (context: RouteContext) => {
  const denied = await requireAuth(context);
  if (denied) return denied;

  const { results } = await context.env.DB.prepare(
    `SELECT *
     FROM projects
     ORDER BY sort_order ASC, created_at DESC`,
  ).all<ProjectRow>();

  return json({
    projects: results.map((row: ProjectRow) => mapProjectRow(context.env, row)),
  });
};

export const onRequestPost = async (context: RouteContext) => {
  const denied = await requireAuth(context);
  if (denied) return denied;

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

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const result = await context.env.DB.prepare(
    `INSERT INTO projects (
      id, number, slug, title, category, description, hero_key,
      detail_keys, sort_order, published, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
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
      now,
    )
    .run();

  if (!result.success) {
    return badRequest('Failed to create project. Slug may already exist.');
  }

  const created = await context.env.DB.prepare(
    `SELECT * FROM projects WHERE id = ?`,
  )
    .bind(id)
    .first<ProjectRow>();

  return json(
    {
      project: created ? mapProjectRow(context.env, created) : null,
    },
    { status: 201 },
  );
};
