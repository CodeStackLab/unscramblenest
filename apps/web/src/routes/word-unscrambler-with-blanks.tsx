import type { Route } from "./+types/word-unscrambler-with-blanks";
import { seo } from "@/lib/seo";
import { WordTool } from "@/components/tool/word-tool";
import { BlanksContent, blanksFaqs } from "@/components/blanks/blanks-content";
import { ToolNotes } from "@/components/tool/tool-notes";

export function meta({ matches, location }: Route.MetaArgs) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: blanksFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://unscramblenest.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Word Unscrambler with Blanks",
        "item": "https://unscramblenest.com/word-unscrambler-with-blanks",
      },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "UnscrambleNest Wildcard Tile Solver",
    url: "https://unscramblenest.com/word-unscrambler-with-blanks",
    applicationCategory: "GameApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Runs client-side via Web Workers.",
    description:
      "Word unscrambler supporting blank wildcard tiles (? and *) for Scrabble, Words with Friends, and word puzzles.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return seo(
    { matches, location },
    {
      title: "Word Unscrambler With Blanks – Wildcard Tile Solver | UnscrambleNest",
      description:
        "Use ? and * blank tiles to find words from partial letters. UnscrambleNest treats each blank as one unknown letter and matches every dictionary word you can spell.",
      path: "/word-unscrambler-with-blanks",
      image: "https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png",
      jsonLd: [webAppSchema, breadcrumbSchema, faqSchema],
    }
  );
}

export default function BlanksPage() {
  return (
    <>
      <WordTool key="blanks" />
      <ToolNotes />
      <BlanksContent />
    </>
  );
}
