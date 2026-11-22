const termsContent = {
  title: "UnscrambleNest Terms of Use",
  intro: "Comprehensive terms governing your access to and use of UnscrambleNest tools, algorithmic solvers, and lexicographical guides. Governed by Delaware, USA law.",
  sections: [
    {
      title: "1. Acceptance of Terms",
      paragraphs: [
        "By accessing, browsing, or using UnscrambleNest (unscramblenest.com) and its associated word-finding utilities, you agree to be legally bound by these Terms of Service, all applicable laws and regulations, and our Privacy Policy. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
      ],
    },
    {
      title: "2. Permitted Use & Browser-Based Execution",
      paragraphs: [
        "UnscrambleNest provides free, browser-based anagram-solving, word unscrambling, and dictionary lookup tools for up to 15 characters and wildcard blank tiles. All tile frequency matching and search algorithms run locally inside your web browser via background Web Workers; entered tiles and search inputs are not transmitted to or stored on our servers.",
        "You agree to use this website solely for lawful, personal, and non-commercial educational or entertainment purposes. You must not attempt to disrupt, exploit, overload, or compromise the server infrastructure, reverse-proxy routing, or network integrity.",
      ],
    },
    {
      title: "3. Prohibited Misuse & Infrastructure Protection",
      paragraphs: [
        "You may not use automated scripts, scrapers, bots, or excessive automated requests to extract word lists or burden our server endpoints. Circumventing security rate limits, reverse-engineering compiled application code, or injecting malicious payloads is strictly prohibited and grounds for immediate blocking.",
      ],
    },
    {
      title: "4. Dictionary Scope & Tournament Disclaimers",
      paragraphs: [
        "Dictionary matching relies on a bundled lexicon derived from the open-source dwyl/english-words project (~370,105 alphabetic entries). While extensive, this list is an educational reference and does not constitute an official ruling from tournament sanctioning bodies such as NASPA, WESPA, or Scrabble/Words With Friends publishers.",
        "The inclusion or exclusion of a word does not guarantee its admissibility in tournament play or commercial board games. Users are responsible for confirming validity against their specific game\x27s official lexicon.",
      ],
    },
    {
      title: "5. Third-Party Trademarks & Fair Use",
      paragraphs: [
        "SCRABBLE® is a registered trademark of Hasbro, Inc. in the United States and Canada, and of J.W. Spear & Sons Limited (a subsidiary of Mattel, Inc.) elsewhere. Words With Friends is a registered trademark of Zynga Inc. Wordle is a registered trademark of The New York Times Company.",
        "UnscrambleNest is an independent language tool and educational reference. It is not affiliated with, sponsored by, or endorsed by Hasbro, Mattel, Zynga, The New York Times, or any of their affiliates. References to specific games are made under fair use doctrine strictly for descriptive and compatibility identification.",
      ],
    },
    {
      title: "6. Intellectual Property & Dictionary Attribution",
      paragraphs: [
        "All proprietary website code, design architecture, graphics, tutorials, and strategy guides on UnscrambleNest are the intellectual property of UnscrambleNest / CodeStackLab.",
        "The underlying alphabetic dictionary is sourced from the public dwyl/english-words project under The Unlicense dedication, permitting public-domain educational and commercial distribution. Complete licensing attribution is maintained at /dictionary-license.txt.",
      ],
    },
    {
      title: "7. Disclaimer of Warranties",
      paragraphs: [
        "UnscrambleNest is provided on an \x22AS IS\x22 and \x22AS AVAILABLE\x22 basis without warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.",
        "We do not warrant that results will be uninterrupted, error-free, completely exhaustive, or compatible with future word game editions.",
      ],
    },
    {
      title: "8. Limitation of Liability",
      paragraphs: [
        "To the maximum extent permitted by applicable law, UnscrambleNest, its directors, developers, authors, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the site or reliance on search outputs.",
      ],
    },
    {
      title: "9. Governing Law & Jurisdiction",
      paragraphs: [
        "These Terms of Service shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any legal action or proceeding arising under these terms shall be brought exclusively in state or federal courts located in Delaware.",
      ],
    },
    {
      title: "10. Modifications & Contact",
      paragraphs: [
        "We reserve the right to update these terms at our discretion. Notice of revisions is provided by updating the \x22Last updated\x22 date above. For legal or contractual inquiries, contact legal@unscramblenest.com or support@unscramblenest.com.",
      ],
    },
  ],
} as const;

export const infoPages = {
  about: {
    title: "About UnscrambleNest",
    intro: "The mission, editorial philosophy, and expert lexicographical team behind UnscrambleNest — engineered for lightning-fast, zero-bloat linguistic analysis.",
    sections: [
      {
        title: "Our Mission & Founding Story",
        paragraphs: [
          "UnscrambleNest was founded in 2026 by an independent collective of software architects, competitive Scrabble tournament contenders, and computational linguists. We grew deeply frustrated by modern word puzzle tools, which have devolved into slow, ad-cluttered traps requiring constant server roundtrips, tracking scripts, and paywalled anagram results.",
          "Our mission is simple: to provide the fastest, cleanest, completely client-side English word-finding workspace on the web. UnscrambleNest empowers competitive board game players, crossword enthusiasts, educators, and writers with instant, privacy-first lexical lookup—completely free of intrusive popups and paywalls.",
        ],
      },
      {
        title: "Meet Our Editorial & Linguistic Team",
        paragraphs: [
          "Behind our 30+ comprehensive strategy guides and lexical analysis is a dedicated team of word game analysts and researchers:",
          "• Elena Vance — Head of Lexicographical Research & Competitive Word Puzzle Analyst. With over 12 years of competitive tournament Scrabble (NASPA/WESPA) and Words With Friends experience, Elena authors our in-depth guides on 7-letter bingo stems, vowel dumps, and high-probability opening plays.",
          "• Marcus Thorne — Lead Algorithm Architect & Game Theorist. Marcus specializes in trie data structures, client-side Web Worker concurrency, and computational anagram resolution. He authors our technical breakdowns of word search complexity and minimax rack balancing.",
          "• Maya Lin — Computational Linguist & Wordle Mechanics Researcher. Holding an advanced degree in Applied Linguistics, Maya focuses on letter frequency distributions, phonics chunking, and optimal Wordle entropy theory.",
          "• Julian Thorne — Tournament Strategist & Cross-Platform Competitor. Julian focuses on board geography, defensive lockdown techniques, and endgame tile-tracking heuristics.",
          "• Dr. Marcus Vance — Cognitive Linguist & Computational Puzzle Architect. Dr. Vance researches anagram processing pathways in human cognition and develops phonotactic puzzle paradigms.",
        ],
      },
      {
        title: "Editorial Standards & Fact-Checking Methodology",
        paragraphs: [
          "Every strategy guide, vocabulary tutorial, and mathematical probability formula on UnscrambleNest undergoes rigorous peer review prior to publication:",
          "1. Lexicon Cross-Referencing: All strategic word examples are verified against standard competitive tournament lexicons (TWL06, CSW21) and the Official Scrabble Players Dictionary.",
          "2. Strategic Accuracy: Every combinatorial probability calculation (such as blank tile equity and bingo probability) is independently validated with algorithm models.",
          "3. Neutrality & Editorial Independence: Our guides remain completely independent of commercial game publishers and third-party advertising partners.",
          "4. Family-Friendly Verification: Our articles maintain a clean, educational standard suitable for classrooms, family game nights, and competitive leagues alike.",
        ],
      },
      {
        title: "How UnscrambleNest Operates (Privacy-First Architecture)",
        paragraphs: [
          "Unlike traditional anagram finders that send your letters across the internet to a remote database, UnscrambleNest downloads a compact 370,105-word lexicon once and processes all queries locally inside your browser using a background Web Worker.",
          "Your tiles, filter parameters, and search results never leave your device. The tool stays instantly responsive even on low-bandwidth connections.",
        ],
      },
      {
        title: "Community Commitment & Non-Affiliation",
        paragraphs: [
          "UnscrambleNest is committed to remaining 100% free, uncluttered, and respectful of user privacy. We provide honest dictionary matching, pointing players to their respective game authorities for final tournament rulings.",
          "We operate independently and maintain no commercial affiliation with Hasbro, Mattel, Zynga, or The New York Times.",
        ],
      },
    ],
  },

  contact: {
    title: "Contact UnscrambleNest",
    intro: "Contact our editorial, technical, and compliance teams. Review our 24-48 business hour response SLA, physical Delaware address, and department channels.",
    email: "support@unscramblenest.com",
    sections: [
      {
        title: "Direct Inquiries & Response SLA",
        paragraphs: [
          "We welcome feedback from players, educators, linguists, and developers. Our dedicated team reviews every submission. We commit to responding to all legitimate inquiries within 24 to 48 business hours (Monday through Friday, 9:00 AM – 5:00 PM EST).",
        ],
      },
      {
        title: "Department Directory",
        paragraphs: [
          "• General Support & Bug Reports: support@unscramblenest.com",
          "• Editorial Corrections & Lexicon Feedback: editorial@unscramblenest.com",
          "• Legal, Privacy & CCPA/GDPR Inquiries: privacy@unscramblenest.com",
          "• Business & Advertising Inquiries: contact@unscramblenest.com",
        ],
      },
      {
        title: "Operating Entity & Physical Address",
        paragraphs: [
          "UnscrambleNest / CodeStackLab",
          "8 The Green, Suite A",
          "Dover, DE 19901, United States",
        ],
      },
      {
        title: "Reporting Dictionary Corrections",
        paragraphs: [
          "Our dictionary derives from the open-source dwyl/english-words project (~370,105 entries). If you spot an archaic entry, regional omission, or disputed word, please email editorial@unscramblenest.com with the word, suggested definition, and reference dictionary (e.g. Merriam-Webster, Collins, Oxford).",
        ],
      },
    ],
  },

  "privacy-policy": {
    title: "UnscrambleNest Privacy Policy",
    intro: "Learn how UnscrambleNest protects your data with client-side searches, GDPR and CCPA compliance, and full Google AdSense DoubleClick DART disclosures.",
    sections: [
      {
        title: "1. Zero-Tracking Search Architecture",
        paragraphs: [
          "At UnscrambleNest (unscramblenest.com), protecting visitor privacy is fundamental to our engineering design. When you use our Word Unscrambler, Anagram Solver, or 5-Letter Word Finder, all letter permutations and dictionary matching algorithms execute locally inside your web browser using a background Web Worker.",
          "We do not transmit your entered letters, wildcard queries, or search results to any server. Your search history is never logged, stored, or monetized.",
        ],
      },
      {
        title: "2. Server Infrastructure & Operational Logs",
        paragraphs: [
          "UnscrambleNest is hosted on dedicated cloud Linux VPS infrastructure managed via Traefik SSL reverse proxy. Like all web services, our servers automatically collect standard technical connection data when you request web pages, stylesheets, images, or the dictionary file.",
          "This technical data may include your Internet Protocol (IP) address, browser user-agent, operating system, referring URL, and request timestamps. These logs are processed solely under GDPR Art. 6(1)(f) (Legitimate Interests) to maintain network stability, prevent denial-of-service (DDoS) attacks, and enforce security rate limits. Server logs are automatically purged after 30 days and are never sold or shared.",
        ],
      },
      {
        title: "3. Google AdSense & Third-Party Advertising (DoubleClick DART Cookie)",
        paragraphs: [
          "This website displays advertisements served by Google AdSense (Publisher ID: pub-4107704371063029). Third-party vendors, including Google, use cookies to serve ads based on a user\x27s prior visits to this website or other websites.",
          "Google\x27s use of advertising cookies—including the DoubleClick DART cookie—enables it and its partners to serve ads to our users based on their visits to UnscrambleNest and/or other sites across the Internet.",
          "Users may opt out of personalized advertising by visiting Google Ads Settings at https://adssettings.google.com or https://www.google.com/settings/ads. Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting the Network Advertising Initiative (NAI) opt-out page at https://optout.networkadvertising.org/ or the Digital Advertising Alliance (DAA) WebChoices tool at https://www.aboutads.info/choices/. European visitors may also use the EDAA consumer choice portal at https://www.youronlinechoices.eu/.",
        ],
      },
      {
        title: "4. Cookie Categories & Consent Management",
        paragraphs: [
          "We categorize browser storage into clear, granular preferences:",
          "• Necessary / Essential Cookies: Strictly required to store your cookie consent preferences (cc_cookie) across browsing sessions. Stored for 182 days.",
          "• Marketing Cookies: Enables Google AdSense advertising tags and frequency capping in compliance with your regional consent preferences.",
          "• Analytics Cookies: Collects anonymous, aggregated site usage statistics to understand overall traffic patterns without tracking personal identifiers.",
          "You may change your cookie choices at any time by clicking the \x22Cookie settings\x22 button located in our website footer.",
        ],
      },
      {
        title: "5. European Privacy Rights (GDPR & UK GDPR)",
        paragraphs: [
          "If you reside in the European Economic Area (EEA) or the United Kingdom, you possess specific statutory rights regarding your personal data under the General Data Protection Regulation (GDPR) and UK Data Protection Act 2018:",
          "• Lawful Bases: We process technical logs under Legitimate Interests (Art. 6(1)(f)) and advertising cookies solely under Consent (Art. 6(1)(a)).",
          "• Your Rights: You have the right to request access to your data (Art. 15), rectification of inaccurate data (Art. 16), erasure / right to be forgotten (Art. 17), restriction of processing (Art. 18), data portability (Art. 20), and objection to processing (Art. 21).",
          "• Supervisory Authority: You have the right to lodge a formal complaint with your local EU Data Protection Authority or the UK Information Commissioner\x27s Office (ICO). To exercise your rights, email privacy@unscramblenest.com. We respond to all verified requests within 30 days.",
        ],
      },
      {
        title: "6. California Consumer Privacy Rights (CCPA / CPRA Notice)",
        paragraphs: [
          "Under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), California residents are entitled to specific disclosures:",
          "• Categories Collected: Identifiers (IP address, browser cookies) collected via automated server requests and third-party advertising scripts.",
          "• We Do Not Sell Personal Information: UnscrambleNest does not sell personal information as defined by California law. We do not share personal information for cross-context behavioral advertising without affirmative user consent.",
          "• Consumer Rights: You have the Right to Know the categories and specific pieces of personal information collected, the Right to Delete, the Right to Correct inaccurate information, and the Right to Non-Discrimination for exercising your statutory privacy rights.",
          "• Submitting Requests: Submit CCPA requests to privacy@unscramblenest.com. We verify and respond to verifiable consumer requests within 45 days.",
        ],
      },
      {
        title: "7. Children\x27s Online Privacy Protection Act (COPPA)",
        paragraphs: [
          "UnscrambleNest is an educational word tool designed for general audiences. We do not knowingly collect personal identifiable information from children under the age of 13 (or under 16 in the European Union). If you believe a child has provided personal information to our site, please contact us at privacy@unscramblenest.com, and we will promptly delete such records.",
        ],
      },
      {
        title: "8. Data Security & Updates",
        paragraphs: [
          "We maintain robust administrative and technical security measures, including modern TLS encryption and strict reverse-proxy headers, to protect data against unauthorized alteration or exposure.",
          "Material modifications to this Privacy Policy will be reflected in an updated \x22Effective Date\x22 at the top of this document. We encourage visitors to review this page periodically.",
        ],
      },
    ],
  },

  "editorial-policy": {
    title: "UnscrambleNest Editorial & Lexicon Policy",
    intro: "Our rigorous editorial standards, algorithmic validation protocols, fact-checking methodology, and independent word game reference guidelines.",
    sections: [
      {
        title: "1. Editorial Mission & Objective Truth in Word Games",
        paragraphs: [
          "UnscrambleNest is committed to publishing the highest-quality strategic guides, linguistic analyses, and algorithmic resources for word game competitors and enthusiasts. We hold our content to strict journalistic and academic standards, ensuring every strategy guide, tile equity formula, and lexicon reference provides verifiable value.",
        ],
      },
      {
        title: "2. Lexicon Verification & Reference Standards",
        paragraphs: [
          "Word games use distinct, proprietary, and frequently updated competition lexicons. When our analysts discuss game tactics, they verify validity against established standard reference dictionaries:",
          "• North American Tournament Play: NASPA Word List (NWL2023) and Official Scrabble Players Dictionary (OSPD).",
          "• International Tournament Play: Collins Scrabble Words (CSW21).",
          "• General Word Play: Merriam-Webster\x27s Collegiate Dictionary (11th Edition) and Oxford English Dictionary.",
          "Our guides explicitly distinguish between general English dictionary validity and tournament-sanctioned admissibility.",
        ],
      },
      {
        title: "3. Algorithmic Integrity & Probability Standards",
        paragraphs: [
          "Every mathematical probability calculation published on our site—including 7-letter bingo probabilities, vowel-to-consonant rack balancing ratios, and blank tile point equity—is calculated using reproducible combinatorial models and verified by our computational linguists.",
        ],
      },
      {
        title: "4. Editorial Independence & Non-Commercial Neutrality",
        paragraphs: [
          "UnscrambleNest maintains absolute editorial independence. We are an independent linguistic resource and maintain no commercial affiliation with Hasbro, Mattel, Zynga, The New York Times Company, or any of their affiliates.",
          "Our editorial evaluations, strategy recommendations, and software comparisons are never influenced by advertising partners, sponsors, or commercial agreements.",
        ],
      },
      {
        title: "5. Fact-Checking, Corrections & Feedback Loops",
        paragraphs: [
          "Accuracy is paramount. When typographical errors, outdated rules, or disputed definitions occur, we correct them transparently and promptly.",
          "If you discover a discrepancy in any article, formula, or lexicon reference, we invite you to email our editorial review desk directly at editorial@unscramblenest.com. Inquiries are investigated and addressed within 48 business hours.",
        ],
      },
    ],
  },

  dictionary: {
    title: "Dictionary Source & Coverage",
    intro: "Learn about our bundled 370,105-word English lexicon, open-source licensing under The Unlicense, and why game tournament dictionaries differ.",
    sections: [
      {
        title: "Source and Attribution",
        paragraphs: [
          "UnscrambleNest bundles words_alpha.txt from the dwyl/english-words project on GitHub, containing 370,105 distinct alphabetic entries. The dwyl project compiled the list from publicly available sources, including public-domain Moby word lists.",
          "The repository applies The Unlicense dedication, releasing its contents into the public domain and permitting unrestricted educational and commercial use. Complete source and license documentation is maintained at /dictionary-license.txt.",
        ],
      },
      {
        title: "How Words are Processed",
        paragraphs: [
          "When you search, the tool counts how many of each letter you supplied and compares those counts against every dictionary word. A word matches only when it can be spelled using no more of any letter than you provided — unless a blank tile covers the difference. The list is filtered at search time to entries of 15 letters or fewer, because the tool accepts up to 15 input tiles.",
          "All matching runs in your browser inside a Web Worker, so the page stays responsive. No letters or results are sent to a server.",
        ],
      },
      {
        title: "Why Different Games Return Different Results",
        paragraphs: [
          "Word games such as Scrabble, Words With Friends, Wordle, and Wordfeud each use their own official or proprietary word lists, and those lists differ from one another and from a general English dictionary. A word that is valid in one game may be rejected in another.",
          "UnscrambleNest searches a single broad English list, not a game-specific dictionary. A match here is a dictionary entry, not a guarantee that any particular game will accept it. Always confirm words against your game\x27s own official dictionary and rules.",
        ],
      },
      {
        title: "How Repeated Letters are Handled",
        paragraphs: [
          "Each letter is counted, never duplicated. Entering \x22AAB\x22 means two A tiles and one B, so a word can use at most two A\x27s and one B — \x22aba\x22 matches, but \x22aaa\x22 does not, because you only supplied two A\x27s.",
          "The same counting applies to every letter, so the tool respects exactly the tiles you have.",
        ],
      },
      {
        title: "How Blank Tiles Work",
        paragraphs: [
          "Enter ? or * for a blank tile. Each blank stands for exactly one unknown letter, and you can use several at once. A blank is flexible: it can fill any single missing position in a word, and a shorter word may leave it unused.",
          "For example, \x22CA?\x22 supplies C, A and one blank. Letters can appear in any order, so results may include \x22cab\x22, \x22cat\x22, \x22act\x22, \x22ace\x22 and \x22arc\x22.",
        ],
      },
      {
        title: "Known Limitations",
        paragraphs: [
          "The list is broad, not curated for any game. It may contain rare, dated, or specialist terms and may omit words you know. It contains no definitions, no scoring values, and no indication of validity for any specific word game.",
          "Only words of 15 letters or fewer can match, because the tool accepts up to 15 input tiles. Longer dictionary entries are excluded from searches.",
        ],
      },
      {
        title: "No Game-Specific Dictionaries",
        paragraphs: [
          "UnscrambleNest does not bundle official game word lists (such as the Scrabble TWL or SOWPODS lists). Those lists are proprietary and are not licensed for redistribution here. Results are dictionary entries, not official rulings.",
        ],
      },
    ],
  },

  "terms-of-use": termsContent,
  "terms-of-service": termsContent,
  terms: termsContent,
} as const;

export type InfoPageKey = keyof typeof infoPages;
