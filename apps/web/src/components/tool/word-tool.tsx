import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ArrowRight, Check, Clock, LoaderCircle, RotateCcw, Trash2, X } from 'lucide-react';
import { useWordSearch, type SearchMode, type SearchResults, type SearchFilters, type SortOrder } from '@/hooks/use-word-search';
import { WordResults } from '@/components/tool/word-results';
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const copy = {
  standard: { title: 'Word Unscrambler', description: 'Enter up to 15 letters. We’ll find words you can make. Use ? for a missing letter.', label: 'WORD UNSCRAMBLER', examples: ['RETAIN', 'TEA', 'AAB'] },
  anagram: { title: 'Anagram Solver', description: 'Same letters. A different arrangement. Find every full-length match.', label: 'ANAGRAM SOLVER', examples: ['listen', 'tea'] },
  five: { title: '5-Letter Word Finder', description: 'Find five-letter possibilities from the letters you have.', label: '5-LETTER WORD FINDER', examples: ['stare?', 'crane'] },
};

const RECENT_KEY = 'unscramblenest:recent-searches';
const RECENT_MAX = 8;

type RecentSearch = {
  letters: string;
  starts: string;
  ends: string;
  contains: string;
  exclude: string;
  length: string;
  lengthMode: 'exact' | 'range';
  minLength: string;
  maxLength: string;
  useAll: boolean;
  ts: number;
};

function signature(entry: RecentSearch) {
  return JSON.stringify({ l: entry.letters, s: entry.starts, e: entry.ends, c: entry.contains, x: entry.exclude, len: entry.length, lm: entry.lengthMode, min: entry.minLength, max: entry.maxLength, u: entry.useAll });
}

function loadRecent(): RecentSearch[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e): e is RecentSearch => e && typeof e.letters === 'string').slice(0, RECENT_MAX);
  } catch {
    return [];
  }
}

function persistRecent(entries: RecentSearch[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(entries.slice(0, RECENT_MAX)));
  } catch {
    /* ignore quota / privacy errors */
  }
}

function filterSummary(entry: RecentSearch): string {
  const parts: string[] = [];
  if (entry.useAll) parts.push('all tiles');
  if (entry.starts) parts.push(`starts ${entry.starts.toUpperCase()}`);
  if (entry.ends) parts.push(`ends ${entry.ends.toUpperCase()}`);
  if (entry.contains) parts.push(`has ${entry.contains.toUpperCase()}`);
  if (entry.exclude) parts.push(`no ${entry.exclude.toUpperCase()}`);
  if (!entry.useAll) {
    if (entry.lengthMode === 'exact' && entry.length) parts.push(`${entry.length} letters`);
    else if (entry.lengthMode === 'range') parts.push(`${entry.minLength || 'min'}–${entry.maxLength || 'max'} letters`);
  }
  return parts.join(' · ');
}

export function WordTool({ mode = 'standard' }: { mode?: SearchMode }) {
  const [letters, setLetters] = useState('');
  const [starts, setStarts] = useState('');
  const [ends, setEnds] = useState('');
  const [length, setLength] = useState(mode === 'five' ? '5' : '');
  const [lengthMode, setLengthMode] = useState<'exact' | 'range'>('exact');
  const [minLength, setMinLength] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [contains, setContains] = useState('');
  const [exclude, setExclude] = useState('');
  const [useAll, setUseAll] = useState(mode === 'anagram');
  const [sort, setSort] = useState<SortOrder>('length');
  const [recent, setRecent] = useState<RecentSearch[]>([]);
  const engine = useWordSearch(mode);
  const details = copy[mode];
  const [searchParams] = useSearchParams();
  const lengthDisabled = mode !== 'standard' || useAll;

  const activeFilterChips: string[] = [];
  if (useAll) activeFilterChips.push('Use all letters');
  if (starts) activeFilterChips.push(`Starts ${starts.toUpperCase()}`);
  if (ends) activeFilterChips.push(`Ends ${ends.toUpperCase()}`);
  if (contains) activeFilterChips.push(`Contains ${contains.toUpperCase()}`);
  if (exclude) activeFilterChips.push(`Excludes ${exclude.toUpperCase()}`);
  if (lengthMode === 'exact' && length) activeFilterChips.push(`${length} letters`);
  else if (lengthMode === 'range' && (minLength || maxLength)) activeFilterChips.push(`${minLength || 'min'}–${maxLength || 'max'} letters`);

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  function buildFilters(): SearchFilters {
    return { starts, ends, contains, exclude, length, lengthMode, minLength, maxLength, useAll };
  }

  function recordRecent(value: string, filters: SearchFilters) {
    const entry: RecentSearch = {
      letters: value.toLowerCase(),
      starts: filters.starts,
      ends: filters.ends,
      contains: filters.contains,
      exclude: filters.exclude,
      length: filters.length,
      lengthMode: filters.lengthMode,
      minLength: filters.minLength,
      maxLength: filters.maxLength,
      useAll: filters.useAll,
      ts: Date.now(),
    };
    const existing = loadRecent();
    const next = [entry, ...existing.filter(e => signature(e) !== signature(entry))].slice(0, RECENT_MAX);
    persistRecent(next);
    setRecent(next);
  }

  function runSearch(value: string, filters: SearchFilters) {
    const v = value.trim();
    engine.search(v, filters);
    if (v && /^[a-z?*]{1,15}$/i.test(v)) recordRecent(v, filters);
  }

  function submit(value = letters) { runSearch(value, buildFilters()); }
  function example(value: string) { setLetters(value); runSearch(value, buildFilters()); }

  function rerunRecent(entry: RecentSearch) {
    setLetters(entry.letters);
    setStarts(entry.starts); setEnds(entry.ends); setContains(entry.contains); setExclude(entry.exclude);
    setLength(entry.length); setLengthMode(entry.lengthMode); setMinLength(entry.minLength); setMaxLength(entry.maxLength);
    setUseAll(entry.useAll);
    const filters: SearchFilters = { starts: entry.starts, ends: entry.ends, contains: entry.contains, exclude: entry.exclude, length: entry.length, lengthMode: entry.lengthMode, minLength: entry.minLength, maxLength: entry.maxLength, useAll: entry.useAll };
    runSearch(entry.letters, filters);
  }

  function clearHistory() { persistRecent([]); setRecent([]); }

  function resetFilters() {
    setStarts(''); setEnds(''); setContains(''); setExclude('');
    setLength(mode === 'five' ? '5' : ''); setLengthMode('exact'); setMinLength(''); setMaxLength('');
    setUseAll(mode === 'anagram');
  }

  useEffect(() => {
    const query = searchParams.get('q');
    if (!query) return;
    const nextStarts = searchParams.get('starts') ?? '';
    const nextEnds = searchParams.get('ends') ?? '';
    const nextContains = searchParams.get('contains') ?? '';
    const nextExclude = searchParams.get('exclude') ?? '';
    const nextLength = searchParams.get('length') ?? (mode === 'five' ? '5' : '');
    const nextLengthMode = searchParams.get('lengthMode') === 'range' ? 'range' : 'exact';
    const nextMinLength = searchParams.get('minLength') ?? '';
    const nextMaxLength = searchParams.get('maxLength') ?? '';
    const nextUseAll = searchParams.get('useall') === '1' || mode === 'anagram';
    setStarts(nextStarts); setEnds(nextEnds); setContains(nextContains); setExclude(nextExclude);
    setLength(nextLength); setLengthMode(nextLengthMode); setMinLength(nextMinLength); setMaxLength(nextMaxLength); setUseAll(nextUseAll);
    setLetters(query);
    const filters: SearchFilters = { starts: nextStarts, ends: nextEnds, contains: nextContains, exclude: nextExclude, length: nextLength, lengthMode: nextLengthMode, minLength: nextMinLength, maxLength: nextMaxLength, useAll: nextUseAll };
    runSearch(query, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <main className="tool-main">
      <div className="tool-title">
        <div>
          <div className="eyebrow"><span className="tiny-rule"/> A LITTLE ORDER FOR YOUR LETTERS</div>
          <h1>{details.title}</h1>
          <p>{details.description}</p>
        </div>
        <div className="letter-exhibit" aria-hidden="true">
          <span className="exhibit-label">LETTERS → POSSIBILITIES</span>
          <div><span>N<small>1</small></span><span>E<small>1</small></span><span>S<small>1</small></span><span>T<small>1</small></span></div>
          <i>Every letter has its place.</i>
        </div>
      </div>
      <section className="tool-panel" aria-label={details.title}>
        <div className="panel-top">
          <span className="panel-label"><span className="panel-square"/>{details.label}</span>
          <span className="local-tag"><Check size={13}/> No sign-up. Just words.</span>
        </div>
        <form onSubmit={event => { event.preventDefault(); submit(); }}>
          <label className="input-label" htmlFor="letters">Your letters <span>Up to 15 letters · ? or * for blanks</span></label>
          <div className="input-row">
            <div className="letter-input-wrap">
              <input id="letters" autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={15} placeholder="e.g. listen" value={letters} onChange={event => setLetters(event.target.value)} aria-describedby="letter-help tool-error"/>
              <span className="input-counter">{letters.length}/15</span>
              {letters && <button className="clear-input" type="button" aria-label="Clear letters" onClick={() => { setLetters(''); engine.reset(); }}><X size={17}/></button>}
            </div>
            <button className="primary-button" type="submit">{engine.searching ? <LoaderCircle size={18} className="spin"/> : null}Unscramble <ArrowRight size={18}/></button>
          </div>
          <p id="letter-help" className="input-help">Use some or all of your letters. Each blank tile stands for exactly one letter. Letters can appear in any order.{mode === 'anagram' || useAll ? ' This search uses all your tiles.' : mode === 'five' ? ' Only five-letter words are shown.' : ''}</p>
          {recent.length > 0 && (
            <div className="recent-searches" aria-label="Recent searches">
              <span className="recent-label"><Clock size={11}/> Recent</span>
              <div className="recent-list">
                {recent.map((entry, index) => (
                  <button key={`${entry.ts}-${index}`} type="button" className="recent-chip" onClick={() => rerunRecent(entry)} title={filterSummary(entry) || entry.letters.toUpperCase()}>
                    <span className="recent-letters">{entry.letters.toUpperCase()}</span>
                    {filterSummary(entry) && <span className="recent-filters">{filterSummary(entry)}</span>}
                  </button>
                ))}
              </div>
              <button type="button" className="recent-clear" onClick={clearHistory}><Trash2 size={12}/> Clear history</button>
            </div>
          )}
          <div className="filters-row">
            <div className="filter"><label htmlFor="starts">Starts with</label><select id="starts" value={starts} onChange={event => setStarts(event.target.value)}><option value="">Any letter</option>{alphabet.map(letter => <option key={letter} value={letter}>{letter.toUpperCase()}</option>)}</select></div>
            <div className="filter"><label htmlFor="ends">Ends with</label><select id="ends" value={ends} onChange={event => setEnds(event.target.value)}><option value="">Any letter</option>{alphabet.map(letter => <option key={letter} value={letter}>{letter.toUpperCase()}</option>)}</select></div>
            <div className="filter"><label htmlFor="contains">Contains</label><select id="contains" value={contains} onChange={event => setContains(event.target.value)}><option value="">Any letter</option>{alphabet.map(letter => <option key={letter} value={letter}>{letter.toUpperCase()}</option>)}</select></div>
            <div className="filter"><label htmlFor="exclude">Exclude letters</label><input id="exclude" type="text" autoComplete="off" spellCheck={false} maxLength={15} placeholder="e.g. xyz" value={exclude} onChange={event => setExclude(event.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase())} aria-describedby="exclude-help"/></div>
          </div>
          <div className="filters-row length-row">
            <div className="filter length-filter">
              <label>Length</label>
              <div className="length-control">
                <div className="length-mode" role="group" aria-label="Length filter mode">
                  <button type="button" className={lengthMode === 'exact' ? 'active' : ''} disabled={lengthDisabled} aria-pressed={lengthMode === 'exact'} onClick={() => setLengthMode('exact')}>Exact</button>
                  <button type="button" className={lengthMode === 'range' ? 'active' : ''} disabled={lengthDisabled} aria-pressed={lengthMode === 'range'} onClick={() => setLengthMode('range')}>Range</button>
                </div>
                {lengthMode === 'exact' ? (
                  <select value={length} disabled={lengthDisabled} aria-label="Exact word length" onChange={event => setLength(event.target.value)}>
                    {(mode !== 'five' && !useAll) && <option value="">Any length</option>}
                    {Array.from({ length: 15 }, (_, index) => index + 1).map(number => <option key={number} value={number}>{number} {number === 1 ? 'letter' : 'letters'}</option>)}
                  </select>
                ) : (
                  <div className="length-range">
                    <select value={minLength} disabled={lengthDisabled} aria-label="Minimum word length" onChange={event => setMinLength(event.target.value)}>
                      <option value="">Min</option>
                      {Array.from({ length: 15 }, (_, index) => index + 1).map(number => <option key={number} value={number}>{number}</option>)}
                    </select>
                    <span className="range-dash" aria-hidden="true">–</span>
                    <select value={maxLength} disabled={lengthDisabled} aria-label="Maximum word length" onChange={event => setMaxLength(event.target.value)}>
                      <option value="">Max</option>
                      {Array.from({ length: 15 }, (_, index) => index + 1).map(number => <option key={number} value={number}>{number}</option>)}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="filters-extra">
            <label className="use-all-switch">
              <input type="checkbox" checked={useAll} disabled={mode === 'anagram'} onChange={event => { const next = event.target.checked; setUseAll(next); if (next) { setLength(''); setMinLength(''); setMaxLength(''); } }}/>
              <span className="switch-track"><span className="switch-thumb"/></span>
              <span className="use-all-text"><strong>Use all letters</strong><small>Find exact anagrams that use every tile</small></span>
            </label>
            <button className="reset-filters" type="button" onClick={resetFilters}><RotateCcw size={14}/> Reset filters</button>
          </div>
        </form>
        <div className="panel-bottom">
          <div className="examples">Try an example: {details.examples.map((value, index) => <button key={value} onClick={() => example(value.toLowerCase())}>{value}{index < details.examples.length - 1 ? '' : ''} <ArrowRight size={12}/></button>)}</div>
          <span className="dictionary-status" role="status">{engine.dictionaryStatus === 'loading' ? <><LoaderCircle size={12} className="spin"/>Loading dictionary{engine.searching ? ' · search queued' : '…'}</> : engine.dictionaryStatus === 'ready' ? <><span className="status-dot"/>{engine.dictionaryCount.toLocaleString('en-US')} dictionary entries</> : 'Dictionary unavailable'}</span>
        </div>
      </section>
      <div id="tool-error" className={engine.error ? 'tool-error' : ''} role="alert">{engine.error}{engine.dictionaryStatus === 'error' && <button onClick={engine.retryDictionary}>Retry dictionary</button>}</div>
      <div className="search-status" aria-live="polite">{engine.searching ? engine.dictionaryStatus === 'loading' ? 'Your search is queued and will run when the dictionary is ready.' : 'Finding every matching word…' : engine.results ? `${engine.results.total.toLocaleString('en-US')} matching words found.` : ''}</div>
      {engine.results && engine.results.total > 0 && activeFilterChips.length > 0 && (
        <div className="active-filters" aria-label="Active filters">
          <span className="active-filters-label">Active filters:</span>
          <span className="active-filters-list">
            {activeFilterChips.map(chip => <span key={chip} className="active-filter-chip">{chip}</span>)}
          </span>
        </div>
      )}
      <WordResults results={engine.results} searching={engine.searching} sort={sort} onSortChange={setSort}/>
    </main>
  );
}

export type { SearchResults };
