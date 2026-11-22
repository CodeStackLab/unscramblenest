import { Link } from "react-router";
import { ArrowRight, BookOpen, HelpCircle } from "lucide-react";

export const anagramFaqs = [
  {
    q: "What is the difference between an anagram and a general word unscrambler?",
    a: "An exact anagram uses every single letter you provide exactly once to form a new word of the exact same length (e.g., \"LISTEN\" → \"SILENT\" or \"ORCHESTRA\" → \"CARTHORSE\"). In contrast, a general word unscrambler discovers all valid words of any length using some or all of your letters, including shorter 3-letter, 4-letter, and 5-letter sub-words.",
  },
  {
    q: "How does the anagram algorithm find matches instantly without lagging?",
    a: "Rather than generating all factorial permutations (which requires over 3.6 million permutations for just a 10-letter word), our search engine computes an alphabetical letter-frequency key of your tiles. It matches this key against pre-indexed dictionary buckets in a client-side Web Worker in under 10 milliseconds.",
  },
  {
    q: "Can I use wildcard blank tiles in the anagram solver?",
    a: "Yes. You can insert \"?\" or \"*\" as a blank tile. The anagram solver computes every full-length word that can be formed by substituting the blank with any legal alphabet character while requiring every other supplied letter to be used.",
  },
  {
    q: "Are multi-word anagrams supported in UnscrambleNest?",
    a: "UnscrambleNest specializes in single-word lexical solutions to provide tournament-legal answers for games like Scrabble, Words with Friends, Boggle, and Wordle. Multi-word phrases are excluded to maintain tournament lexicon compliance.",
  },
  {
    q: "What is the most effective cognitive technique for solving long anagrams?",
    a: "Cognitive linguists recommend the \"affix stripping\" technique: isolate common prefixes (RE-, UN-, DIS-, PRE-) and suffixes (-ING, -ED, -TION, -ABLE) from your letter pool. Once affixes are segregated, the remaining root letters become significantly easier for the human visual cortex to resolve.",
  },
  {
    q: "Are anagram matches verified against tournament word lists?",
    a: "Our dictionary is based on the open-source dwyl/english-words project (~370,105 entries). While it contains the vast majority of Scrabble (NWL/CSW) words, competitive players should double-check critical tournament challenges against official game sanctioning lexicons.",
  },
];

export function AnagramContent() {
  return (
    <section className="home-content" aria-label="About the Anagram Solver">
      <div className="home-sections">
        <article className="home-block">
          <h2>The Science of Orthographic Transposition</h2>
          <p>
            An <strong>anagram</strong> is the direct result of orthographic transposition—rearranging the letters of an existing word or phrase to produce an entirely new word using all original letters exactly once. Classical English examples date back centuries, from the literary resonance of <em>orchestra → carthorse</em> and <em>astronomer → moon starer</em> to elegant pairings like <em>creative → reactive</em> and <em>dormitory → dirty room</em>.
          </p>
          <p>
            From a computational linguistics perspective, solving an anagram involves calculating an invariant signature known as an &ldquo;anagram key&rdquo;. If you sort the characters of any word alphabetically, every true anagram produces an identical key. For instance, both <em>LEMON</em> and <em>MELON</em> sort to <code>ELMNO</code>. UnscrambleNest leverages this mathematical principle inside a background Web Worker, matching your tiles against 370,105 dictionary entries in under ten milliseconds without freezing your browser.
          </p>
        </article>

        <article className="home-block">
          <h2>The Digraph &amp; Affix Stripping Method</h2>
          <p>
            When confronted with an intimidating 8-to-12 letter scrambled string, the human brain often experiences cognitive overload because English orthography relies on phonotactic chunking rather than raw character-by-character parsing. Tournament champion anagram solvers overcome this limitation using a two-step structural decomposition technique:
          </p>
          <p>
            <strong>1. Strip Bound Morphemes (Affixes):</strong> Scan your letter pool for recurring English prefixes such as <em>RE-</em>, <em>UN-</em>, <em>DIS-</em>, <em>PRE-</em>, or <em>MIS-</em>, and common inflectional or derivational suffixes like <em>-ING</em>, <em>-ED</em>, <em>-TION</em>, <em>-MENT</em>, <em>-EST</em>, or <em>-ABLE</em>. Setting these chunks aside drastically reduces the cognitive complexity of the remaining root letters.
          </p>
          <p>
            <strong>2. Group Consonant Digraphs &amp; Blends:</strong> English consonants rarely appear in arbitrary order. Cluster letters that frequently bond together, including <em>CH</em>, <em>SH</em>, <em>TH</em>, <em>PH</em>, <em>WH</em>, <em>QU</em>, <em>BL</em>, <em>CL</em>, <em>FL</em>, <em>SP</em>, <em>ST</em>, and <em>STR</em>. Once consonant blends are locked into cohesive units, the puzzle transforms from an abstract factorial nightmare into intuitive phonetic syllables.
          </p>
        </article>

        <article className="home-block">
          <h2>Single-Word vs. Multi-Word Anagram Conventions</h2>
          <p>
            In recreational linguistics, anagrams divide into two distinct genres: exact single-word transpositions and multi-word phrases. Single-word anagrams represent the gold standard for competitive word games like Scrabble, Words With Friends, and Boggle, where every play must constitute a recognized dictionary entry conforming to strict lexical rules.
          </p>
          <p>
            Multi-word anagrams—often celebrated in cryptic crosswords and parlor puzzle competitions—permit dividing letters into several smaller words (such as transforming <em>PRESBYTERIAN</em> into <em>BEST IN PRAYER</em>). UnscrambleNest intentionally focuses on single-word resolutions, ensuring that every result returned by our engine is immediately playable on standard tournament game boards and verifiable in competitive reference lexicons.
          </p>
        </article>

        <article className="home-block">
          <h2>Famous Anagrams in Literature, Cryptography, and History</h2>
          <p>
            The fascination with anagrammatic transposition stretches deep into the history of science and literature. During the Renaissance, astronomers used Latin anagrams as cryptographic timestamps to establish priority of scientific discovery before peer review existed. In 1610, Galileo Galilei announced his discovery of the phases of Venus with the coded anagram <em>Haec immatura a me iam frustra leguntur o.y.</em> (&ldquo;These immature things are read by me now in vain&rdquo;), which unscrambled to reveal <em>Cynthiae figuras aemulatur mater amorum</em> (&ldquo;The mother of loves [Venus] imitates the shapes of Cynthia [the Moon]&rdquo;).
          </p>
          <p>
            Similarly, literary icons including Lewis Carroll, Vladimir Nabokov, and William Shakespeare routinely embedded subtle anagrams into character names and dialogue to create layered poetic subtext. Modern cryptographers still study transposition ciphers, where the security of encrypted messages relies on the mathematical intractability of unguided anagram resolution without a decryption key.
          </p>
        </article>
      </div>

      <div
        style={{
          marginTop: 36,
          padding: "24px 28px",
          background: "var(--sand)",
          border: "1px solid #dcd1c2",
          borderRadius: 8,
        }}
      >
        <h3
          style={{
            fontFamily: "Roboto Slab, serif",
            fontSize: 18,
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <BookOpen size={18} color="var(--sepia)" /> Master Tournament Anagram Solving
        </h3>
        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.7,
            color: "hsl(var(--muted-foreground))",
            marginBottom: 14,
          }}
        >
          Want to learn how competitive solvers unscramble 8-to-12 letter words in under five seconds? Read our comprehensive strategy guides:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link
            to="/blog/anagram-solving-techniques-mental-models"
            className="view-all-link"
          >
            Anagram Solving Secrets: Cognitive Patterns <ArrowRight size={13} />
          </Link>
          <Link
            to="/blog/phonics-and-syllable-chunking-unscrambling-long-words"
            className="view-all-link"
          >
            Cognitive Chunking &amp; Syllable Techniques <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <section className="faq" style={{ marginTop: 36 }} aria-label="Frequently Asked Questions">
        <h2 style={{ font: '500 22px "Roboto Slab", serif', marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <HelpCircle size={22} color="var(--sepia)" /> Frequently Asked Questions About Anagrams
        </h2>
        <div className="faq-list">
          {anagramFaqs.map((item, index) => (
            <article key={item.q} className="faq-item">
              <h3>
                <span>0{index + 1}</span> {item.q}
              </h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
