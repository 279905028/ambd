import { requireAuth } from '../../_shared/auth';
import { buildAssetUrl } from '../../_shared/projects';
import { badRequest, json } from '../../_shared/response';

function sanitizeFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export const onRequestPost = async (context: any) => {
  const denied = await requireAuth(context);
  if (denied) return denied;

  const form = await context.request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return badRequest('file is required');
  }
  if (file.size <= 0) {
    return badRequest('file is empty');
  }

  const ext = file.name.includes('.') ? file.name.split('.').pop() : '';
  const safeName = sanitizeFilename(file.name || 'image');
  const key = `${Date.now()}-${crypto.randomUUID()}-${safeName || `upload.${ext || 'bin'}`}`;

  await context.env.ASSETS.put(key, file.stream(), {
    httpMetadata: {
      contentType: file.type || 'application/octet-stream',
    },
  });

  return json({
    key,
    url: buildAssetUrl(context.env, key),
    size: file.size,
    type: file.type,
  });
};
