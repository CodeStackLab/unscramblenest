export type HowToExample = {
	letters: string;
	starts?: string;
	contains?: string;
	length?: string;
	matches: string;
};

export type HowToStep = {
	title: string;
	body: string;
	example?: HowToExample;
};

export const howToSteps: HowToStep[] = [
	{
		title: 'Enter your letters',
		body: 'Type 1–15 English letters into the box on the home tool. Uppercase and lowercase work the same way, and you can leave out spaces and punctuation. The Word Unscrambler then finds every word you can make using some or all of those letters.',
		example: {
			letters: 'listen',
			matches: 'Finds “silent”, “enlist”, “tinsel” and “inlets”, plus shorter words such as “list”, “nest” and “tile”.',
		},
	},
	{
		title: 'Use blanks for missing letters',
		body: 'Enter ? or * for a blank tile. Each blank stands for exactly one unknown letter, and you can use several at once. A shorter word may leave a blank unused; a longer word can put it to work.',
		example: {
			letters: 'rea?t',
			matches: 'The blank can supply the c in “react”, “trace” and “crate”, or other letters in shorter words such as “rate”, “tear” and “care”.',
		},
	},
	{
		title: 'Combine the three filters',
		body: '“Starts with” sets the first letter, “Exact length” sets the word length, and “Contains” requires a letter anywhere in the word. All three apply at once, so a match must satisfy every filter you set.',
		example: {
			letters: 'planet',
			starts: 'p',
			length: '5',
			contains: 'a',
			matches: '“planet” with Starts=P, Exact length=5 and Contains=A returns “panel” and “plant”.',
		},
	},
	{
		title: 'Read and explore your results',
		body: 'Results are grouped by length, longest first, and sorted alphabetically within each group. Large groups have page controls and a page selector, so every match stays reachable. Group counts and the overall total cover all pages, not just the words on screen.',
	},
	{
		title: 'Pick the right tool for the job',
		body: 'The Word Unscrambler uses some or all of your tiles. The Anagram Solver uses every tile exactly once, including blanks. The 5-Letter Word Finder limits results to five letters. Choose the one that matches what your game needs — see the three tools below.',
	},
];

export const howToFaq = [
	{
		q: 'What do the ? and * blank tiles do?',
		a: 'Each ? or * stands for exactly one unknown letter. Type “rea?t” and the tool treats it as R, E, A, T plus one blank, then matches words such as “react”, “trace” and “crate”. You can use several blanks, but each fills only a single position. A shorter word may leave a blank unused.',
	},
	{
		q: 'How do the three filters work together?',
		a: '“Starts with”, “Exact length” and “Contains” are applied together — a word must satisfy every filter you set. Set them back to their defaults when you want the broadest search, then press Unscramble to apply your choices.',
	},
	{
		q: 'Does Unscramblenest use all of my letters?',
		a: 'It depends on the tool. The Word Unscrambler uses some or all of your letters. The Anagram Solver uses every supplied tile exactly once, including blanks. The 5-Letter Word Finder uses some or all of your letters but only shows five-letter words.',
	},
	{
		q: 'Which dictionary does it search, and is it complete?',
		a: 'Unscramblenest searches a single bundled list — the dwyl English dictionary, about 370,000 entries. It is broad rather than curated for any one game, so it can include rare or specialist terms and may omit words you know. A match is a dictionary entry, not a guarantee that a game will accept it.',
	},
	{
		q: 'Why is a word I know missing from the results?',
		a: 'It is most likely absent from the bundled dictionary rather than invalid. Try removing a filter, adding a blank tile, or checking your spelling. You can download the full word list from the dictionary resources below to confirm, then rely on your game’s own dictionary for the final ruling.',
	},
	{
		q: 'Can I share or bookmark a search?',
		a: 'Yes. The tool stores your letters and filters in the web address, so you can copy, share and bookmark a search link to run the same search again later in any browser.',
	},
];
