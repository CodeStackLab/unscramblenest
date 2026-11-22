import type { Route } from "./+types/how-to-unscramble-words";
import { seo } from "@/lib/seo";
import { HowToContent } from "@/components/how-to/how-to-content";
import { howToFaq, howToSteps } from "@/data/how-to";

export function meta({ matches, location }: Route.MetaArgs) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: howToFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Unscramble Letters and Find English Words",
    description:
      "A complete step-by-step tutorial on entering tiles, using blank wildcards, applying positional filters, and discovering high-scoring dictionary plays.",
    totalTime: "PT2M",
    step: howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.body,
      url: `https://unscramblenest.com/how-to-unscramble-words#step-${index + 1}`,
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Unscramble Words — Step-by-Step Guide",
    description:
      "A comprehensive guide to unscrambling letters with UnscrambleNest — wildcard tiles, positional filters, worked examples, and tournament dictionary limits.",
    url: "https://unscramblenest.com/how-to-unscramble-words",
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: "UnscrambleNest Editorial Team",
      url: "https://unscramblenest.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "UnscrambleNest",
      url: "https://unscramblenest.com",
    },
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
        "name": "How to Unscramble Words",
        "item": "https://unscramblenest.com/how-to-unscramble-words",
      },
    ],
  };

  return seo(
    { matches, location },
    {
      title: "How to Unscramble Words – Step-by-Step Guide | UnscrambleNest",
      description:
        "A step-by-step guide to unscrambling letters with UnscrambleNest — wildcard tiles, the three filters, worked examples, and the bundled dictionary’s limits.",
      path: "/how-to-unscramble-words",
      image: "https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png",
      jsonLd: [articleJsonLd, howToJsonLd, breadcrumbSchema, faqJsonLd],
    }
  );
}

export default function HowToPage() {
  return <HowToContent />;
}
