// Theme: system (default) / morning (light) / evening (dark).
// Writes data-theme on <html>; tokens.css does the rest. Persisted locally.

export type ThemeChoice = 'system' | 'light' | 'dark';
const KEY = 'firstlight.theme';

export function getTheme(): ThemeChoice {
  return (localStorage.getItem(KEY) as ThemeChoice) || 'system';
}

export function applyTheme(choice: ThemeChoice): void {
  const root = document.documentElement;
  if (choice === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', choice);
  localStorage.setItem(KEY, choice);
}

export function initTheme(): void {
  applyTheme(getTheme());
}
