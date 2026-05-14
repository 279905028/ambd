import { readSession } from '../../_shared/auth';
import { json } from '../../_shared/response';
import type { RouteContext } from '../../_shared/context';

export const onRequestGet = async (context: RouteContext) => {
  const session = await readSession(context);
  if (!session) return json({ authenticated: false });
  return json({
    authenticated: true,
    username: session.u,
    expiresAt: session.exp,
  });
};
