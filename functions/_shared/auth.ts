import { json, unauthorized } from './response';

const SESSION_COOKIE = 'cms_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  u: string;
  exp: number;
};

function b64urlEncode(data: Uint8Array): string {
  let str = '';
  for (let i = 0; i < data.length; i += 1) str += String.fromCharCode(data[i]);
  return btoa(str).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/g, '');
}

function b64urlDecode(data: string): Uint8Array {
  const normalized = data.replaceAll('-', '+').replaceAll('_', '/');
  const padded = normalized + '==='.slice((normalized.length + 3) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmacSign(secret: string, value: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(value));
  return b64urlEncode(new Uint8Array(sig));
}

function parseCookies(raw: string | null): Record<string, string> {
  if (!raw) return {};
  return raw.split(';').reduce<Record<string, string>>((acc, item) => {
    const idx = item.indexOf('=');
    if (idx <= 0) return acc;
    const key = item.slice(0, idx).trim();
    const val = item.slice(idx + 1).trim();
    acc[key] = decodeURIComponent(val);
    return acc;
  }, {});
}

function safeCompare(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function getAdminUsername(env: any): string {
  return env.CMS_ADMIN_USERNAME || 'admin';
}

export function getSessionSecret(env: any): string | null {
  const secret = String(env.CMS_SESSION_SECRET || '').trim();
  return secret || null;
}

export function getAdminPassword(env: any): string | null {
  const password = String(env.CMS_ADMIN_PASSWORD || '').trim();
  return password || null;
}

export async function createSessionCookie(env: any, username: string) {
  const payload: SessionPayload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const encodedPayload = b64urlEncode(payloadBytes);
  const secret = getSessionSecret(env);
  if (!secret) throw new Error('CMS_SESSION_SECRET is required');
  const signature = await hmacSign(secret, encodedPayload);
  const token = `${encodedPayload}.${signature}`;
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export async function readSession(context: any): Promise<SessionPayload | null> {
  const cookies = parseCookies(context.request.headers.get('cookie'));
  const token = cookies[SESSION_COOKIE];
  if (!token) return null;

  const [payloadEncoded, signature] = token.split('.');
  if (!payloadEncoded || !signature) return null;
  const secret = getSessionSecret(context.env);
  if (!secret) return null;
  const expectedSignature = await hmacSign(secret, payloadEncoded);
  if (!safeCompare(expectedSignature, signature)) return null;

  try {
    const payloadText = new TextDecoder().decode(b64urlDecode(payloadEncoded));
    const payload = JSON.parse(payloadText) as SessionPayload;
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function requireAuth(context: any) {
  const session = await readSession(context);
  if (!session) return unauthorized();
  return null;
}

export async function loginHandler(context: any) {
  const username = getAdminUsername(context.env);
  const password = getAdminPassword(context.env);
  if (!password || !getSessionSecret(context.env)) {
    return json(
      { error: 'CMS admin env vars are not configured' },
      { status: 500 },
    );
  }

  let body: any;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (
    !safeCompare(String(body?.username || ''), username) ||
    !safeCompare(String(body?.password || ''), password)
  ) {
    return unauthorized('Invalid credentials');
  }

  const cookie = await createSessionCookie(context.env, username);
  return json(
    { ok: true, username },
    {
      headers: {
        'set-cookie': cookie,
      },
    },
  );
}
