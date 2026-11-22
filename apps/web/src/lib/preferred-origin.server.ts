import { siteOrigin } from "@/lib/site-origin.server";

const PREFERRED_DOMAIN = "unscramblenest.com";

export function preferredOrigin(request: Request): string {
	const { host } = new URL(request.url);

	if (host === PREFERRED_DOMAIN || host === `www.${PREFERRED_DOMAIN}`) {
		return `https://${PREFERRED_DOMAIN}`;
	}

	return siteOrigin(request);
}

/**
 * Returns the absolute URL to redirect to when:
 * 1. The request landed on the www variant of the production domain, or
 * 2. The request has a trailing slash on a non-root path (e.g. /anagram-solver/ -> /anagram-solver).
 *
 * Returns null when no redirect is needed.
 * Emits a real server-level 301 redirect before any HTML is rendered.
 */
export function canonicalRedirectUrl(url: URL): string | null {
	if (url.pathname.startsWith("/.well-known/")) return null;

	const hasTrailingSlash = url.pathname !== "/" && url.pathname.endsWith("/");
	const cleanPath = hasTrailingSlash ? url.pathname.replace(/\/+$/, "") : url.pathname;

	// WWW to non-WWW redirect (with path normalization)
	if (url.host === `www.${PREFERRED_DOMAIN}`) {
		return `https://${PREFERRED_DOMAIN}${cleanPath}${url.search}`;
	}

	// Trailing slash redirect on production non-WWW
	if (url.host === PREFERRED_DOMAIN && hasTrailingSlash) {
		return `https://${PREFERRED_DOMAIN}${cleanPath}${url.search}`;
	}

	// Trailing slash redirect on local or preview environments
	if (hasTrailingSlash) {
		return `${url.origin}${cleanPath}${url.search}`;
	}

	return null;
}
