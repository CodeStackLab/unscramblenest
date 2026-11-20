import { Link } from 'react-router';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { homeBlocks, homeFaq } from '@/data/home-content';
import { blogPosts } from '@/data/blog-posts';

export function HomeContent() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="home-content" aria-label="Using the word unscrambler">
      <div className="home-sections">
        {homeBlocks.map(block => (
          <article key={block.title} className="home-block">
            <h2>{block.title}</h2>
            {block.paragraphs.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>

      <div className="home-blog-preview">
        <div className="home-blog-header">
          <div>
            <span className="blog-badge">
              <BookOpen size={13} /> Strategy & Guides
            </span>
            <h2>Tournament Word Game Strategies & Anagram Guides</h2>
            <p>
              Master competitive Scrabble tile management, rack balance, high-probability bingo stems, and mental models to unscramble any jumble of letters.
            </p>
          </div>
          <Link to="/blog" className="view-all-link">
            Explore all guides <ArrowRight size={14} />
          </Link>
        </div>

        <div className="home-blog-grid">
          {featuredPosts.map(post => (
            <article key={post.slug} className="blog-card">
              <Link to={`/blog/${post.slug}`} className="card-image-link" tabIndex={-1} aria-hidden="true">
                <img
                  src={post.heroImage}
                  alt={post.heroImageAlt || post.title}
                  loading="lazy"
                  width={400}
                  height={250}
                />
                <span className="card-category">{post.category}</span>
              </Link>
              <div className="card-body">
                <div className="card-meta">
                  <span>
                    <Clock size={12} /> {post.readTime}
                  </span>
                  <span>·</span>
                  <span>{post.wordCount.toLocaleString()} words</span>
                </div>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="read-link">
                  Read guide <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="home-faq">
        <h2>Frequently asked questions</h2>
        <div className="home-faq-list">
          {homeFaq.map(item => (
            <article key={item.q} className="home-faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
