import { useState } from 'react';
import { Threshold } from './screens/Threshold';
import { Today } from './screens/Today';
import { ChapterReader } from './screens/ChapterReader';
import { ThemeToggle } from './components/ThemeToggle';

// Minimal state-based routing for the starter (production uses a real router).
type Route = { name: 'threshold' } | { name: 'today' } | { name: 'chapter'; slug: string };

const SEEN_KEY = 'firstlight.seen';

export default function App() {
  const [route, setRoute] = useState<Route>(() =>
    localStorage.getItem(SEEN_KEY) ? { name: 'today' } : { name: 'threshold' }
  );

  const begin = () => {
    localStorage.setItem(SEEN_KEY, '1');
    setRoute({ name: 'today' });
  };

  return (
    <div className="app">
      {route.name !== 'threshold' && (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s-8)' }}>
          <button
            onClick={() => setRoute({ name: 'today' })}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'var(--ink)' }}
            aria-label="Firstlight home"
          >
            <img src="/firstlight.svg" width={28} height={28} alt="" />
            <span style={{ fontFamily: 'var(--font-scripture)', fontWeight: 600 }}>Firstlight</span>
          </button>
          <ThemeToggle />
        </header>
      )}

      {route.name === 'threshold' && <Threshold onBegin={begin} />}
      {route.name === 'today' && <Today onOpenChapter={(slug) => setRoute({ name: 'chapter', slug })} />}
      {route.name === 'chapter' && <ChapterReader slug={route.slug} onBack={() => setRoute({ name: 'today' })} />}
    </div>
  );
}
