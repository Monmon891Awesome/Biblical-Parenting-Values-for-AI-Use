import { useState } from 'react';
import { applyTheme, getTheme, type ThemeChoice } from '../lib/theme';

const order: ThemeChoice[] = ['system', 'light', 'dark'];
const label: Record<ThemeChoice, string> = { system: 'Auto', light: 'Morning', dark: 'Evening' };

export function ThemeToggle() {
  const [choice, setChoice] = useState<ThemeChoice>(getTheme());
  const next = () => {
    const n = order[(order.indexOf(choice) + 1) % order.length];
    setChoice(n);
    applyTheme(n);
  };
  return (
    <button
      onClick={next}
      aria-label={`Theme: ${label[choice]}. Tap to change.`}
      style={{
        background: 'transparent',
        border: '1px solid var(--hairline)',
        color: 'var(--ink-muted)',
        borderRadius: 'var(--r-pill)',
        padding: '6px 14px',
        fontSize: '.8rem',
      }}
    >
      {label[choice]}
    </button>
  );
}
