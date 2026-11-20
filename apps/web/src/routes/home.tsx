import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { googleSiteVerification } from '@/lib/site-config.server';
import { WordTool } from '@/components/tool/word-tool';
import { ToolNotes } from '@/components/tool/tool-notes';
import { HomeContent } from '@/components/home/home-content';
import { homeFaq } from '@/data/home-content';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaq.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export function loader(_args: Route.LoaderArgs) {
  // Configurable Google Search Console verification. Empty until the owner
  // supplies a verification token via the GOOGLE_SITE_VERIFICATION env var.
  return { googleVerification: googleSiteVerification };
}

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  const tags = seo({ matches, location }, {
    title: 'Word Unscrambler – Find Words From Letters | UnscrambleNest',
    description: 'Unscramble letters into words with UnscrambleNest. Find anagrams, use blank tiles, and filter results by word length, starting letters, and more.',
    image: 'https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Unscramblenest', description: 'English dictionary-based word unscrambler, anagram solver, and five-letter word finder.' },
      { '@context': 'https://schema.org', '@type': 'Organization', name: 'Unscramblenest' },
      faqJsonLd,
    ],
  });
  if (loaderData?.googleVerification) {
    tags.push({ name: 'google-site-verification', content: loaderData.googleVerification });
  }
  return tags;
}

export default function HomePage() {
  return (
    <>
      <WordTool />
      <ToolNotes />
      <HomeContent />
    </>
  );
}
