import type { Route } from "./+types/sitemap.xml";
import { preferredOrigin } from "@/lib/preferred-origin.server";
import { getAllBlogPosts } from "@/data/blog-posts";

type SitemapEntry = {
	path: string;
	lastmod?: string;
};

const STATIC_LASTMOD = "2026-11-22";

const STATIC_PATHS = [
	"/",
	"/anagram-solver",
	"/word-unscrambler-with-blanks",
	"/5-letter-word-finder",
	"/how-to-unscramble-words",
	"/blog",
	"/dictionary",
	"/about",
	"/contact",
	"/editorial-policy",
	"/privacy-policy",
	"/terms-of-use",
];

function escapeXml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

function toLoc(origin: string, path: string): string {
	return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function serializeSitemap(origin: string, entries: SitemapEntry[]): string {
	const urls = entries
		.map(entry => {
			const loc = escapeXml(toLoc(origin, entry.path));
			const lastmod = entry.lastmod
				? `\n\t\t<lastmod>${escapeXml(entry.lastmod)}</lastmod>`
				: "";

			return `\t<url>\n\t\t<loc>${loc}</loc>${lastmod}\n\t</url>`;
		})
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function getDynamicEntries(): Promise<SitemapEntry[]> {
	const posts = getAllBlogPosts();
	return posts.map(post => ({
		path: `/blog/${post.slug}`,
		lastmod: post.dateModified || post.datePublished,
	}));
}

export async function loader({ request }: Route.LoaderArgs) {
	const origin = preferredOrigin(request);
	const entries: SitemapEntry[] = [
		...STATIC_PATHS.map(path => ({ path, lastmod: STATIC_LASTMOD })),
		...(await getDynamicEntries()),
	];

	return new Response(serializeSitemap(origin, entries), {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
