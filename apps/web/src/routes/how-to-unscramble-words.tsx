import type { Route } from './+types/how-to-unscramble-words';
import { seo } from '@/lib/seo';
import { HowToContent } from '@/components/how-to/how-to-content';
import { howToFaq } from '@/data/how-to';

const faqJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: howToFaq.map(item => ({
		'@type': 'Question',
		name: item.q,
		acceptedAnswer: { '@type': 'Answer', text: item.a },
	})),
};

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'How to Unscramble Words — Step-by-Step Guide | Unscramblenest',
		description: 'A step-by-step guide to unscrambling letters with Unscramblenest — wildcard tiles, the three filters, worked examples, and the bundled dictionary’s limits.',
		image: 'https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png',
		jsonLd: faqJsonLd,
	});
}

export default function HowToPage() {
	return <HowToContent />;
}
