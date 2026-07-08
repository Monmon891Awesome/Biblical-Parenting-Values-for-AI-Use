import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'warm';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

// One primary per screen (design-system §8). 'warm' (clay) is for hospitality
// actions like "Invite your spouse".
const styles: Record<Variant, React.CSSProperties> = {
  primary: { background: 'var(--sage)', color: '#fff', border: '1px solid var(--sage)' },
  secondary: { background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--hairline)' },
  ghost: { background: 'transparent', color: 'var(--sage-deep)', border: '1px solid transparent' },
  warm: { background: 'var(--clay)', color: '#fff', border: '1px solid var(--clay)' },
};

export function Button({ variant = 'primary', children, style, ...rest }: Props) {
  return (
    <button
      {...rest}
      style={{
        ...styles[variant],
        borderRadius: 'var(--r-pill)',
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: 500,
        minHeight: 44,
        transition: 'transform var(--dur) var(--ease), filter var(--dur) var(--ease)',
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {children}
    </button>
  );
}
