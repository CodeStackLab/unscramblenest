import type { Route } from './+types/blog';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Calendar, User, Sparkles } from 'lucide-react';
import { seo } from '@/lib/seo';
import { getAllBlogPosts } from '@/data/blog-posts';

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pageParam = parseInt(url.searchParams.get('page') || '1', 10);
  const allPosts = getAllBlogPosts();
  const totalPosts = allPosts.length;
  const POSTS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(isNaN(pageParam) ? 1 : pageParam, totalPages));

  const isFirstPage = currentPage === 1;
  const featuredPost = isFirstPage ? allPosts[0] : null;
  const pagePosts = isFirstPage
    ? allPosts.slice(1, POSTS_PER_PAGE)
    : allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return {
    posts: pagePosts,
    featuredPost,
    currentPage,
    totalPages,
    totalPosts,
  };
}

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  const origin = matches.find(m => m?.id === 'root')?.loaderData ? (matches.find(m => m?.id === 'root')?.loaderData as { origin?: string })?.origin ?? '' : '';
  const currentPage = loaderData?.currentPage || 1;
  const totalPages = loaderData?.totalPages || 1;
  const pageSuffix = currentPage > 1 ? ` (Page ${currentPage} of ${totalPages})` : '';
  const blogUrl = currentPage > 1 ? `${origin}/blog?page=${currentPage}` : `${origin}/blog`;
  const activePosts = [
    ...(loaderData?.featuredPost ? [loaderData.featuredPost] : []),
    ...(loaderData?.posts || []),
  ];
  const offset = (currentPage - 1) * 10;

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `UnscrambleNest Word Strategy & Anagram Blog${pageSuffix}`,
    description: `Expert strategies, anagram solving techniques, Scrabble tile management guides, and vocabulary insights.${pageSuffix}`,
    url: blogUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Unscramblenest',
      url: origin || 'https://unscramblenest.com',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: activePosts.map((post, index) => ({
        '@type': 'ListItem',
        position: offset + index + 1,
        url: `${origin}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: origin || 'https://unscramblenest.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Blog${pageSuffix}`,
        item: blogUrl,
      },
    ],
  };

  return seo(
    { matches, location },
    {
      title: `Word Strategy & Anagram Guides${pageSuffix} | Unscramblenest Blog`,
      description: `Master word puzzles, tournament Scrabble tile tactics, anagram solving strategies, and high-scoring vocabulary with in-depth guides from Unscramblenest.${pageSuffix}`,
      path: currentPage > 1 ? `/blog?page=${currentPage}` : '/blog',
      image: 'https://images.unsplash.com/photo-1528747310874-b78b2322ffc4?auto=format&fit=crop&w=1200&q=80',
      type: 'website',
      jsonLd: [collectionPageSchema, breadcrumbsSchema],
    }
  );
}

export default function BlogIndexPage({ loaderData }: Route.ComponentProps) {
  const posts = loaderData?.posts || [];
  const featuredPost = loaderData?.featuredPost;
  const currentPage = loaderData?.currentPage || 1;
  const totalPages = loaderData?.totalPages || 1;

  return (
    <main className="blog-main">
      <div className="blog-hero">
        <Link className="back-link" to="/">
          <ArrowLeft size={15} /> Back to word unscrambler
        </Link>
        <span className="eyebrow">
          <span className="tiny-rule" /> STRATEGY &amp; LEXICON GUIDES
        </span>
        <h1>Word Strategy, Anagram Guides &amp; Lexicon Insights</h1>
        <p className="blog-lead">
          Deep-dive analyses, mathematical rack management, cognitive puzzle-solving mental models, and tournament vocabulary tactics curated by word game analysts.
        </p>
      </div>

      {featuredPost && (
        <section className="blog-featured-section" aria-label="Featured Guide">
          <span className="featured-badge">
            <Sparkles size={13} /> FEATURED STRATEGY GUIDE
          </span>
          <article className="featured-card">
            <div className="featured-image-wrap">
              <img
                src={featuredPost.heroImage}
                alt={featuredPost.heroImageAlt}
                loading="eager"
                width={600}
                height={380}
              />
              <span className="featured-category">{featuredPost.category}</span>
            </div>
            <div className="featured-content">
              <div className="card-meta">
                <span><Clock size={13} /> {featuredPost.readTime}</span>
                <span>•</span>
                <span><Calendar size={13} /> Nov 20, 2026</span>
              </div>
              <h2>
                <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>
              <p>{featuredPost.excerpt}</p>
              <div className="card-footer">
                <div className="author-byline">
                  <span className="author-avatar"><User size={13} /></span>
                  <span className="author-name">{featuredPost.author.name}</span>
                </div>
                <Link className="read-more-btn" to={`/blog/${featuredPost.slug}`}>
                  Read Full Guide <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="blog-grid-section" aria-label="Articles Listing">
        <div className="grid-header">
          <span className="eyebrow">
            <span className="tiny-rule" /> {currentPage > 1 ? `PAGE ${currentPage} OF ${totalPages}` : 'ALL ARTICLES'}
          </span>
          <h2>
            {currentPage > 1
              ? `Tactical Word Guides & Tutorials (Page ${currentPage})`
              : 'Tactical Word Guides & Tutorials'}
          </h2>
        </div>

        <div className="blog-grid">
          {posts.map(post => (
            <article key={post.slug} className="blog-card">
              <Link to={`/blog/${post.slug}`} className="card-image-link" tabIndex={-1} aria-hidden="true">
                <img
                  src={post.heroImage}
                  alt={post.heroImageAlt}
                  loading="lazy"
                  width={400}
                  height={240}
                />
                <span className="card-category">{post.category}</span>
              </Link>
              <div className="card-body">
                <div className="card-meta">
                  <span><Clock size={12} /> {post.readTime}</span>
                  <span>•</span>
                  <span><BookOpen size={12} /> {post.wordCount} words</span>
                </div>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <div className="card-footer">
                  <span className="author-name">{post.author.name}</span>
                  <Link className="read-link" to={`/blog/${post.slug}`}>
                    Read guide <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="blog-pagination" aria-label="Blog pagination">
            {currentPage > 1 ? (
              <Link
                to={`/blog${currentPage === 2 ? '' : `?page=${currentPage - 1}`}`}
                className="pagination-btn prev"
              >
                <ArrowLeft size={15} /> Previous
              </Link>
            ) : (
              <span className="pagination-btn disabled">
                <ArrowLeft size={15} /> Previous
              </span>
            )}

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Link
                  key={p}
                  to={`/blog${p === 1 ? '' : `?page=${p}`}`}
                  className={`page-num ${p === currentPage ? 'active' : ''}`}
                  aria-current={p === currentPage ? 'page' : undefined}
                >
                  {p}
                </Link>
              ))}
            </div>

            {currentPage < totalPages ? (
              <Link to={`/blog?page=${currentPage + 1}`} className="pagination-btn next">
                Next <ArrowRight size={15} />
              </Link>
            ) : (
              <span className="pagination-btn disabled">
                Next <ArrowRight size={15} />
              </span>
            )}
          </nav>
        )}
      </section>

      <section className="blog-cta-banner">
        <div className="cta-inner">
          <span className="eyebrow">
            <span className="tiny-rule" /> PUT STRATEGY INTO PRACTICE
          </span>
          <h2>Ready to Unscramble Your Letter Rack?</h2>
          <p>
            Test your tile combinations, explore wildcard blanks, or solve 5-letter puzzles with our lightning-fast algorithmic dictionary tools.
          </p>
          <div className="cta-actions">
            <Link to="/" className="primary-button-link">Word Unscrambler</Link>
            <Link to="/anagram-solver" className="secondary-button-link">Anagram Solver</Link>
            <Link to="/word-unscrambler-with-blanks" className="secondary-button-link">Unscramble with Blanks</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
