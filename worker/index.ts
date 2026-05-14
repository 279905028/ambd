import * as adminLogin from '../functions/api/admin/login';
import * as adminLogout from '../functions/api/admin/logout';
import * as adminProjects from '../functions/api/admin/projects';
import * as adminProjectById from '../functions/api/admin/projects/[id]';
import * as adminSession from '../functions/api/admin/session';
import * as adminUpload from '../functions/api/admin/upload';
import * as assetFile from '../functions/api/assets/[key]';
import * as publicProjects from '../functions/api/projects';
import type { Env, RouteContext } from '../functions/_shared/context';
import { notFound } from '../functions/_shared/response';

function createContext(
  request: Request,
  env: Env,
  params: Record<string, string> = {},
): RouteContext<Record<string, string>> {
  return { request, env, params };
}

function decodePathParam(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method.toUpperCase();

    if (method === 'GET' && pathname === '/api/projects') {
      return publicProjects.onRequestGet(createContext(request, env));
    }

    if (method === 'GET' && pathname.startsWith('/api/assets/')) {
      const rawKey = pathname.slice('/api/assets/'.length);
      if (!rawKey) return notFound();
      return assetFile.onRequestGet(
        createContext(request, env, {
          key: decodePathParam(rawKey),
        }) as RouteContext<{ key: string }>,
      );
    }

    if (pathname === '/api/admin/login') {
      if (method !== 'POST') return methodNotAllowed(['POST']);
      return adminLogin.onRequestPost(createContext(request, env));
    }

    if (pathname === '/api/admin/logout') {
      if (method !== 'POST') return methodNotAllowed(['POST']);
      return adminLogout.onRequestPost();
    }

    if (pathname === '/api/admin/session') {
      if (method !== 'GET') return methodNotAllowed(['GET']);
      return adminSession.onRequestGet(createContext(request, env));
    }

    if (pathname === '/api/admin/projects') {
      if (method === 'GET') {
        return adminProjects.onRequestGet(createContext(request, env));
      }
      if (method === 'POST') {
        return adminProjects.onRequestPost(createContext(request, env));
      }
      return methodNotAllowed(['GET', 'POST']);
    }

    if (pathname.startsWith('/api/admin/projects/')) {
      const id = pathname.slice('/api/admin/projects/'.length);
      if (!id) return notFound();
      const context = createContext(request, env, {
        id: decodePathParam(id),
      }) as RouteContext<{ id: string }>;
      if (method === 'PUT') {
        return adminProjectById.onRequestPut(context);
      }
      if (method === 'DELETE') {
        return adminProjectById.onRequestDelete(context);
      }
      return methodNotAllowed(['PUT', 'DELETE']);
    }

    if (pathname === '/api/admin/upload') {
      if (method !== 'POST') return methodNotAllowed(['POST']);
      return adminUpload.onRequestPost(createContext(request, env));
    }

    return notFound();
  },
};

function methodNotAllowed(allowed: string[]) {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: {
      allow: allowed.join(', '),
    },
  });
}
