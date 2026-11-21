import { Link } from 'react-router';
import { ArrowRight, BookOpen } from 'lucide-react';

export const anagramFaqs = [
  {
    q: 'What is the difference between an anagram and an unscrambler?',
    a: 'An exact anagram uses every single letter you provide exactly once to form a new word of the exact same length (e.g., “LISTEN” → “SILENT”). A general word unscrambler finds all valid words of any length using some or all of your letters.'
  },
  {
    q: 'Can an anagram use blank wildcard tiles?',
    a: 'Yes. In UnscrambleNest, you can enter ? or * as a blank tile. The anagram solver will compute every full-length word that can be formed by substituting the blank with any legal alphabet character.'
  },
  {
    q: 'How does the anagram algorithm find matches instantly?',
    a: 'Rather than generating all factorial permutations (which would take billions of calculations for a 10-letter word), our search engine computes the letter frequency signature of your tiles and matches it against pre-indexed dictionary buckets in a browser Web Worker.'
  },
  {
    q: 'Are multi-word anagrams supported?',
    a: 'UnscrambleNest focuses on single-word dictionary solutions to provide tournament-legal answers for games like Scrabble, Words with Friends, and Boggle.'
  }
];

export function AnagramContent() {
  return (
    <section className="home-content" aria-label="About the Anagram Solver">
      <div className="home-sections">
        <article className="home-block">
          <h2>How the English Anagram Solver Works</h2>
          <p>
            An <strong>anagram</strong> is a word or phrase formed by rearranging the letters of another word, using all original letters exactly once. Classical examples include <em>orchestra → carthorse</em>, <em>astronomer → moon starer</em>, and <em>creative → reactive</em>.
          </p>
          <p>
            When you enter your letters into UnscrambleNest's Anagram Solver, our engine filters out partial substrings and only displays full-length words that utilize every single one of your supplied tiles.
          </p>
        </article>

        <article className="home-block">
          <h2>Cognitive Techniques to Solve Hard Anagrams</h2>
          <p>
            When stuck on a jumble of letters, tournament anagram champions do not stare at the full letter string. Instead, they apply <strong>orthographic decomposition</strong>:
          </p>
          <p>
            <strong>1. Strip common affixes:</strong> Separate prefixes like <em>RE-, UN-, DIS-, PRE-</em> and suffixes like <em>-ING, -ED, -TION, -ABLE</em>. The remaining core root is much easier to solve.
          </p>
          <p>
            <strong>2. Group consonant digraphs:</strong> Pair consonants that naturally cling together in English, such as <em>CH, SH, TH, PH, BL, CL, STR</em>.
          </p>
        </article>
      </div>

      <div style={{ marginTop: 36, padding: '24px 28px', background: 'var(--sand)', border: '1px solid #dcd1c2', borderRadius: 8 }}>
        <h3 style={{ fontFamily: 'Roboto Slab, serif', fontSize: 18, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={18} color="var(--sepia)" /> Master Tournament Anagram Solving
        </h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'hsl(var(--muted-foreground))', marginBottom: 14 }}>
          Want to learn how competitive solvers unscramble 8-to-12 letter words in under five seconds? Read our comprehensive strategy guides:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link to="/blog/anagram-solving-techniques-mental-models" className="view-all-link">
            Anagram Solving Secrets: Cognitive Patterns <ArrowRight size={13} />
          </Link>
          <Link to="/blog/phonics-and-syllable-chunking-unscrambling-long-words" className="view-all-link">
            Cognitive Chunking & Syllable Techniques <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <div className="home-faq" style={{ marginTop: 36 }}>
        <h2>Frequently Asked Questions About Anagrams</h2>
        <div className="home-faq-list">
          {anagramFaqs.map(item => (
            <article key={item.q} className="home-faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
