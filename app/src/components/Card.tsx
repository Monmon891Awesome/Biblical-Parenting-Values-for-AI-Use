import type { CSSProperties, ReactNode } from 'react';

// The atomic surface — chapters, prayers, journal (design-system §8).
export function Card({ children, style, onClick }: { children: ReactNode; style?: CSSProperties; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--hairline)',
        borderRadius: 'var(--r-md)',
        boxShadow: 'var(--shadow-1)',
        padding: 'var(--s-6)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
