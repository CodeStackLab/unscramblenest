import { useEffect, useRef, useState } from 'react';
import DictionaryWorker from '@/workers/dictionary.worker?worker';
export type SearchMode = 'standard' | 'anagram' | 'five';
export type SearchFilters = { starts: string; ends: string; contains: string; exclude: string; length: string; lengthMode: 'exact' | 'range'; minLength: string; maxLength: string; useAll: boolean };
export type SearchResults = { id: number; groups: Record<string, string[]>; total: number; letters: string };
export type SortOrder = 'length' | 'alpha';
export function useWordSearch(mode: SearchMode) {
  const worker = useRef<Worker | null>(null);
  const requestId = useRef(0);
  const [retry, setRetry] = useState(0);
  const [dictionaryStatus, setDictionaryStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [dictionaryCount, setDictionaryCount] = useState(0);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  useEffect(() => {
    const instance = new DictionaryWorker();
    worker.current = instance;
    instance.onmessage = event => {
      const message = event.data;
      if (message.type === 'ready') { setDictionaryStatus('ready'); setDictionaryCount(message.count); }
      if (message.type === 'load-error') { setDictionaryStatus('error'); setSearching(false); setError(message.message); }
      if (message.id !== requestId.current) return;
      if (message.type === 'results') { setResults({ id: message.id, groups: message.groups, total: message.total, letters: message.letters }); setSearching(false); setError(''); }
      if (message.type === 'search-error') { setSearching(false); setError(message.message); }
    };
    instance.onerror = () => { setDictionaryStatus('error'); setSearching(false); setError('The word search could not start. Please retry loading the dictionary.'); };
    return () => { instance.terminate(); worker.current = null; };
  }, [retry]);
  function search(letters: string, filters: SearchFilters) {
    // Trim surrounding whitespace so " cat " is treated as "cat" rather than
    // rejected as an unsupported character.
    const value = letters.trim();
    if (!value || !/^[a-z?*]{1,15}$/i.test(value)) { setError('Enter 1–15 English letters. Use ? or * for blank tiles; spaces and other characters are not supported.'); return; }
    if (dictionaryStatus === 'error') { setError('Please retry loading the dictionary before searching.'); return; }
    setError(''); setSearching(true); requestId.current++;
    worker.current?.postMessage({ id: requestId.current, letters: value.toLowerCase(), starts: filters.starts, ends: filters.ends, contains: filters.contains, exclude: filters.exclude, length: filters.length, lengthMode: filters.lengthMode, minLength: filters.minLength, maxLength: filters.maxLength, mode, useAll: filters.useAll });
  }
  function reset() { requestId.current++; setResults(null); setError(''); setSearching(false); }
  function retryDictionary() { setDictionaryStatus('loading'); setError(''); setRetry(value => value + 1); }
  return { dictionaryStatus, dictionaryCount, searching, results, error, search, reset, retryDictionary };
}
