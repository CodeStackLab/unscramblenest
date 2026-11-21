import { Link } from 'react-router';
import { ArrowRight, BookOpen } from 'lucide-react';

const demos = [
  { tiles: ['C', 'A', '?'], note: 'C, A and one blank → cab, cat, act, ace, arc… Letters can appear in any order.' },
  { tiles: ['S', '?', 'N'], note: 'Two known letters plus a blank → son, sin, sun, san, span, spin, stun…' },
  { tiles: ['?', '?', 'T'], note: 'Two blanks and a T → any word of any length matching your criteria ending or containing T.' },
];

export function BlanksContent() {
  return (
    <section className="home-content" aria-label="Using blank tiles">
      <div className="home-sections">
        <article className="home-block">
          <h2>How Wildcard Blank Tiles Work</h2>
          <p>
            In tile games like Scrabble and Words with Friends, a blank tile has a face value of 0 points but can represent any letter of the alphabet. In UnscrambleNest, type <strong>?</strong> or <strong>*</strong> to insert a wildcard tile.
          </p>
          <p>
            You can enter multiple blanks in a single query. Each blank is dynamically evaluated by our dictionary engine to discover every possible legal word combination across all lengths.
          </p>
        </article>

        <article className="home-block">
          <h2>Blank Tile Strategy: The 25-Point Equity Rule</h2>
          <p>
            Tournament computer simulations reveal that holding a blank tile is worth approximately <strong>+25 points in future equity</strong>. Because a blank tile turns almost any 6-letter stem (like <em>RETINA</em> or <em>TISANE</em>) into an instant 50-point bingo, wasting a wildcard on a simple 15-to-20 point word is statistically negative.
          </p>
          <p>
            Save your blanks until you can play a full 7-letter bingo or lock down an explosive 40+ point parallel play on premium board squares.
          </p>
        </article>
      </div>

      <div style={{ marginTop: 36, padding: '24px 28px', background: 'var(--sand)', border: '1px solid #dcd1c2', borderRadius: 8 }}>
        <h3 style={{ fontFamily: 'Roboto Slab, serif', fontSize: 18, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={18} color="var(--sepia)" /> Deep-Dive Wildcard Guides
        </h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'hsl(var(--muted-foreground))', marginBottom: 14 }}>
          Learn how tournament grandmasters calculate blank tile probability and turn single wildcards into match-winning plays:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link to="/blog/blank-tile-equity-when-to-play-vs-when-to-hold" className="view-all-link">
            Blank Tile Equity: The Mathematical Valuation Rule <ArrowRight size={13} />
          </Link>
          <Link to="/blog/mastering-7-letter-bingos-stems-suffixes" className="view-all-link">
            Mastering 7-Letter Bingos with Wildcards <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <div className="home-faq" style={{ marginTop: 36 }}>
        <h2>Examples of Blank Tile Word Solving</h2>
        <div className="home-faq-list">
          {demos.map(demo => (
            <article key={demo.note} className="home-faq-item">
              <div className="example-letters" aria-label={`Tiles: ${demo.tiles.join(', ')}`}>
                {demo.tiles.map((tile, i) => (
                  <span key={i} className={`example-tile ${tile === '?' ? 'blank' : ''}`}>
                    {tile === '?' ? '?' : tile}
                  </span>
                ))}
              </div>
              <p>{demo.note}</p>
            </article>
          ))}
        </div>
        <Link className="example-try" to="/?q=ca?" style={{ marginTop: 18 }}>
          Run “CA?” in the unscrambler <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
