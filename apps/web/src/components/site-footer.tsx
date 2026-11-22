import { Link } from "react-router";
import { openCookiePreferences } from "@/lib/cookie-consent";
import { Layers } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col footer-col-brand">
            <Link className="brand" to="/" aria-label="UnscrambleNest home">
              <span className="brand-mark">
                <Layers size={20} strokeWidth={1.7} />
              </span>
              UnscrambleNest<span className="brand-dot">.</span>
            </Link>
            <p className="footer-tagline">
              Lightning-fast, zero-bloat linguistic analysis and English word puzzle solving workspace.
            </p>
            <div className="footer-meta-block">
              <span className="footer-meta-label">Direct Support</span>
              <a href="mailto:support@unscramblenest.com" className="footer-email-link">
                support@unscramblenest.com
              </a>
            </div>
            <div className="footer-meta-block">
              <span className="footer-meta-label">Delaware Operations</span>
              <span className="footer-address">8 The Green, Suite A, Dover, DE 19901, USA</span>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Word Tools</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Word Unscrambler</Link>
              </li>
              <li>
                <Link to="/anagram-solver">Anagram Solver</Link>
              </li>
              <li>
                <Link to="/word-unscrambler-with-blanks">Wildcard Solver</Link>
              </li>
              <li>
                <Link to="/5-letter-word-finder">5-Letter Word Finder</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Resources &amp; Guides</h3>
            <ul className="footer-links">
              <li>
                <Link to="/blog">Blog &amp; Strategy Guides</Link>
              </li>
              <li>
                <Link to="/how-to-unscramble-words">How to Unscramble Words</Link>
              </li>
              <li>
                <Link to="/dictionary">Dictionary Coverage &amp; Source</Link>
              </li>
              <li>
                <Link to="/editorial-policy">Editorial &amp; Fact-Checking Policy</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Legal &amp; Company</h3>
            <ul className="footer-links">
              <li>
                <Link to="/about">About UnscrambleNest</Link>
              </li>
              <li>
                <Link to="/contact">Contact Support</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-use">Terms of Service</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="footer-cookie-btn"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-disclaimers">
          <p className="trademark-notice">
            <strong>Trademark Notice:</strong> SCRABBLE® is a registered trademark of Hasbro, Inc. in the United States and Canada, and of J.W. Spear &amp; Sons Limited (a subsidiary of Mattel, Inc.) elsewhere. Words with Friends is a registered trademark of Zynga Inc. Wordle is a registered trademark of The New York Times Company. UnscrambleNest is an independent educational language utility and is not affiliated with, sponsored by, or endorsed by Hasbro, Mattel, Zynga, The New York Times Company, or any of their affiliates.
          </p>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 UnscrambleNest. All rights reserved.</span>
          <span>
            Lexicon:{" "}
            <a
              href="https://github.com/dwyl/english-words"
              target="_blank"
              rel="noreferrer"
            >
              dwyl/english-words
            </a>{" "}
            (
            <a href="/dictionary-license.txt">The Unlicense</a>) &middot;{" "}
            <a href="/dictionary-license.txt">Source &amp; license notice</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
