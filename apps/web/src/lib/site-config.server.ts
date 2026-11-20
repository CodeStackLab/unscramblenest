/**
 * Server-only site configuration read from environment variables.
 *
 * These values are read on the server only (loaders run server-side under SSR;
 * client navigations fetch loader data over the network). Keep this file's
 * imports out of client components.
 */

/** Google Search Console verification token. Empty until the owner sets the
 *  GOOGLE_SITE_VERIFICATION env var. When non-empty it is emitted as a
 *  <meta name="google-site-verification"> tag on the homepage. */
export const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION ?? '';
