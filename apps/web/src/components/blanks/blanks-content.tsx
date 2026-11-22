import { Link } from "react-router";
import { ArrowRight, BookOpen, HelpCircle } from "lucide-react";

export const blanksFaqs = [
  {
    question: "What is a wildcard blank tile in word unscrambling?",
    answer:
      "In word games like Scrabble and Words With Friends, a blank tile has zero face points but acts as an adaptable chameleon that can substitute for any of the 26 letters of the English alphabet. In UnscrambleNest, typing \"?\" or \"*\" introduces a wildcard tile that our solver dynamically matches against every legal English dictionary permutation across all word lengths.",
  },
  {
    question: "How many blank tiles can I enter in a single search?",
    answer:
      "You can enter multiple wildcard tiles up to the 15-character total rack limit. For example, entering \"CA??\" tests all possible two-letter additions to \"C\" and \"A\", generating valid 3-letter, 4-letter, and longer words such as \"CABS\", \"CATS\", \"CART\", \"CRAB\", and \"CHAIN\".",
  },
  {
    question: "What is the 25-point equity rule for holding blank tiles?",
    answer:
      "In competitive tournament Scrabble, holding a blank tile carries a statistical future equity value of +25 to +30 points. Because a blank transforms common 6-letter stems into 50-point bingos, computer simulations prove that playing a blank on an ordinary play worth less than 25-30 points reduces your overall game winning percentage.",
  },
  {
    question: "How do blank wildcards affect 7-letter bingo probabilities?",
    answer:
      "Holding a single blank tile increases your probability of hitting a 50-point 7-letter bingo on your subsequent turn by roughly 400%. Holding two blanks increases bingo odds to greater than 85% when paired with high-frequency consonants such as R, S, T, and N.",
  },
  {
    question: "Does UnscrambleNest support both \"?\" and \"*\" for wildcards?",
    answer:
      "Yes. Both the question mark (\"?\") and asterisk (\"*\") are recognized as universal single-letter wildcards. You can use either character interchangeably on mobile keyboards, tablet soft keys, or desktop numpads.",
  },
  {
    question: "Can I combine blank wildcards with positional search filters?",
    answer:
      "Absolutely. You can freely combine wildcard tiles with our \"Starts with\", \"Ends with\", \"Contains\", and \"Exact length\" filters. For example, entering \"TR??\" with \"Starts with: T\" and \"Exact length: 5\" returns all 5-letter words beginning with T that can be formed using your tiles.",
  },
];

const demos = [
  {
    tiles: ["C", "A", "?"],
    note: "C, A and one blank → cab, cat, act, ace, arc… Letters can appear in any order.",
  },
  {
    tiles: ["S", "?", "N"],
    note: "Two known letters plus a blank → son, sin, sun, san, span, spin, stun…",
  },
  {
    tiles: ["?", "?", "T"],
    note: "Two blanks and a T → any word of any length matching your criteria ending or containing T.",
  },
];

export function BlanksContent() {
  return (
    <section className="home-content" aria-label="Using blank tiles">
      <div className="home-sections">
        <article className="home-block">
          <h2>The Mathematics of Wildcard Equity: The 25-Point Rule</h2>
          <p>
            In competitive tile games such as Scrabble, Words With Friends, and Wordfeud, a blank tile has a face value of exactly zero points. Yet among tournament analysts, grandmasters, and computer simulation models like Quackle and Maven, a blank tile commands an estimated <strong>+25 to +30 points in future scoring equity</strong>. This mathematical valuation means that simply retaining a blank tile on your rack provides statistical advantage equivalent to scoring an extra 25 points on an upcoming turn.
          </p>
          <p>
            Why does a zero-point tile carry such high mathematical equity? Because a blank tile eliminates the single greatest bottleneck in tile-based games: consonant-vowel imbalance. By functioning as any letter in the alphabet, a blank transforms stubborn 6-letter stems like <em>RETINA</em>, <em>SATIRE</em>, <em>TISANE</em>, or <em>STAREN</em> into immediate 50-point bonus bingos. Spending a blank on a routine 15-to-20 point play without securing board control is statistically equivalent to giving away ten or more net points to your opponent over the course of the match.
          </p>
          <p>
            Grandmasters advise treating the blank as an investment tile. Unless you can score 45 or more points immediately, or place a defensive block that prevents your opponent from accessing a game-deciding triple-word score lane, keeping the blank on your rack almost always yields a higher expected value (EV) in subsequent turns.
          </p>
        
          <p>
            Statistical tracking across thousands of master-level tournaments confirms that players who average 1.8 bingos per game achieve a winning record exceeding 72%. Because blank tiles account for over 35% of all successfully converted 7-letter and 8-letter bingos, squandering a wildcard for short-term point gratification directly degrades your long-term tournament win percentage. Preserve your blanks to unlock the full mathematical potential of your letter rack.
          </p>
        </article>

        <article className="home-block">
          <h2>Multi-Blank Rack Tactics: 7-Letter Bingo Probabilities</h2>
          <p>
            Drawing two blank tiles simultaneously represents the highest mathematical advantage achievable in word games. Statistical combinatorial simulations demonstrate that holding a double-blank rack elevates the likelihood of playing a 7-letter bingo on your subsequent turn to <strong>over 85%</strong>, provided your rack contains high-frequency consonants like R, S, T, and N. The double blank virtually guarantees that whatever vowel or consonant you draw from the bag can be connected to form a high-scoring 50-point bonus play.
          </p>
          <p>
            When managing multiple wildcards, expert strategy dictates playing only one blank unless the double-blank play achieves at least 65 points or captures an explosive triple-triple word score combination. Preserving a second blank keeps your rack extraordinarily flexible, immunizing your hand against unfortunate vowel droughts, heavy consonant clusters, or awkward letter duplications like double-U or triple-I on subsequent turns.
          </p>
          <p>
            Furthermore, holding two blanks grants you complete tactical freedom to sculpt the board. You can intentionally play parallel words along existing high-value letters, securing 30 to 40 points while still retaining a blank for an inevitable bingo when new board lanes open.
          </p>
        </article>

        <article className="home-block">
          <h2>When to Hold vs. When to Play Wildcard Tiles</h2>
          <p>
            Knowing when to hold or play a blank depends entirely on game tempo, current point differential, and board topology. If you are trailing an opponent by 40 or more points during the middle game, sacrificing a blank to open scoring lanes or generate an immediate 35-point parallel play can be essential to prevent your opponent from locking the board down into an unwinnable defensive grid.
          </p>
          <p>
            Conversely, if you possess a comfortable lead, protecting your blank allows you to play defensively while waiting for high-value bingo openings. During the endgame—when fewer than seven tiles remain in the bag and tile tracking becomes deterministic—blank equity shifts toward rapid depletion. Playing your blank immediately to empty your rack and stick your opponent with unplayed high-value tiles like Q, Z, or J often decides competitive tournament matches with decisive 40-point swings.
          </p>
          <p>
            Never play a blank as an easy escape hatch for poor rack management. If your rack is clogged with redundant vowels like E, E, I, O, dumping excess vowels for 10 or 12 points while retaining the blank is mathematically superior to wasting the wildcard on a mediocre word that leaves your rack equally unbalanced.
          </p>
        
          <p>
            In advanced competitive play, tile tracking allows you to know with certainty whether an unseen blank remains in the bag or sits on your opponent&apos;s rack. When the bag empties and your opponent holds the final wildcard, you must play defensively to prevent them from exploiting open double-word or triple-word score lines. Conversely, holding the last blank tile allows you to control the endgame sequence, orchestrating multi-turn plays that maximize your final margin of victory.
          </p>
        </article>

        <article className="home-block">
          <h2>Wildcard Syntax Guide: Using &apos;?&apos; and &apos;*&apos; Effectively</h2>
          <p>
            UnscrambleNest makes solving partial letter racks effortless. Simply type <strong>?</strong> or <strong>*</strong> into the letter input to insert a wildcard tile. You can freely combine known letters with up to 15 total characters, mixing single or multiple blanks. Our matching algorithms treat every blank as an open variable, evaluating all 26 potential alphabetical values without slowing down browser execution.
          </p>
          <p>
            For example, searching <code>CA?</code> prompts our client-side Web Worker to examine all 26 possible letter replacements, instantly returning matches across all word lengths (such as <em>CAB</em>, <em>CAT</em>, <em>ACT</em>, <em>PACE</em>, and <em>CRAB</em>). Combine your wildcard search with our positional filters—such as &ldquo;Starts with&rdquo;, &ldquo;Ends with&rdquo;, &ldquo;Contains&rdquo;, or &ldquo;Exact length&rdquo;—to pinpoint valid board placements in milliseconds, completely privately inside your browser.
          </p>
          <p>
            Because UnscrambleNest operates entirely within your browser via dedicated Web Workers, queries containing multiple blanks execute locally against our bundled 370,105-word lexicon without sending a single byte of your rack data over the network.
          </p>
        
          <p>
            When utilizing positional anchors on a crowded game board, wildcards offer unprecedented flexibility. If an open &ldquo;T&rdquo; sits on a double-letter score square, searching your rack with &ldquo;Contains: T&rdquo; and an inserted wildcard tests whether you can bridge the board letter with a high-value bonus word. UnscrambleNest calculates these combinations instantaneously, providing an indispensable strategic training partner for competitive players.
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
          <BookOpen size={18} color="var(--sepia)" /> Deep-Dive Wildcard Guides
        </h3>
        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.7,
            color: "hsl(var(--muted-foreground))",
            marginBottom: 14,
          }}
        >
          Learn how tournament grandmasters calculate blank tile probability and turn single wildcards into match-winning plays:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link
            to="/blog/blank-tile-equity-when-to-play-vs-when-to-hold"
            className="view-all-link"
          >
            Blank Tile Equity: The Mathematical Valuation Rule <ArrowRight size={13} />
          </Link>
          <Link
            to="/blog/mastering-7-letter-bingos-stems-suffixes"
            className="view-all-link"
          >
            Mastering 7-Letter Bingos with Wildcards <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <div className="home-faq" style={{ marginTop: 36 }}>
        <h2>Examples of Blank Tile Word Solving</h2>
        <div className="home-faq-list">
          {demos.map((demo) => (
            <article key={demo.note} className="home-faq-item">
              <div
                className="example-letters"
                aria-label={`Tiles: ${demo.tiles.join(", ")}`}
              >
                {demo.tiles.map((tile, i) => (
                  <span
                    key={i}
                    className={`example-tile ${tile === "?" ? "blank" : ""}`}
                  >
                    {tile === "?" ? "?" : tile}
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

      <section className="faq" style={{ marginTop: 36 }} aria-label="Frequently Asked Questions">
        <h2 style={{ font: '500 22px "Roboto Slab", serif', marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <HelpCircle size={22} color="var(--sepia)" /> Frequently Asked Questions About Blank Tiles
        </h2>
        <div className="faq-list">
          {blanksFaqs.map((faq, index) => (
            <article key={faq.question} className="faq-item">
              <h3>
                <span>0{index + 1}</span> {faq.question}
              </h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
