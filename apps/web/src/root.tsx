import {
	data,
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	redirect,
	Scripts,
	ScrollRestoration,
	useRouteError,
} from "react-router";
import type { Route } from "./+types/root";
import stylesheet from "@/index.css?url";
import { preferredOrigin, canonicalRedirectUrl } from "@/lib/preferred-origin.server";
import { HorizonsPreviewScripts } from "./horizons-preview-scripts";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieBanner } from "@/components/cookie-banner";

export const links: Route.LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet, precedence: "default" },
	{ rel: "icon", href: "/favicon.png", type: "image/png" },
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
	},
];

export function loader({ request, url }: Route.LoaderArgs) {
	const redirectTarget = canonicalRedirectUrl(url);

	if (redirectTarget) {
		return redirect(redirectTarget, { status: 301 });
	}

	const origin = preferredOrigin(request);

	return data(
		{ origin },
		{ headers: { Link: `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml"` } },
	);
}

export function headers({ loaderHeaders }: Route.HeadersArgs) {
	const headers = new Headers(loaderHeaders);
	headers.set("X-Content-Type-Options", "nosniff");
	headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
	return headers;
}

export function Layout({ children }: { children: React.ReactNode }) {
	const error = useRouteError();
	const isError = Boolean(error);
	const is404 = isRouteErrorResponse(error) && error.status === 404;

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{!isError && (
					<>
						<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-TQP3MX7P" />
						<script
							dangerouslySetInnerHTML={{
								__html: `window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag("js", new Date());`,
							}}
						/>
					</>
				)}
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{isError && (
					<>
						<title>{is404 ? "404 — Page Not Found | UnscrambleNest" : "Error | UnscrambleNest"}</title>
						<meta name="robots" content="noindex, nofollow" />
					</>
				)}
				<Meta />
				<Links />
				<HorizonsPreviewScripts />
				{!isError && (
					<script
						async
						crossOrigin="anonymous"
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4107704371063029"
					/>
				)}
			</head>
			<body suppressHydrationWarning>
				<div id="root">{children}</div>
				<noscript>
					<div style={{ padding: "24px", fontFamily: "sans-serif", textAlign: "center" }}>
						Unscramblenest is a word unscrambler, anagram solver, and 5-letter word finder.
						The dictionary search runs in your browser and needs JavaScript enabled to work.
						Please enable JavaScript to find words from your letters.
					</div>
				</noscript>
				{!isError && <CookieBanner />}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<>
			<a className="skip-link" href="#main-content">
				Skip to content
			</a>
			<SiteHeader />
			<div id="main-content">
				<Outlet />
			</div>
			<SiteFooter />
		</>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const is404 = isRouteErrorResponse(error) && error.status === 404;
	let title = "Oops! An error occurred";
	let message = "An unexpected error occurred while loading this page.";

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			title = "404 — Page Not Found";
			message = "The page or word search you requested could not be found. It may have moved or been updated.";
		} else {
			title = `${error.status} — ${error.statusText || "Application Error"}`;
			message = String(error.data || message);
		}
	}

	return (
		<>
			<a className="skip-link" href="#main-content">
				Skip to content
			</a>
			<SiteHeader />
			<main id="main-content" className="info-main" style={{ textAlign: "center", padding: "64px 20px 80px" }}>
				<span className="eyebrow">UNSCRAMBLENEST / ERROR</span>
				<h1 style={{ fontSize: "36px", margin: "16px 0 12px" }}>{title}</h1>
				<p className="info-intro" style={{ margin: "0 auto 28px", maxWidth: "580px" }}>
					{message}
				</p>
				<div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
					<a
						href="/"
						className="primary-button"
						style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", padding: "12px 24px", minHeight: "44px" }}
					>
						Return to Word Unscrambler
					</a>
					<a
						href="/anagram-solver"
						className="pagination-btn"
						style={{ minHeight: "44px", padding: "12px 20px", display: "inline-flex", alignItems: "center" }}
					>
						Try Anagram Solver
					</a>
				</div>
			</main>
			<SiteFooter />
		</>
	);
}
