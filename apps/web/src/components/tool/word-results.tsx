import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Copy, Search } from 'lucide-react';
import type { SearchResults, SortOrder } from '@/hooks/use-word-search';
const PAGE_SIZE = 60;
function useCopy() {
  const [copied, setCopied] = useState('');
  function copy(word: string) {
    const done = () => setCopied(word);
    if (navigator.clipboard?.writeText) { navigator.clipboard.writeText(word).then(done).catch(done); }
    else { const el = document.createElement('textarea'); el.value = word; document.body.appendChild(el); el.select(); try { document.execCommand('copy'); } catch { /* ignore */ } document.body.removeChild(el); done(); }
    window.setTimeout(() => setCopied(current => (current === word ? '' : current)), 1800);
  }
  return { copied, copy };
}
function WordButton({ word, copied, onCopy }: { word: string; copied: string; onCopy: (word: string) => void }) {
  const isCopied = copied === word;
  return (
    <li>
      <button type="button" className="word-chip" aria-label={`${word} — copy to clipboard`} onClick={() => onCopy(word)}>
        <span className="word-chip-text">{word}</span>
        <span className="word-chip-icon" aria-hidden="true">{isCopied ? <Check size={13} /> : <Copy size={13} />}</span>
      </button>
    </li>
  );
}
function LengthGroup({ length, words, copied, onCopy }: { length: number; words: string[]; copied: string; onCopy: (word: string) => void }) {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(words.length / PAGE_SIZE);
  return <section className="length-group" aria-label={`${length}-letter words`}><div className="group-heading"><h3><span>{length}</span> {length}-letter words <small>({words.length.toLocaleString('en-US')})</small></h3><span className="alphabet-label">A–Z</span></div><ul className="word-grid">{words.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map(word => <WordButton key={word} word={word} copied={copied} onCopy={onCopy} />)}</ul>{pages > 1 && <div className="pagination"><span>Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, words.length)} of {words.length.toLocaleString('en-US')}</span><div><button disabled={page === 0} aria-label={`Previous page of ${length}-letter words`} onClick={() => setPage(value => value - 1)}><ArrowLeft size={15}/></button><label>Page <select aria-label={`Page of ${length}-letter words`} value={page} onChange={event => setPage(Number(event.target.value))}>{Array.from({ length: pages }, (_, index) => <option value={index} key={index}>{index + 1}</option>)}</select> of {pages}</label><button disabled={page === pages - 1} aria-label={`Next page of ${length}-letter words`} onClick={() => setPage(value => value + 1)}><ArrowRight size={15}/></button></div></div>}</section>;
}
function AlphaList({ words, copied, onCopy }: { words: string[]; copied: string; onCopy: (word: string) => void }) {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(words.length / PAGE_SIZE);
  return <section className="length-group" aria-label="All words, alphabetical"><div className="group-heading"><h3>All words <small>({words.length.toLocaleString('en-US')})</small></h3><span className="alphabet-label">A–Z</span></div><ul className="word-grid">{words.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map(word => <WordButton key={word} word={word} copied={copied} onCopy={onCopy} />)}</ul>{pages > 1 && <div className="pagination"><span>Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, words.length)} of {words.length.toLocaleString('en-US')}</span><div><button disabled={page === 0} aria-label="Previous page" onClick={() => setPage(value => value - 1)}><ArrowLeft size={15}/></button><label>Page <select aria-label="Page" value={page} onChange={event => setPage(Number(event.target.value))}>{Array.from({ length: pages }, (_, index) => <option value={index} key={index}>{index + 1}</option>)}</select> of {pages}</label><button disabled={page === pages - 1} aria-label="Next page" onClick={() => setPage(value => value + 1)}><ArrowRight size={15}/></button></div></div>}</section>;
}
export function WordResults({ results, searching, sort, onSortChange }: { results: SearchResults | null; searching: boolean; sort: SortOrder; onSortChange: (sort: SortOrder) => void }) {
  const { copied, copy } = useCopy();
  const flatWords = useMemo(() => {
    if (!results || sort !== 'alpha') return [];
    return Object.values(results.groups).flat().sort((a, b) => a.localeCompare(b));
  }, [results, sort]);
  if (!results) return <section className="empty-results"><span className="empty-icon"><Search size={25} strokeWidth={1.5}/></span><h2>A good word starts here.</h2><p>Enter your letters above and we’ll find their possibilities.<br/>From the longest discoveries to the smallest words.</p><span className="empty-caption">YOUR LETTERS. MORE POSSIBILITIES.</span></section>;
  return <section className={`results ${searching ? 'results-pending' : ''}`} aria-busy={searching}><div className="results-heading"><div><span className="eyebrow">THE POSSIBILITIES</span><h2>{results.total.toLocaleString('en-US')} {results.total === 1 ? 'word' : 'words'} found</h2><p>From <strong className="result-letters">{results.letters}</strong>{sort === 'length' ? ' · longest first, alphabetical within each length' : ' · alphabetical across all lengths'}</p></div>{results.total > 0 && <div className="sort-control" role="group" aria-label="Sort results"><span className="sort-label">Sort</span><button type="button" className={sort === 'length' ? 'sort-option active' : 'sort-option'} aria-pressed={sort === 'length'} onClick={() => onSortChange('length')}>By length</button><button type="button" className={sort === 'alpha' ? 'sort-option active' : 'sort-option'} aria-pressed={sort === 'alpha'} onClick={() => onSortChange('alpha')}>A–Z</button></div>}</div><div className="copy-feedback" aria-live="polite">{copied ? `Copied “${copied}” to clipboard.` : ''}</div>{results.total === 0 ? <div className="no-results"><Search size={25}/><h3>No matching words this time.</h3><p>Try removing a filter, checking your letters, or adding a blank tile. The included dictionary may not contain the word you expect.</p></div> : sort === 'alpha' ? <AlphaList words={flatWords} copied={copied} onCopy={copy} /> : Object.keys(results.groups).map(Number).sort((a, b) => b - a).map(length => <LengthGroup key={`${results.id}-${length}`} length={length} words={results.groups[length]} copied={copied} onCopy={copy} />)}<p className="dictionary-note">Tap any word to copy it. Results depend on the bundled <a href="https://github.com/dwyl/english-words" target="_blank" rel="noreferrer">dwyl English dictionary</a> (<a href="/dictionary-license.txt">source &amp; license notice</a>). Words longer than 15 letters cannot match. Inclusion does not guarantee acceptance in any official word game. Spot a missing or questionable word? <a href="mailto:support@unscramblenest.com">Let us know</a>.</p></section>;
}
