import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { StepsGuide } from '@/components/how-to/steps-guide';
import { HowToFaq } from '@/components/how-to/how-to-faq';
import { RelatedTools } from '@/components/how-to/related-tools';

export function HowToContent() {
	return (
		<main className="info-main">
			<Link className="back-link" to="/">
				<ArrowLeft size={15} /> Back to the word unscrambler
			</Link>
			<span className="eyebrow">UNSCRAMBLENEST / WORD GUIDE</span>
			<h1>How to unscramble words</h1>
			<p className="info-intro">
				A step-by-step walkthrough of turning a jumble of letters into words with Unscramblenest — covering blank tiles, the three filters, worked examples you can run, and the bundled dictionary’s limits.
			</p>

			<div className="how-to-head">
				<span className="eyebrow">
					<span className="tiny-rule" /> STEP-BY-STEP
				</span>
				<h2>The unscrambling workflow</h2>
				<p>Follow these steps in order, or jump to the one that matches where you are stuck. Each worked example links straight into the tool.</p>
			</div>
			<StepsGuide />

			<div className="how-to-head">
				<span className="eyebrow">
					<span className="tiny-rule" /> GOOD TO KNOW
				</span>
				<h2>Frequently asked questions</h2>
				<p>Short answers about blank tiles, the filters, and what the dictionary covers.</p>
			</div>
			<HowToFaq />

			<div className="how-to-head">
				<span className="eyebrow">
					<span className="tiny-rule" /> CHOOSE YOUR TOOL
				</span>
				<h2>Three ways to search</h2>
				<p>Each tool searches the same dictionary with the same filters, but applies them differently.</p>
			</div>
			<RelatedTools />

			<aside className="source-links">
				<h2>Dictionary resources</h2>
				<a href="https://github.com/dwyl/english-words" target="_blank" rel="noreferrer">
					Source: dwyl/english-words <ArrowUpRight size={14} />
				</a>
				<a href="/dictionary-license.txt">Read the source &amp; license notice <ArrowUpRight size={14} /></a>
				<a href="/words-alpha.txt" download>
					Download the bundled word list <ArrowUpRight size={14} />
				</a>
			</aside>
		</main>
	);
}
