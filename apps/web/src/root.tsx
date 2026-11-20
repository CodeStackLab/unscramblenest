import {
	data,
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	redirect,
	Scripts,
	ScrollRestoration,
} from 'react-router';
import type { Route } from './+types/root';
import stylesheet from '@/index.css?url';
import { preferredOrigin, canonicalRedirectUrl } from '@/lib/preferred-origin.server';
import { HorizonsPreviewScripts } from './horizons-preview-scripts';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieBanner } from '@/components/cookie-banner';

export const links: Route.LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet, precedence: 'default' },
	{ rel: 'icon', href: '/favicon.png', type: 'image/png' },
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap',
	},
];

/**
 * Publishes the site's public origin, which `seo()` reads to build canonical and
 * `og:url` tags, and advertises the sitemap to crawlers that read response
 * headers rather than HTML.
 *
 * A `meta` export can only reach server data through `matches`, and the `headers`
 * export cannot see loader data at all, so both have to travel this way.
 */
export function loader({ request, url }: Route.LoaderArgs) {
	// Server-level 301 from the www variant to the preferred HTTPS non-www
	// domain, preserving the path and query string. Fires only on the
	// production www host — preview and local hosts are left alone.
	const redirectTarget = canonicalRedirectUrl(url);

	if (redirectTarget) {
		return redirect(redirectTarget, { status: 301 });
	}

	// Always publish the preferred origin so canonical and og:url are
	// identical whether the page was reached via www or non-www.
	const origin = preferredOrigin(request);

	return data(
		{ origin },
		{ headers: { Link: `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml"` } },
	);
}

/**
 * A page route that exports `headers` replaces this one, so merge `parentHeaders`
 * there rather than returning only that route's own headers.
 */
export function headers({ loaderHeaders }: Route.HeadersArgs) {
	return loaderHeaders;
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		// suppressHydrationWarning absorbs attributes injected by browser extensions
		// and theme scripts before hydration; attribute-only, one element deep. Keep both.
		<html lang="en" suppressHydrationWarning>
			<head>
				<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-TQP3MX7P" />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());`,
					}}
				/>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<HorizonsPreviewScripts />
				<script
					async
					crossOrigin="anonymous"
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4107704371063029"
				/>
			</head>
			<body suppressHydrationWarning>
				<div id="root">{children}</div>
				<noscript>
					<div style={{ padding: '24px', fontFamily: 'sans-serif', textAlign: 'center' }}>
						Unscramblenest is a word unscrambler, anagram solver, and 5-letter word finder.
						The dictionary search runs in your browser and needs JavaScript enabled to work.
						Please enable JavaScript to find words from your letters.
					</div>
				</noscript>
				<CookieBanner />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><div id="main-content"><Outlet /></div><SiteFooter /></>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const isClientErrorResponse = isRouteErrorResponse(error) && error.status < 500;

	if (import.meta.env.DEV && !isClientErrorResponse) {
		return null;
	}

	let message = 'Oops!';
	let details = 'An unexpected error occurred.';

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
	}

	return (
		<main>
			<h1>{message}</h1>
			<p>{details}</p>
		</main>
	);
}
