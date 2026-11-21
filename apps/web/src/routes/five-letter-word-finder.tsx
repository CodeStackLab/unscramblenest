import type { Route } from './+types/five-letter-word-finder';
import { Link } from 'react-router';
import { ArrowRight, BookOpen } from 'lucide-react';
import { seo } from '@/lib/seo';
import { WordTool } from '@/components/tool/word-tool';
import { QuickExamples } from '@/components/five-letter/quick-examples';
import { Faq } from '@/components/five-letter/faq';
import { ToolNotes } from '@/components/tool/tool-notes';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What do the ? and * blank tiles do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each ? or * stands for exactly one unknown letter. Type "star?" and the finder treats it as your four letters (S, T, A, R) plus one blank, then matches every five-letter word made from those — for example "start" and "smart". You can use several blanks, but each fills only a single position.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do the results depend on the included dictionary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unscramblenest searches a single bundled word list — the dwyl English dictionary, roughly 370,000 entries. It includes many uncommon and specialist terms, and like any list it is not complete. A word appearing here is not a guarantee that any particular game will accept it; always check your game’s official dictionary and rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do when a word is missing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'First try removing a filter, adding a blank tile, or checking your spelling — the word may simply need a different letter combination. If it still does not appear, it is most likely absent from the bundled dictionary rather than invalid. You can download the full word list from the dictionary resources to confirm, then rely on your game’s own dictionary for the final ruling.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do the three filters work together?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '“Starts with”, “Exact length” and “Contains” are applied together — a word must satisfy every filter you set. On the 5-letter finder the length is locked to 5, so the “Exact length” control stays fixed while you adjust the other two.',
      },
    },
  ],
};

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Unscramblenest — 5-Letter Word Finder',
    description: 'Find five-letter English words from your letters and wildcard tiles. Explore all included dictionary matches with starting-letter and contains filters.',
    image: 'https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png',
    jsonLd: faqJsonLd,
  });
}

export default function FiveLetterPage() {
  return (
    <>
      <WordTool key="five" mode="five" />
      <QuickExamples />
      <Faq />
      <section className="home-content" style={{ marginTop: 24, paddingBottom: 24 }}>
        <div style={{ padding: '24px 28px', background: 'var(--sand)', border: '1px solid #dcd1c2', borderRadius: 8 }}>
          <h3 style={{ fontFamily: 'Roboto Slab, serif', fontSize: 18, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={18} color="var(--sepia)" /> 5-Letter Word Strategy Guides
          </h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'hsl(var(--muted-foreground))', marginBottom: 14 }}>
            Explore our expert analysis on letter frequency distributions, Wordle entropy reduction, and tournament word patterns:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link to="/blog/mastering-5-letter-words-for-word-games-and-wordle" className="view-all-link">
              High-Utility 5-Letter Words: Letter Frequency Traps <ArrowRight size={13} />
            </Link>
            <Link to="/blog/how-wordle-algorithms-solve-puzzles-in-three-guesses" className="view-all-link">
              The Information Theory of Wordle & Optimal Openers <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
      <ToolNotes />
    </>
  );
}
