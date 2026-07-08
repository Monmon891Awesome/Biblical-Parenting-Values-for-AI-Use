import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { ScriptureBlock } from '../components/ScriptureBlock';
import { getChapter } from '../content/chapters';
import { SECTION_LABELS, type Section } from '../content/types';
import { getSectionIndex, setSectionIndex } from '../lib/progress';

// One section per screen (UX §4.3): calm, finishable, auto-saves place.
// Ends with the hand-back and a graceful stop — never "what else?".
export function ChapterReader({ slug, onBack }: { slug: string; onBack: () => void }) {
  const chapter = getChapter(slug);
  const [i, setI] = useState<number>(() => Math.min(getSectionIndex(slug), (chapter?.sections.length ?? 1) - 1));

  useEffect(() => {
    setSectionIndex(slug, i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, i]);

  if (!chapter) return <p>Chapter not found.</p>;
  const sections = [...chapter.sections].sort((a, b) => a.order - b.order);
  const section = sections[i];
  const isLast = i === sections.length - 1;

  return (
    <div>
      <button onClick={onBack} className="overline" style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', padding: 0, marginBottom: 'var(--s-4)' }}>
        ← {chapter.title}
      </button>

      {/* quiet progress — "3 of 7", never a pressuring % */}
      <p className="muted" style={{ fontSize: '.8rem' }}>{i + 1} of {sections.length} · {SECTION_LABELS[section.kind]}</p>

      <article className="reading rise" key={i}>
        <SectionView section={section} chapterTitle={chapter.title} first={i === 0} />
      </article>

      <div style={{ display: 'flex', gap: 'var(--s-3)', marginTop: 'var(--s-8)' }}>
        {i > 0 && <Button variant="secondary" onClick={() => setI(i - 1)}>Back</Button>}
        {!isLast && <Button onClick={() => setI(i + 1)}>Continue</Button>}
        {isLast && <Button variant="secondary" onClick={onBack}>Done for today</Button>}
      </div>
    </div>
  );
}

function SectionView({ section, chapterTitle, first }: { section: Section; chapterTitle: string; first: boolean }) {
  return (
    <>
      {first && <h1 className="display" style={{ marginBottom: 'var(--s-6)' }}>{chapterTitle}</h1>}
      {section.heading && !first && <h2 style={{ fontFamily: 'var(--font-scripture)', fontSize: '1.5rem', marginBottom: 'var(--s-4)' }}>{section.heading}</h2>}

      {section.body && paragraphs(section.body)}

      {section.scripture && <ScriptureBlock scripture={section.scripture} wordStudies={section.wordStudies} />}

      {section.questions && (
        <ol style={{ paddingLeft: '1.2em' }}>
          {section.questions.map((q, idx) => (
            <li key={idx} style={{ marginBottom: 'var(--s-4)' }}>{q}</li>
          ))}
        </ol>
      )}

      {section.practice && (
        <div style={{ background: 'var(--clay-soft)', borderRadius: 'var(--r-md)', padding: 'var(--s-6)' }}>
          {paragraphs(section.practice)}
        </div>
      )}

      {section.prayer && (
        <blockquote className="bloom" style={{ fontFamily: 'var(--font-scripture)', fontSize: '1.15rem', lineHeight: 1.7, background: 'var(--surface-sunk)', borderRadius: 'var(--r-md)', padding: 'var(--s-6)', margin: 0 }}>
          {section.prayer}
        </blockquote>
      )}
    </>
  );
}

// Render simple markdown-ish text: split on blank lines, bold **x** inline.
function paragraphs(text: string) {
  return text.split('\n\n').map((p, idx) => (
    <p key={idx} dangerouslySetInnerHTML={{ __html: escapeThenBold(p) }} />
  ));
}
function escapeThenBold(s: string): string {
  const esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
}
