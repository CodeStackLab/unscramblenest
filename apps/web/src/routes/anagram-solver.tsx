import type { Route } from './+types/anagram-solver';
import { seo } from '@/lib/seo';
import { WordTool } from '@/components/tool/word-tool';
import { ToolNotes } from '@/components/tool/tool-notes';
import { AnagramContent, anagramFaqs } from '@/components/anagram/anagram-content';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: anagramFaqs.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export function meta({ matches, location }: Route.MetaArgs) {
  return seo({ matches, location }, {
    title: 'English Anagram Solver – Find Full-Length Anagrams | UnscrambleNest',
    description: 'Find full-length English anagrams using all your letters and blank wildcard tiles. Fast dictionary search, alphabetized results, and cognitive solving tips.',
    image: 'https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'UnscrambleNest Anagram Solver',
        applicationCategory: 'GameApplication',
        operatingSystem: 'All',
        description: 'Instant full-length English anagram solver with wildcard blank support and dictionary filtering.',
      },
      faqJsonLd,
    ],
  });
}

export default function AnagramPage() {
  return (
    <>
      <WordTool key="anagram" mode="anagram" />
      <ToolNotes />
      <AnagramContent />
    </>
  );
}
