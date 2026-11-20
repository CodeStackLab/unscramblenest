import { NavLink, Link } from 'react-router';
import { Layers, ArrowUpRight } from 'lucide-react';
export function SiteHeader() {
  return <header className="site-header"><div className="header-inner"><Link className="brand" to="/" aria-label="Unscramblenest home"><span className="brand-mark"><Layers size={23} strokeWidth={1.7}/></span>Unscramblenest<span className="brand-dot">.</span></Link><nav aria-label="Main navigation"><NavLink to="/" end>Word unscrambler</NavLink><NavLink to="/anagram-solver">Anagram solver</NavLink><NavLink to="/5-letter-word-finder">5-letter finder</NavLink><NavLink to="/blog">Blog</NavLink><NavLink to="/how-to-unscramble-words" className="nav-guide">Word guide</NavLink></nav><Link to="/how-to-unscramble-words" className="guide-link">Word guide <ArrowUpRight size={15}/></Link></div></header>;
}
