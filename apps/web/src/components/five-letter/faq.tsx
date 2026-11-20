const faqs = [
  {
    q: 'What do the ? and * blank tiles do?',
    a: 'Each ? or * stands for exactly one unknown letter. Type “star?” and the finder treats it as your four letters (S, T, A, R) plus one blank, then matches every five-letter word made from those — for example “start” and “smart”. You can use several blanks, but each fills only a single position.',
  },
  {
    q: 'Why do the results depend on the included dictionary?',
    a: 'Unscramblenest searches a single bundled word list — the dwyl English dictionary, roughly 370,000 entries. It includes many uncommon and specialist terms, and like any list it is not complete. A word appearing here is not a guarantee that any particular game will accept it; always check your game’s official dictionary and rules.',
  },
  {
    q: 'What should I do when a word is missing?',
    a: 'First try removing a filter, adding a blank tile, or checking your spelling — the word may simply need a different letter combination. If it still does not appear, it is most likely absent from the bundled dictionary rather than invalid. You can download the full word list from the dictionary resources to confirm, then rely on your game’s own dictionary for the final ruling.',
  },
  {
    q: 'How do the three filters work together?',
    a: '“Starts with”, “Exact length” and “Contains” are applied together — a word must satisfy every filter you set. On the 5-letter finder the length is locked to 5, so the “Exact length” control stays fixed while you adjust the other two.',
  },
];

export function Faq() {
  return (
    <section className="five-extras faq" aria-label="Frequently asked questions">
      <div className="extras-heading">
        <div>
          <span className="eyebrow">GOOD TO KNOW</span>
          <h2>5-letter finder FAQ</h2>
        </div>
        <p>Short answers about blank tiles, the dictionary, and missing words.</p>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <div className="faq-item" key={item.q}>
            <h3>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.q}
            </h3>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
