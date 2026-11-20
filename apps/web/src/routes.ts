import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('anagram-solver', 'routes/anagram-solver.tsx'),
	route('word-unscrambler-with-blanks', 'routes/word-unscrambler-with-blanks.tsx'),
	route('5-letter-word-finder', 'routes/five-letter-word-finder.tsx'),
	route('how-to-unscramble-words', 'routes/how-to-unscramble-words.tsx'),
	route(':page', 'routes/info.tsx'),
	route('sitemap.xml', 'routes/sitemap.xml.ts'),
	route('robots.txt', 'routes/robots.txt.ts'),
	route('api/health', 'routes/api.health.ts'),
	route('api/*', 'routes/api.$.ts'),
] satisfies RouteConfig;
