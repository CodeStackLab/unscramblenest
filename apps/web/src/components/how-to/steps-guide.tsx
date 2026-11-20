import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { howToSteps, type HowToExample } from '@/data/how-to';

function exampleUrl(example: HowToExample): string {
	const params = new URLSearchParams({ q: example.letters });
	if (example.starts) params.set('starts', example.starts);
	if (example.contains) params.set('contains', example.contains);
	if (example.length) params.set('length', example.length);
	return `/?${params.toString()}`;
}

function StepExample({ example }: { example: HowToExample }) {
	return (
		<div className="step-example">
			<div className="example-letters" aria-label={`Letters: ${example.letters}`}>
				{example.letters.split('').map((letter, index) => (
					<span
						key={index}
						className={`example-tile ${letter === '?' || letter === '*' ? 'blank' : ''}`}
					>
						{letter === '?' || letter === '*' ? '?' : letter.toUpperCase()}
					</span>
				))}
			</div>
			<div className="example-filters">
				{example.starts && <span className="example-chip">Starts · {example.starts.toUpperCase()}</span>}
				{example.length && <span className="example-chip">Length · {example.length}</span>}
				{example.contains && <span className="example-chip">Contains · {example.contains.toUpperCase()}</span>}
				{!example.starts && !example.length && !example.contains && (
					<span className="example-chip">No filters</span>
				)}
			</div>
			<p className="step-matches">{example.matches}</p>
			<Link className="example-try" to={exampleUrl(example)}>
				Try this search <ArrowRight size={14} />
			</Link>
		</div>
	);
}

export function StepsGuide() {
	return (
		<section className="how-to-steps" aria-label="Step-by-step guide">
			{howToSteps.map((step, index) => (
				<div className={`how-to-step${step.example ? '' : ' full'}`} key={step.title}>
					<div className="step-body">
						<h3>
							<span className="step-number">{String(index + 1).padStart(2, '0')}</span>
							{step.title}
						</h3>
						<p>{step.body}</p>
					</div>
					{step.example && <StepExample example={step.example} />}
				</div>
			))}
		</section>
	);
}
