# AMBd2 Portfolio + CMS

This repository now includes:
- Portfolio site (Vite + React).
- Cloudflare Workers API.
- R2 image storage.
- D1 content storage.
- Minimal admin UI at `/admin/`.

## Local development

```bash
npm install
npm run dev
```

Frontend-only development runs with Vite.

To run the full stack locally with Workers bindings and API routes:

```bash
npm run build
npm run cf:dev
```

## Build

```bash
npm run build
```

## Deploy to Cloudflare Workers

This project deploys as a Worker with static assets:

- Worker entry: `worker/index.ts`
- Static assets directory: `dist`
- Wrangler config: `wrangler.toml`

Deploy with:

```bash
npm run build
npm run cf:deploy
```

Wrangler `4.90.1` requires Node.js `22+` for local development and deployment.

## Required Cloudflare bindings

Configure these in your Worker settings or `wrangler.toml`:

1. D1 binding  
   - Variable name: `DB`  
   - Database: your D1 database (for example `portfolio-cms`)

2. R2 binding  
   - Variable name: `ASSETS`  
   - Bucket: your R2 bucket (for example `portfolio-assets`)

3. Environment variables  
   - `CMS_ADMIN_USERNAME` (optional, default is `admin`)  
   - `CMS_ADMIN_PASSWORD` (required)  
   - `CMS_SESSION_SECRET` (required, use a long random value)  
   - `CMS_ASSET_BASE_URL` (optional, for example `https://assets.example.com`)

If `CMS_ASSET_BASE_URL` is empty, images are served through `/api/assets/:key`.

Reference files:
- `wrangler.toml`
- `.dev.vars.example`

## D1 schema

Run the SQL in:
- `migrations/0001_cms.sql`

## Admin path

- URL: `/admin/`
- Features:
  - login/logout
  - create/update/delete projects
  - hero image upload to R2
  - detail image batch upload to R2
  - publish toggle and sort order

## API overview

Public:
- `GET /api/projects`
- `GET /api/assets/:key`

Admin (auth required):
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/session`
- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`
- `POST /api/admin/upload`
