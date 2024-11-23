export function tryParseJson<T>(json: string) {
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch (_e) {
    return null;
  }
}
