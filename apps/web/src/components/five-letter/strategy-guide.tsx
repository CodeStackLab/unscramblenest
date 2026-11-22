export function FiveLetterStrategyGuide() {
  return (
    <section className="home-content" aria-label="5-Letter Word Strategy & Entropy Guide" style={{ marginTop: 32 }}>
      <div className="home-sections">
        <article className="home-block">
          <h2>The Information Theory of 5-Letter Word Games: Entropy &amp; Letter Frequency</h2>
          <p>
            In modern word deduction games like Wordle, Jotto, and Lingo, every guess is fundamentally an exercise in <strong>Shannon information theory</strong>. Rather than blindly guessing words you hope are correct, optimal solvers evaluate each candidate play based on its <em>expected information gain</em> (measured in bits of entropy).
          </p>
          <p>
            A high-entropy opening guess—such as <code>CRANE</code>, <code>SLATE</code>, <code>TRACE</code>, or <code>ROAST</code>—tests the highest-frequency vowels (A, E, O) alongside the most versatile position-dependent consonants (R, S, T, L, C). By splitting the 2,315-word target solution space into narrow, disjoint subsets based on green, yellow, and gray feedback, a single high-entropy word eliminates over 95% of impossible words on turn one.
          </p>
        </article>

        <article className="home-block">
          <h2>Navigating Consonant Clusters &amp; The &ldquo;Green Tile Trap&rdquo;</h2>
          <p>
            One of the most dangerous pitfalls in 5-letter word puzzles is the <strong>consonant trap</strong>. This occurs when you lock in four green tiles early—for example, discovering that the target word ends in <code>_OUND</code>, <code>_IGHT</code>, <code>_ATCH</code>, or <code>_ILLY</code>. If seven possible words fit the pattern (such as <em>BOUND</em>, <em>FOUND</em>, <em>HOUND</em>, <em>MOUND</em>, <em>POUND</em>, <em>ROUND</em>, <em>SOUND</em>) and you only have three guesses remaining, guessing candidates individually guarantees a statistical loss.
          </p>
          <p>
            In regular play, grandmasters escape this trap using an &ldquo;elimination word&rdquo;—a guess like <code>CHAMP</code> or <code>FORKS</code> that intentionally abandons known green tiles to test four or five candidate consonants simultaneously. In hard mode, where revealed tiles must be reused, players must avoid premature trap structures by prioritizing high-utility vowel dumps in turns one and two.
          </p>
        </article>

        <article className="home-block">
          <h2>Solving Partial Clues with Wildcards and Filters</h2>
          <p>
            The UnscrambleNest 5-Letter Word Finder bridges the gap between deduction and execution. When facing yellow and gray feedback, enter your confirmed letters into the tool along with <strong>?</strong> or <strong>*</strong> for unknown slots.
          </p>
          <p>
            Combine your wildcard query with our &ldquo;Starts with&rdquo; or &ldquo;Contains&rdquo; filters to instantly isolate all matching 5-letter dictionary words. Our in-browser Web Worker matches your constraints against the bundled 370,105-word lexicon, displaying alphabetized options without sending your puzzle state across the network.
          </p>
        </article>
      </div>
    </section>
  );
}
