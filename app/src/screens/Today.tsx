import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { chapters } from '../content/chapters';
import { getSectionIndex } from '../lib/progress';

// Home. Warm welcome-in regardless of absence; one clear "continue" + one offering.
// No streaks, no guilt, no "you've been gone" (design-system §7).
export function Today({ onOpenChapter }: { onOpenChapter: (slug: string) => void }) {
  const greeting = timeGreeting();
  const ch = chapters[0];
  const started = getSectionIndex(ch.slug) > 0;

  return (
    <div className="rise">
      <p className="overline">{greeting.overline}</p>
      <h1 className="display" style={{ marginBottom: 'var(--s-6)' }}>{greeting.line}</h1>

      <Card onClick={() => onOpenChapter(ch.slug)} style={{ marginBottom: 'var(--s-4)' }}>
        <p className="overline" style={{ color: 'var(--clay)' }}>
          {started ? 'Continue' : 'Start here'} · Part I
        </p>
        <h2 style={{ fontFamily: 'var(--font-scripture)', fontSize: '1.6rem' }}>{ch.title}</h2>
        {ch.subtitle && <p className="muted" style={{ marginBottom: 'var(--s-4)' }}>{ch.subtitle}</p>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
          <Button variant="primary" onClick={() => onOpenChapter(ch.slug)}>
            {started ? 'Continue reading' : 'Begin'}
          </Button>
          <span className="muted" style={{ fontSize: '.85rem' }}>{ch.estMinutes} min</span>
        </div>
      </Card>

      <p className="muted" style={{ fontSize: '.9rem', textAlign: 'center', marginTop: 'var(--s-8)' }}>
        Even five minutes is faithfulness.
      </p>
    </div>
  );
}

function timeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { overline: 'Morning', line: 'Good morning. Glad you’re here.' };
  if (h < 18) return { overline: 'Afternoon', line: 'Good afternoon. Come in.' };
  return { overline: 'Evening', line: 'Good evening. Glad you’re here.' };
}
