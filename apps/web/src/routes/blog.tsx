import type { Route } from './+types/blog';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Calendar, User, Sparkles } from 'lucide-react';
import { seo } from '@/lib/seo';
import { getAllBlogPosts } from '@/data/blog-posts';

export function loader(_args: Route.LoaderArgs) {
  const posts = getAllBlogPosts();
  return { posts };
}

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  const origin = matches.find(m => m?.id === 'root')?.loaderData ? (matches.find(m => m?.id === 'root')?.loaderData as { origin?: string })?.origin ?? '' : '';
  const blogUrl = `${origin}/blog`;
  const posts = loaderData?.posts || [];

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'UnscrambleNest Word Strategy & Anagram Blog',
    description: 'Expert strategies, anagram solving techniques, Scrabble tile management guides, and vocabulary insights.',
    url: blogUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Unscramblenest',
      url: origin || 'https://unscramblenest.com',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
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
        name: 'Blog',
        item: blogUrl,
      },
    ],
  };

  return seo(
    { matches, location },
    {
      title: 'Word Strategy & Anagram Guides | Unscramblenest Blog',
      description: 'Master word puzzles, tournament Scrabble tile tactics, anagram solving strategies, and high-scoring vocabulary with in-depth guides from Unscramblenest.',
      path: '/blog',
      image: 'https://images.unsplash.com/photo-1528747310874-b78b2322ffc4?auto=format&fit=crop&w=1200&q=80',
      type: 'website',
      jsonLd: [collectionPageSchema, breadcrumbsSchema],
    }
  );
}

export default function BlogIndexPage({ loaderData }: Route.ComponentProps) {
  const posts = loaderData?.posts || [];
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

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

      <section className="blog-grid-section" aria-label="Latest Articles">
        <div className="grid-header">
          <span className="eyebrow">
            <span className="tiny-rule" /> ALL ARTICLES
          </span>
          <h2>Tactical Word Guides &amp; Tutorials</h2>
        </div>

        <div className="blog-grid">
          {remainingPosts.map(post => (
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
