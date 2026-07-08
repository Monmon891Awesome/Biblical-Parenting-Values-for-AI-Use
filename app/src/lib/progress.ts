// Local-first progress (web-app-prd §4.3). Starter uses localStorage;
// production uses Dexie/IndexedDB with optional account sync. No streaks, ever.

const KEY = 'firstlight.progress';

type ProgressMap = Record<string, number>; // slug -> last section index seen

function read(): ProgressMap {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') as ProgressMap;
  } catch {
    return {};
  }
}

export function getSectionIndex(slug: string): number {
  return read()[slug] ?? 0;
}

export function setSectionIndex(slug: string, index: number): void {
  const p = read();
  p[slug] = index;
  localStorage.setItem(KEY, JSON.stringify(p));
}
