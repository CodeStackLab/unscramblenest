/**
 * The site's preferred canonical origin.
 *
 * On the production domain this is always the HTTPS non-www variant
 * (https://unscramblenest.com), regardless of how the request arrived —
 * www or non-www, HTTP or HTTPS. Canonical links, og:url and the sitemap
 * all publish this value so every variant consolidates onto one URL,
 * which is what fixes "duplicate without user-selected canonical".
 *
 * Preview and local hosts fall back to the request origin so dev and the
 * editor preview keep working.
 */
import { siteOrigin } from '@/lib/site-origin.server';

const PREFERRED_DOMAIN = 'unscramblenest.com';

export function preferredOrigin(request: Request): string {
	const { host } = new URL(request.url);

	if (host === PREFERRED_DOMAIN || host === `www.${PREFERRED_DOMAIN}`) {
		return `https://${PREFERRED_DOMAIN}`;
	}

	return siteOrigin(request);
}

/**
 * Returns the absolute HTTPS non-www URL to redirect to when the request
 * landed on the www variant of the production domain, preserving the path
 * and query string. Returns null when no redirect is needed (non-www,
 * preview, or local).
 *
 * This is a real server-level 301, not a JavaScript redirect: it is emitted
 * by the root loader before any HTML is rendered.
 */
export function canonicalRedirectUrl(url: URL): string | null {
	if (url.host !== `www.${PREFERRED_DOMAIN}`) return null;
	if (url.pathname.startsWith('/.well-known/')) return null;

	return `https://${PREFERRED_DOMAIN}${url.pathname}${url.search}`;
}
