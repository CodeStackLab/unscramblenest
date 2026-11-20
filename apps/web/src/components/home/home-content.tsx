import { homeBlocks, homeFaq } from '@/data/home-content';
export function HomeContent() {
  return <section className="home-content" aria-label="Using the word unscrambler"><div className="home-sections">{homeBlocks.map(block => <article key={block.title} className="home-block"><h2>{block.title}</h2>{block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</article>)}</div><div className="home-faq"><h2>Frequently asked questions</h2><div className="home-faq-list">{homeFaq.map(item => <article key={item.q} className="home-faq-item"><h3>{item.q}</h3><p>{item.a}</p></article>)}</div></div></section>;
}
