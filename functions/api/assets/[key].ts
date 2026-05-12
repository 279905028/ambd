export const onRequestGet = async (context: any) => {
  const rawKey = String(context.params?.key || '');
  const key = rawKey ? decodeURIComponent(rawKey) : '';
  if (!key) return new Response('Not Found', { status: 404 });

  const object = await context.env.ASSETS.get(key);
  if (!object) return new Response('Not Found', { status: 404 });

  const headers = new Headers();
  if (object.writeHttpMetadata) object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('cache-control', 'public, max-age=31536000, immutable');
  if (!headers.get('content-type')) {
    headers.set('content-type', 'application/octet-stream');
  }

  return new Response(object.body, { headers });
};
