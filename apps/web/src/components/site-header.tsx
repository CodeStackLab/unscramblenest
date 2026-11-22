import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { Layers, ArrowUpRight, Menu, X } from "lucide-react";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-brand-row">
          <Link className="brand" to="/" aria-label="UnscrambleNest home">
            <span className="brand-mark">
              <Layers size={23} strokeWidth={1.7} />
            </span>
            UnscrambleNest<span className="brand-dot">.</span>
          </Link>
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav
          className={`site-nav ${mobileMenuOpen ? "mobile-nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" end>
            Word unscrambler
          </NavLink>
          <NavLink to="/anagram-solver">Anagram solver</NavLink>
          <NavLink to="/word-unscrambler-with-blanks">With blanks</NavLink>
          <NavLink to="/5-letter-word-finder">5-letter finder</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/how-to-unscramble-words" className="nav-guide">
            Word guide
          </NavLink>
        </nav>

        <Link to="/how-to-unscramble-words" className="guide-link">
          Word guide <ArrowUpRight size={15} />
        </Link>
      </div>
    </header>
  );
}
