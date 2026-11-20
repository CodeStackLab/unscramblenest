import { Link } from 'react-router';
import { ArrowRight, Filter, Sparkles, Type, Wand2 } from 'lucide-react';

type Example = {
  letters: string;
  starts?: string;
  contains?: string;
  title: string;
  description: string;
  icon: 'all' | 'starts' | 'contains' | 'blank';
};

const examples: Example[] = [
  {
    letters: 'stare',
    title: 'Every 5-letter word from STARE',
    description:
      'No filters — just your five letters. The finder returns every five-letter word you can spell, such as aster, rates, stare, tares and tears.',
    icon: 'all',
  },
  {
    letters: 'stare',
    starts: 's',
    title: 'Starts with S',
    description:
      'Add the “Starts with” filter to keep only words beginning with the letter you choose — handy when a game locks the first tile in place.',
    icon: 'starts',
  },
  {
    letters: 'stare',
    contains: 'a',
    title: 'Contains an A',
    description:
      'The “Contains” filter requires a specific letter somewhere in the word. Combine it with a starting letter to narrow the list down fast.',
    icon: 'contains',
  },
  {
    letters: 'star?',
    title: 'Use a blank tile',
    description:
      'A ? or * is one unknown letter. “star?” means S, T, A, R plus any one extra letter — matching words such as start and smart.',
    icon: 'blank',
  },
];

const icons = { all: Sparkles, starts: Filter, contains: Type, blank: Wand2 };

function ExampleCard({ example }: { example: Example }) {
  const Icon = icons[example.icon];
  const params = new URLSearchParams({ q: example.letters, length: '5' });
  if (example.starts) params.set('starts', example.starts);
  if (example.contains) params.set('contains', example.contains);
  return (
    <article className="example-card">
      <div className="example-card-head">
        <Icon size={18} strokeWidth={1.8} />
        <h3>{example.title}</h3>
      </div>
      <div className="example-letters" aria-label={`Letters: ${example.letters}`}>
        {example.letters.split('').map((letter, index) => (
          <span key={index} className={`example-tile ${letter === '?' || letter === '*' ? 'blank' : ''}`}>
            {letter === '?' || letter === '*' ? '?' : letter.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="example-filters">
        <span className="example-chip">Length · 5</span>
        {example.starts && <span className="example-chip">Starts · {example.starts.toUpperCase()}</span>}
        {example.contains && <span className="example-chip">Contains · {example.contains.toUpperCase()}</span>}
        {example.letters.includes('?') && <span className="example-chip">1 blank</span>}
      </div>
      <p>{example.description}</p>
      <Link className="example-try" to={`/5-letter-word-finder?${params.toString()}`}>
        Try this search <ArrowRight size={14} />
      </Link>
    </article>
  );
}

export function QuickExamples() {
  return (
    <section className="five-extras quick-examples" aria-label="Quick example searches">
      <div className="extras-heading">
        <div>
          <span className="eyebrow">SEE IT WORK</span>
          <h2>Quick examples &amp; filters</h2>
        </div>
        <p>Tap any example to run it in the tool above. Each one shows how a filter changes the results.</p>
      </div>
      <div className="example-grid">
        {examples.map(example => (
          <ExampleCard key={example.title} example={example} />
        ))}
      </div>
    </section>
  );
}
