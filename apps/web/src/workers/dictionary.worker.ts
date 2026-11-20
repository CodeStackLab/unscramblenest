type SearchRequest = { id: number; letters: string; starts: string; ends: string; contains: string; exclude: string; length: string; lengthMode: 'exact' | 'range'; minLength: string; maxLength: string; mode: 'standard' | 'anagram' | 'five'; useAll: boolean };
type Entry = { word: string; counts: Uint8Array };
const scope = self as unknown as { postMessage: (message: unknown) => void; onmessage: ((event: MessageEvent<SearchRequest>) => void) | null };
const dictionary = fetch('/words-alpha.txt').then(async response => {
  if (!response.ok) throw new Error(`Dictionary download failed (${response.status}).`);
  const text = await response.text();
  const all = [...new Set(text.split(/\s+/).map(word => word.toLowerCase()).filter(word => /^[a-z]+$/.test(word)))].sort();
  const entries: Entry[] = all.filter(word => word.length <= 15).map(word => {
    const counts = new Uint8Array(26);
    for (const letter of word) counts[letter.charCodeAt(0) - 97]++;
    return { word, counts };
  });
  scope.postMessage({ type: 'ready', count: all.length, searchableCount: entries.length });
  return entries;
});
void dictionary.catch(() => scope.postMessage({ type: 'load-error', message: 'The dictionary could not load. Check your connection and try again.' }));
scope.onmessage = async event => {
  const request = event.data;
  try {
    const entries = await dictionary;
    const supplied = new Uint8Array(26);
    let blanks = 0;
    for (const letter of request.letters.toLowerCase()) {
      if (letter === '?' || letter === '*') blanks++;
      else supplied[letter.charCodeAt(0) - 97]++;
    }
    // "Use all letters" / anagram mode: the word must use every supplied tile
    // (blanks included), so its length equals the number of tiles entered.
    const exactLength = request.mode === 'anagram' || request.useAll;
    let targetLength = 0;
    let minLen = 0;
    let maxLen = 0;
    if (request.mode === 'five') {
      targetLength = 5;
    } else if (exactLength) {
      targetLength = request.letters.length;
    } else if (request.lengthMode === 'exact') {
      targetLength = Number(request.length);
    } else if (request.lengthMode === 'range') {
      minLen = request.minLength ? Number(request.minLength) : 0;
      maxLen = request.maxLength ? Number(request.maxLength) : 0;
    }
    const exclude = request.exclude ? request.exclude.toLowerCase().replace(/[^a-z]/g, '') : '';
    const groups: Record<string, string[]> = {};
    let total = 0;
    for (const entry of entries) {
      const { word, counts } = entry;
      if (word.length > request.letters.length) continue;
      if (targetLength && word.length !== targetLength) continue;
      if (minLen && word.length < minLen) continue;
      if (maxLen && word.length > maxLen) continue;
      if (request.starts && !word.startsWith(request.starts)) continue;
      if (request.ends && !word.endsWith(request.ends)) continue;
      if (request.contains && !word.includes(request.contains)) continue;
      if (exclude) {
        let hasExcluded = false;
        for (const ch of exclude) { if (word.includes(ch)) { hasExcluded = true; break; } }
        if (hasExcluded) continue;
      }
      let missing = 0;
      for (let i = 0; i < 26; i++) {
        if (counts[i] > supplied[i]) missing += counts[i] - supplied[i];
        if (missing > blanks) break;
      }
      if (missing > blanks) continue;
      (groups[word.length] ??= []).push(word);
      total++;
    }
    scope.postMessage({ type: 'results', id: request.id, groups, total, letters: request.letters });
  } catch {
    scope.postMessage({ type: 'search-error', id: request.id, message: 'The dictionary is unavailable. Please retry loading the dictionary.' });
  }
};
