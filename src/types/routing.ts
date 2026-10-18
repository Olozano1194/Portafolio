export type RouteParams<T extends Record<string, string | undefined>> = T;

export function getParam<T extends Record<string, string | undefined>>(
  params: T,
  key: keyof T
): string {
  const value = params[key];
  if (!value) throw new Error(`Missing required param: ${String(key)}`);
  return value;
}

export function getParamAsNumber<T extends Record<string, string | undefined>>(
  params: T,
  key: keyof T
): number {
  const value = getParam(params, key);
  const num = Number(value);
  if (Number.isNaN(num)) throw new Error(`Invalid number param: ${String(key)}=${value}`);
  return num;
}

export function getParamOptional<T extends Record<string, string | undefined>>(
  params: T,
  key: keyof T,
  fallback: string
): string {
  return params[key] ?? fallback;
}