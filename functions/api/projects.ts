import { json } from '../_shared/response';
import { mapPublicProject, type ProjectRow } from '../_shared/projects';
import type { RouteContext } from '../_shared/context';

export const onRequestGet = async (context: RouteContext) => {
  const { results } = await context.env.DB.prepare(
    `SELECT *
     FROM projects
     WHERE published = 1
     ORDER BY sort_order ASC, created_at DESC`,
  ).all<ProjectRow>();

  return json({
    projects: results.map((row: ProjectRow) => mapPublicProject(context.env, row)),
  });
};
