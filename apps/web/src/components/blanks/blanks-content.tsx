import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
const demos = [
  { tiles: ['C', 'A', '?'], note: 'C, A and one blank → cab, cat, act, ace, arc… Letters can appear in any order.' },
  { tiles: ['S', '?', 'N'], note: 'Two known letters plus a blank → son, sin, sun, san…' },
  { tiles: ['?', '?', 'T'], note: 'Two blanks and a T → any two letters followed by T.' },
];
export function BlanksContent() {
  return <section className="home-content" aria-label="Using blank tiles"><div className="home-sections"><article className="home-block"><h2>What a blank tile does</h2><p>A blank tile (<strong>? or *</strong>) stands for exactly one unknown letter. The solver treats it as a wildcard that can fill any single position, and counts it against your tile supply.</p><p>You can use several blanks at once. Each one covers one letter, so “CA?” is read as C, A and one blank — never as two blanks.</p></article><article className="home-block"><h2>Blanks and repeated letters</h2><p>Blanks only fill letters you did not supply. If you enter “AAB”, the two A tiles are used first; a blank would only be spent if a word needed a third A.</p><p>This keeps results honest: a word never uses a real letter more times than you typed, and a blank is only spent when it is genuinely needed.</p></article></div><div className="home-faq"><h2>Try a blank tile</h2><div className="home-faq-list">{demos.map(demo => <article key={demo.note} className="home-faq-item"><div className="example-letters" aria-label={`Tiles: ${demo.tiles.join(', ')}`}>{demo.tiles.map((tile, i) => <span key={i} className={`example-tile ${tile === '?' ? 'blank' : ''}`}>{tile === '?' ? '?' : tile}</span>)}</div><p>{demo.note}</p></article>)}</div><Link className="example-try" to="/?q=ca?" style={{ marginTop: 18 }}>Run “CA?” in the unscrambler <ArrowRight size={14}/></Link></div></section>;
}
