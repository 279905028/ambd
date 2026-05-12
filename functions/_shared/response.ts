export function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}

export function text(message: string, status = 400) {
  return new Response(message, { status });
}

export function unauthorized(message = 'Unauthorized') {
  return json({ error: message }, { status: 401 });
}

export function badRequest(message: string) {
  return json({ error: message }, { status: 400 });
}

export function notFound(message = 'Not Found') {
  return json({ error: message }, { status: 404 });
}
