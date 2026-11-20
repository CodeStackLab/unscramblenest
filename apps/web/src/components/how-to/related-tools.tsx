import { Link } from 'react-router';
import { Asterisk, ArrowRight, Hash, Layers, Shuffle } from 'lucide-react';

const tools = [
	{
		to: '/',
		icon: Layers,
		title: 'Word Unscrambler',
		desc: 'Use some or all of your letters to find every matching word in the dictionary.',
	},
	{
		to: '/anagram-solver',
		icon: Shuffle,
		title: 'Anagram Solver',
		desc: 'Use every tile exactly once, including blanks, for full-length anagrams.',
	},
	{
		to: '/5-letter-word-finder',
		icon: Hash,
		title: '5-Letter Word Finder',
		desc: 'Limit your search to five-letter words, with starting-letter and contains filters.',
	},
	{
		to: '/word-unscrambler-with-blanks',
		icon: Asterisk,
		title: 'Unscrambler With Blanks',
		desc: 'Use ? and * wildcard tiles to find words from partial letters and unknown positions.',
	},
];

export function RelatedTools() {
	return (
		<div className="related-tools">
			{tools.map(tool => {
				const Icon = tool.icon;
				return (
					<Link className="related-card" to={tool.to} key={tool.to}>
						<Icon size={20} strokeWidth={1.8} />
						<h3>{tool.title}</h3>
						<p>{tool.desc}</p>
						<span className="related-try">
							Open tool <ArrowRight size={14} />
						</span>
					</Link>
				);
			})}
		</div>
	);
}
