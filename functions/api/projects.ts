import { json } from '../_shared/response';
import { mapPublicProject, type ProjectRow } from '../_shared/projects';

export const onRequestGet = async (context: any) => {
  const { results } = await context.env.DB.prepare(
    `SELECT *
     FROM projects
     WHERE published = 1
     ORDER BY sort_order ASC, created_at DESC`,
  ).all<ProjectRow>();

  return json({
    projects: results.map((row) => mapPublicProject(context.env, row)),
  });
};
