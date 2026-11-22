import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";
import { infoPages, type InfoPageKey } from "@/data/info-pages";

export function InfoContent({ page }: { page: InfoPageKey }) {
  const content = infoPages[page];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <main className="info-main">
      <Link className="back-link" to="/">
        <ArrowLeft size={15} /> Back to the word unscrambler
      </Link>
      <span className="eyebrow">UNSCRAMBLENEST / INFORMATION</span>
      <h1>{content.title}</h1>
      <p className="info-intro">{content.intro}</p>

      {page === "contact" && (
        <section className="contact-form-section" aria-label="Send us a message">
          <h2>Send Us a Direct Message</h2>
          <p className="contact-form-note">
            Submit your feedback, bug report, or lexicon correction below. Our team replies within 24–48 business hours.
          </p>

          {submitted ? (
            <div className="contact-success-card" role="alert">
              <CheckCircle2 size={24} style={{ color: "#2e7d32", flexShrink: 0 }} />
              <div>
                <strong>Thank you for reaching out!</strong>
                <p>
                  Your message has been received. Our editorial and support team will reply to <em>{formData.email}</em> within 24–48 business hours.
                </p>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Your Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="contact-category">Inquiry Department</label>
                  <select
                    id="contact-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="general">General Support &amp; Feedback</option>
                    <option value="dictionary">Dictionary &amp; Lexicon Correction</option>
                    <option value="bug">Technical Bug Report</option>
                    <option value="privacy">Privacy &amp; CCPA/GDPR Inquiries</option>
                    <option value="business">Advertising &amp; Partnerships</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject">Subject *</label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of inquiry"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please provide details so we can assist you promptly..."
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                <Send size={15} /> Submit Inquiry
              </button>
            </form>
          )}
        </section>
      )}

      {"email" in content && content.email && page !== "contact" ? (
        <a className="contact-email" href={`mailto:${content.email}`}>
          {content.email}
        </a>
      ) : null}

      <div className="info-sections">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      <aside className="source-links">
        <h2>Dictionary resources</h2>
        <a href="https://github.com/dwyl/english-words" target="_blank" rel="noreferrer">
          Source: dwyl/english-words <ArrowUpRight size={14} />
        </a>
        <a href="/dictionary-license.txt">
          Read the source &amp; license notice <ArrowUpRight size={14} />
        </a>
        <a href="/words-alpha.txt" download>
          Download the bundled word list <ArrowUpRight size={14} />
        </a>
      </aside>
    </main>
  );
}
