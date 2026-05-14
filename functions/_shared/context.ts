export type Env = {
  DB: D1Database;
  ASSETS: R2Bucket;
  CMS_ADMIN_USERNAME?: string;
  CMS_ADMIN_PASSWORD?: string;
  CMS_SESSION_SECRET?: string;
  CMS_ASSET_BASE_URL?: string;
};

export type RouteContext<TParams extends Record<string, string> = Record<string, string>> = {
  request: Request;
  env: Env;
  params?: TParams;
};
