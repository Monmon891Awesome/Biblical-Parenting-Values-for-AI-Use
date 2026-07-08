// Compiled content access. In production a build step compiles content/chapters/*.json
// (the repo CMS source, web-app-prd §3.3) into this bundle. The starter ships Chapter 1.

import chapter01 from '../data/chapter-01.json';
import type { Chapter } from './types';

export const chapters: Chapter[] = [chapter01 as Chapter];

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}
