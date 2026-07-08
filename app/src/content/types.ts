// Content types — mirror content/schema/chapter.schema.json.
// In production these are generated from the schema; hand-written here for the starter.

export type SectionKind = 'read' | 'word' | 'reflect' | 'practice' | 'together' | 'pray';
export type Translation = 'KJV' | 'NASB1995';

export interface ScriptureTranslation {
  translation: Translation;
  text: string;
}
export interface Scripture {
  ref: string;
  translations: ScriptureTranslation[];
}
export interface WordStudy {
  lemma: string;
  language: 'hebrew' | 'greek';
  strongs?: string;
  gloss?: string;
  payoff?: string;
}
export interface Section {
  kind: SectionKind;
  order: number;
  heading?: string;
  body?: string;
  scripture?: Scripture[];
  wordStudies?: WordStudy[];
  questions?: string[];
  practice?: string;
  prayer?: string;
}
export interface Source {
  ref: string;
  path: string;
}
export interface Chapter {
  id: string;
  slug: string;
  part: number;
  order: number;
  title: string;
  subtitle?: string;
  estMinutes: number;
  coverMotif?: string;
  sections: Section[];
  sources: Source[];
}

export const SECTION_LABELS: Record<SectionKind, string> = {
  read: 'Read',
  word: 'The Word',
  reflect: 'Reflect',
  practice: 'Practice',
  together: 'Together',
  pray: 'Pray',
};
