import type { Route } from './+types/blog-post';
import { Link } from 'react-router';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Share2,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Info,
  Layers,
} from 'lucide-react';
import { seo } from '@/lib/seo';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blog-posts';

export function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  if (!slug) {
    throw new Response('Post slug required', { status: 400 });
  }

  const post = getBlogPostBySlug(slug);
  if (!post) {
    throw new Response('Article not found', { status: 404 });
  }

  const relatedPosts = getRelatedPosts(slug, 2);
  return { post, relatedPosts };
}

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  if (!loaderData?.post) {
    return seo(
      { matches, location },
      {
        title: 'Article Not Found | Unscramblenest',
        description: 'The requested word puzzle strategy article could not be found.',
        noindex: true,
      }
    );
  }

  const { post } = loaderData;
  const origin = matches.find(m => m?.id === 'root')?.loaderData ? (matches.find(m => m?.id === 'root')?.loaderData as { origin?: string })?.origin ?? '' : '';
  const postUrl = `${origin}/blog/${post.slug}`;
  const imageUrl = post.heroImage.startsWith('http') ? post.heroImage : `${origin}${post.heroImage}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: post.title,
    description: post.metaDescription,
    image: [imageUrl],
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${origin}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Unscramblenest',
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/favicon.png`,
      },
    },
    articleSection: post.category,
    wordCount: post.wordCount,
    inLanguage: 'en-US',
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
        item: `${origin}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : undefined;

  const jsonLdList: object[] = [articleSchema, breadcrumbsSchema];
  if (faqSchema) {
    jsonLdList.push(faqSchema);
  }

  const tags = seo(
    { matches, location },
    {
      title: post.metaTitle || `${post.title} | Unscramblenest Blog`,
      description: post.metaDescription,
      path: `/blog/${post.slug}`,
      image: imageUrl,
      type: 'article',
      jsonLd: jsonLdList,
    }
  );

  tags.push(
    { property: 'article:published_time', content: post.datePublished },
    { property: 'article:modified_time', content: post.dateModified || post.datePublished },
    { property: 'article:author', content: post.author.name },
    { property: 'article:section', content: post.category }
  );

  for (const tag of post.tags || []) {
    tags.push({ property: 'article:tag', content: tag });
  }

  return tags;
}

export default function BlogPostPage({ loaderData }: Route.ComponentProps) {
  const { post, relatedPosts } = loaderData;

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <article className="blog-post-page">
      <nav aria-label="Breadcrumbs" className="blog-breadcrumbs">
        <Link to="/">Home</Link>
        <span className="crumb-sep">/</span>
        <Link to="/blog">Blog</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{post.category}</span>
      </nav>

      <header className="article-header">
        <Link className="back-link" to="/blog">
          <ArrowLeft size={14} /> Back to all guides
        </Link>
        <div className="article-badges">
          <span className="category-pill">{post.category}</span>
          <span className="reading-time-pill"><Clock size={12} /> {post.readTime}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="article-lead">{post.leadSummary}</p>

        <div className="author-bar">
          <div className="author-info">
            <span className="author-avatar"><User size={16} /></span>
            <div>
              <span className="author-name">{post.author.name}</span>
              <span className="author-role">{post.author.role}</span>
            </div>
          </div>
          <div className="publication-meta">
            <span><Calendar size={13} /> {formatDate(post.datePublished)}</span>
            <span>•</span>
            <span>Updated {formatDate(post.dateModified)}</span>
          </div>
        </div>
      </header>

      <div className="hero-image-container">
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          className="article-hero-img"
          loading="eager"
          width={1200}
          height={630}
        />
        <figcaption className="hero-caption">
          Photo by{' '}
          <a
            href={post.heroImagePhotographerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.heroImagePhotographer}
          </a>{' '}
          on Unsplash
        </figcaption>
      </div>

      <div className="article-layout">
        <aside className="article-sidebar" aria-label="Table of Contents">
          <div className="sidebar-sticky">
            <div className="toc-box">
              <span className="toc-title"><Bookmark size={14} /> TABLE OF CONTENTS</span>
              <ul className="toc-list">
                {post.sections.map((section, idx) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span className="toc-num">{idx + 1}.</span> {section.heading}
                    </a>
                  </li>
                ))}
                {post.keyTakeaways && (
                  <li>
                    <a href="#key-takeaways">
                      <span className="toc-num">★</span> Key Takeaways
                    </a>
                  </li>
                )}
                {post.faqs && post.faqs.length > 0 && (
                  <li>
                    <a href="#frequently-asked-questions">
                      <span className="toc-num">?</span> Frequently Asked Questions
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="sidebar-tool-card">
              <span className="sidebar-card-label"><Layers size={13} /> UNSCRAMBLE TOOL</span>
              <h4>Put It Into Practice</h4>
              <p>Unscramble any letter rack, test wildcards, and filter word lengths instantly.</p>
              <Link to={post.relatedTool?.url || '/'} className="sidebar-cta-btn">
                {post.relatedTool?.buttonText || 'Open Tool'} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </aside>

        <div className="article-body">
          {post.sections.map((section, idx) => (
            <section key={section.id} id={section.id} className="article-section">
              <h2>
                <span className="section-index">{idx + 1}</span> {section.heading}
              </h2>

              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}

              {section.callout && (
                <aside className={`article-callout callout-${section.callout.type}`}>
                  <div className="callout-header">
                    {section.callout.type === 'tip' && <Lightbulb size={17} />}
                    {section.callout.type === 'warning' && <AlertTriangle size={17} />}
                    {section.callout.type === 'strategy' && <CheckCircle2 size={17} />}
                    {section.callout.type === 'info' && <Info size={17} />}
                    <strong>{section.callout.title}</strong>
                  </div>
                  <p>{section.callout.text}</p>
                </aside>
              )}

              {section.table && (
                <div className="table-wrapper">
                  {section.table.caption && (
                    <div className="table-caption">{section.table.caption}</div>
                  )}
                  <table className="article-table">
                    <thead>
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.subsections && section.subsections.map(sub => (
                <div key={sub.id} id={sub.id} className="article-subsection">
                  <h3>{sub.heading}</h3>
                  {sub.content.map((subP, subPIdx) => (
                    <p key={subPIdx}>{subP}</p>
                  ))}
                  {sub.callout && (
                    <aside className={`article-callout callout-${sub.callout.type}`}>
                      <div className="callout-header">
                        <strong>{sub.callout.title}</strong>
                      </div>
                      <p>{sub.callout.text}</p>
                    </aside>
                  )}
                  {sub.table && (
                    <div className="table-wrapper">
                      {sub.table.caption && <div className="table-caption">{sub.table.caption}</div>}
                      <table className="article-table">
                        <thead>
                          <tr>
                            {sub.table.headers.map((h, hIdx) => (
                              <th key={hIdx}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sub.table.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </section>
          ))}

          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <section id="key-takeaways" className="key-takeaways-box">
              <h3>
                <CheckCircle2 size={18} /> Strategic Key Takeaways
              </h3>
              <ul>
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {post.faqs && post.faqs.length > 0 && (
            <section id="frequently-asked-questions" className="article-faq-section">
              <span className="eyebrow">
                <span className="tiny-rule" /> EXPERT Q&amp;A
              </span>
              <h3>Frequently Asked Questions</h3>
              <div className="faq-container">
                {post.faqs.map((faq, idx) => (
                  <div key={idx} className="faq-block">
                    <h4>
                      <HelpCircle size={15} /> {faq.question}
                    </h4>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="article-tool-cta">
            <span className="eyebrow">
              <span className="tiny-rule" /> INTERACTIVE SOLVER
            </span>
            <h3>{post.relatedTool.title}</h3>
            <p>{post.relatedTool.description}</p>
            <div className="cta-button-row">
              <Link to={post.relatedTool.url} className="cta-primary-btn">
                {post.relatedTool.buttonText} <ArrowRight size={15} />
              </Link>
              <Link to="/how-to-unscramble-words" className="cta-secondary-btn">
                Read Unscrambler Guide
              </Link>
            </div>
          </div>

          <aside className="author-card" aria-label="About the Author">
            <span className="author-card-avatar"><User size={24} /></span>
            <div className="author-card-body">
              <span className="written-by">WRITTEN BY</span>
              <h4>{post.author.name}</h4>
              <span className="author-card-role">{post.author.role}</span>
              <p>{post.author.bio}</p>
            </div>
          </aside>
        </div>
      </div>

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="related-articles-section">
          <div className="related-header">
            <span className="eyebrow">
              <span className="tiny-rule" /> KEEP READING
            </span>
            <h2>Related Word Strategy Guides</h2>
          </div>
          <div className="related-grid">
            {relatedPosts.map(rel => (
              <article key={rel.slug} className="related-card-item">
                <Link to={`/blog/${rel.slug}`} className="related-img-link" tabIndex={-1} aria-hidden="true">
                  <img
                    src={rel.heroImage}
                    alt={rel.heroImageAlt}
                    loading="lazy"
                    width={360}
                    height={200}
                  />
                  <span className="related-category">{rel.category}</span>
                </Link>
                <div className="related-content">
                  <div className="card-meta">
                    <span><Clock size={12} /> {rel.readTime}</span>
                  </div>
                  <h3>
                    <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <p>{rel.excerpt}</p>
                  <Link className="read-link" to={`/blog/${rel.slug}`}>
                    Read guide <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
