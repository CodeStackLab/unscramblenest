import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { infoPages, type InfoPageKey } from '@/data/info-pages';
export function InfoContent({ page }: { page: InfoPageKey }) {
  const content = infoPages[page];
  return <main className="info-main"><Link className="back-link" to="/"><ArrowLeft size={15}/> Back to the word unscrambler</Link><span className="eyebrow">UNSCRAMBLENEST / INFORMATION</span><h1>{content.title}</h1><p className="info-intro">{content.intro}</p>{'email' in content && content.email ? <a className="contact-email" href={`mailto:${content.email}`}>{content.email}</a> : null}<div className="info-sections">{content.sections.map(section => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div><aside className="source-links"><h2>Dictionary resources</h2><a href="https://github.com/dwyl/english-words" target="_blank" rel="noreferrer">Source: dwyl/english-words <ArrowUpRight size={14}/></a><a href="/dictionary-license.txt">Read the source &amp; license notice <ArrowUpRight size={14}/></a><a href="/words-alpha.txt" download>Download the bundled word list <ArrowUpRight size={14}/></a></aside></main>;
}
