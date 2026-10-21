export const getSiteUrl = (): string => {
  return import.meta.env.VITE_SITE_URL || '';
};

export const normalizeCanonicalPath = (pathname: string): string => {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
};