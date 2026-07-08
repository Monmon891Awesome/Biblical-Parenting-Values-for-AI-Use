import { Button } from '../components/Button';

// First run — "crossing the threshold of a warm home" (UX §4.1).
// No signup wall, no progress bar, no funnel. One warm line, one button.
export function Threshold({ onBegin }: { onBegin: () => void }) {
  return (
    <div
      className="rise"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 'var(--s-6)',
      }}
    >
      <img src="/firstlight.svg" width={72} height={72} alt="" />
      <div>
        <h1 className="display">You made it here.</h1>
        <p className="subtitle">Come in.</p>
      </div>
      <p className="muted" style={{ maxWidth: '34ch' }}>
        This won't add to your plate. It points you to the One who carries it.
      </p>
      <Button onClick={onBegin}>Begin</Button>
      <p className="muted" style={{ fontSize: '.85rem', maxWidth: '30ch' }}>
        No account needed. Nothing to sign up for. Just a quiet place to begin.
      </p>
    </div>
  );
}
