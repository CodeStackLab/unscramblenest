import type { Route } from './+types/word-unscrambler-with-blanks';
import { seo } from '@/lib/seo';
import { WordTool } from '@/components/tool/word-tool';
import { BlanksContent } from '@/components/blanks/blanks-content';
import { ToolNotes } from '@/components/tool/tool-notes';
export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'Word Unscrambler With Blanks — Wildcard Tile Solver | UnscrambleNest',
    description: 'Use ? and * blank tiles to find words from partial letters. UnscrambleNest treats each blank as one unknown letter and matches every dictionary word you can spell.',
    image: 'https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png',
  });
}
export default function BlanksPage() {
  return <><WordTool key="blanks"/><BlanksContent/><ToolNotes/></>;
}
