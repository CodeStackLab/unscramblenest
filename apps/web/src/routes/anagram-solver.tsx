import type { Route } from './+types/anagram-solver';
import { seo } from '@/lib/seo';
import { WordTool } from '@/components/tool/word-tool';
import { ToolNotes } from '@/components/tool/tool-notes';
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Unscramblenest — English Anagram Solver', description: 'Find full-length English anagrams using all your letters and blank tiles. Unscramblenest searches a bundled dictionary with complete, alphabetical results.', image: 'https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png' }); }
export default function AnagramPage() { return <><WordTool key="anagram" mode="anagram"/><ToolNotes/></>; }
