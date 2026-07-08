import { useState } from 'react';
import type { Scripture, WordStudy } from '../content/types';

// The app's signature element (design-system §3, UX §4.3): Scripture set apart in
// the serif face, KJV ∥ NASB1995, with an optional word-study reveal.
export function ScriptureBlock({ scripture, wordStudies }: { scripture: Scripture[]; wordStudies?: WordStudy[] }) {
  const [openWord, setOpenWord] = useState<WordStudy | null>(null);

  return (
    <div style={{ margin: 'var(--s-6) 0' }}>
      {scripture.map((s) => (
        <figure
          key={s.ref}
          style={{
            margin: '0 0 var(--s-4)',
            padding: 'var(--s-6)',
            background: 'var(--surface-sunk)',
            borderLeft: '3px solid var(--sage)',
            borderRadius: 'var(--r-sm)',
          }}
        >
          <figcaption className="overline" style={{ marginBottom: 'var(--s-3)' }}>{s.ref}</figcaption>
          {s.translations.map((t) => (
            <blockquote
              key={t.translation}
              style={{
                fontFamily: 'var(--font-scripture)',
                fontSize: '1.2rem',
                lineHeight: 1.7,
                margin: '0 0 var(--s-3)',
                color: 'var(--ink)',
              }}
            >
              {t.text}
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '.7rem',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-faint)',
                  marginTop: 4,
                }}
              >
                {t.translation}
              </span>
            </blockquote>
          ))}
        </figure>
      ))}

      {wordStudies && wordStudies.length > 0 && (
        <div style={{ marginTop: 'var(--s-4)' }}>
          {wordStudies.map((w) => (
            <button
              key={w.lemma}
              onClick={() => setOpenWord(openWord?.lemma === w.lemma ? null : w)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--sage-soft)',
                color: 'var(--sage-deep)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--r-pill)',
                padding: '8px 16px',
                fontSize: '.9rem',
                fontFamily: 'var(--font-scripture)',
              }}
            >
              {w.lemma}
              <span aria-hidden style={{ opacity: 0.6 }}>{openWord?.lemma === w.lemma ? '–' : '+'}</span>
            </button>
          ))}

          {openWord && (
            <div
              className="rise"
              style={{
                marginTop: 'var(--s-4)',
                padding: 'var(--s-4)',
                background: 'var(--surface)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--r-md)',
              }}
            >
              <div className="overline">{openWord.language}{openWord.strongs ? ` · ${openWord.strongs}` : ''}</div>
              {openWord.gloss && <p style={{ margin: '4px 0', fontWeight: 500 }}>{openWord.gloss}</p>}
              {openWord.payoff && <p className="muted" style={{ margin: 0 }}>{openWord.payoff}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
