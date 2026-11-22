import type { Route } from "./+types/home";
import { seo } from "@/lib/seo";
import { googleSiteVerification } from "@/lib/site-config.server";
import { WordTool } from "@/components/tool/word-tool";
import { ToolNotes } from "@/components/tool/tool-notes";
import { HomeContent } from "@/components/home/home-content";
import { homeFaq } from "@/data/home-content";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function loader(_args: Route.LoaderArgs) {
  return { googleVerification: googleSiteVerification };
}

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "UnscrambleNest Word Unscrambler",
    url: "https://unscramblenest.com",
    applicationCategory: "GameApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Runs client-side via Web Workers.",
    description:
      "Fast, private client-side English word unscrambler and anagram solver supporting up to 15 letters and wildcard tiles.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UnscrambleNest",
    url: "https://unscramblenest.com",
    description:
      "English dictionary-based word unscrambler, anagram solver, and five-letter word finder.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://unscramblenest.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UnscrambleNest",
    url: "https://unscramblenest.com",
    logo: "https://unscramblenest.com/favicon.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@unscramblenest.com",
        availableLanguage: ["English"],
      },
    ],
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
    ],
  };

  const tags = seo(
    { matches, location },
    {
      title: "Word Unscrambler – Find Words From Letters | UnscrambleNest",
      description:
        "Unscramble letters into words with UnscrambleNest. Find anagrams, use blank tiles, and filter results by word length, starting letters, and more.",
      path: "/",
      image: "https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png",
      jsonLd: [webSiteSchema, organizationSchema, webAppSchema, breadcrumbSchema, faqJsonLd],
    }
  );

  if (loaderData?.googleVerification) {
    tags.push({ name: "google-site-verification", content: loaderData.googleVerification });
  }

  return tags;
}

export default function HomePage() {
  return (
    <>
      <WordTool />
      <ToolNotes />
      <HomeContent />
    </>
  );
}
