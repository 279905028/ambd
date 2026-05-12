import { readSession } from '../../_shared/auth';
import { json } from '../../_shared/response';

export const onRequestGet = async (context: any) => {
  const session = await readSession(context);
  if (!session) return json({ authenticated: false });
  return json({
    authenticated: true,
    username: session.u,
    expiresAt: session.exp,
  });
};
