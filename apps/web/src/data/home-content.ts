export type HomeBlock = { title: string; paragraphs: string[] };
export type HomeFaqItem = { q: string; a: string };

export const homeBlocks: HomeBlock[] = [
  {
    title: 'How to unscramble letters',
    paragraphs: [
      'Type your letters into the box and press Unscramble. The tool compares the letter frequencies in your tiles against every word in the bundled dictionary, so it never wastes time generating letter permutations.',
      'Results use some or all of your letters. A word never uses a letter more times than you supplied unless a blank tile covers the difference.',
    ],
  },
  {
    title: 'How blank tiles work',
    paragraphs: [
      'Enter ? or * for a blank tile. Each blank stands for exactly one unknown letter, and you can use several at once.',
      'For example, “CA?” supplies C, A and one blank. Letters can appear in any order, so results may include “cab”, “cat”, “act”, “ace” and “arc”.',
    ],
  },
  {
    title: 'Narrow results with filters',
    paragraphs: [
      'Use the four filters together: Starts with, Ends with, Contains, and Exact length. A word must satisfy every filter you set.',
      'Turn on “Use all letters” to see only exact anagrams — words that use every one of your tiles, blanks included.',
    ],
  },
  {
    title: 'Some letters vs. exact anagrams',
    paragraphs: [
      'By default the unscrambler shows words made from some or all of your letters, grouped by length with the longest first.',
      'An exact anagram uses every supplied tile exactly once. Toggle “Use all letters”, or use the dedicated Anagram Solver, to restrict results to full-length matches only.',
    ],
  },
  {
    title: 'Why dictionaries disagree',
    paragraphs: [
      'Word games such as Scrabble, Words With Friends and Wordle each use their own official word lists, and those lists differ from a general English dictionary.',
      'Unscramblenest searches a single broad English word list. It can include rare or specialist terms and may omit words you know. A match here is a dictionary entry, not a guarantee that any particular game will accept it — always check your game’s official dictionary.',
    ],
  },
  {
    title: 'Sort and copy your results',
    paragraphs: [
      'Switch between sorting by length (longest first) and a flat alphabetical list using the Sort control above the results.',
      'Tap any word to copy it to your clipboard. A short confirmation announces the copy for screen readers.',
    ],
  },
];

export const homeFaq: HomeFaqItem[] = [
  {
    q: 'How many letters can I enter?',
    a: 'Up to 15 letters or blank tiles. The search runs in a background Web Worker, so the input stays responsive even while the dictionary loads.',
  },
  {
    q: 'Do uppercase letters matter?',
    a: 'No. The tool normalizes everything to lowercase, so “TEA”, “Tea” and “tea” all produce the same results.',
  },
  {
    q: 'What happens with repeated letters?',
    a: 'Each letter is counted, never duplicated. Entering “AAB” means two A tiles and one B, so a word can use at most two A’s and one B — “aba” matches, but “aaa” does not.',
  },
  {
    q: 'Are the results official for Scrabble or Wordle?',
    a: 'No. Results come from a general English word list, not an official game dictionary. Treat them as candidates, then confirm against your game’s rules.',
  },
  {
    q: 'Is anything sent to a server when I search?',
    a: 'No. The dictionary downloads once from this site, then all matching runs locally in your browser. Your letters and results are not sent anywhere.',
  },
  {
    q: 'Can I share or bookmark a search?',
    a: 'Yes. Your letters and filters are stored in the web address, so you can copy, share and bookmark a search to run it again later in any browser.',
  },
];
