import { clearSessionCookie } from '../../_shared/auth';
import { json } from '../../_shared/response';

export const onRequestPost = async () =>
  json(
    { ok: true },
    {
      headers: {
        'set-cookie': clearSessionCookie(),
      },
    },
  );
