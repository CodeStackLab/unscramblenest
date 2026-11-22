import { redirect } from "react-router";
import type { Route } from "./+types/info";
import { seo } from "@/lib/seo";
import { infoPages, type InfoPageKey } from "@/data/info-pages";
import { InfoContent } from "@/components/info/info-content";

export function loader({ params }: Route.LoaderArgs) {
  const rawPage = params.page ?? "";
  const normalized = rawPage.toLowerCase();

  // Canonicalize terms aliases to /terms-of-use
  if (normalized === "terms" || normalized === "terms-of-service") {
    return redirect("/terms-of-use", { status: 301 });
  }

  // Canonicalize privacy aliases to /privacy-policy
  if (normalized === "privacy") {
    return redirect("/privacy-policy", { status: 301 });
  }

  // Normalize case (e.g. /About -> /about)
  if (rawPage !== normalized) {
    return redirect(`/${normalized}`, { status: 301 });
  }

  if (!normalized || !Object.prototype.hasOwnProperty.call(infoPages, normalized)) {
    throw new Response("Page not found", { status: 404 });
  }

  return { page: normalized as InfoPageKey };
}

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return seo({ matches, location }, {
      title: "Page Not Found | UnscrambleNest",
      description: "This page is not available. Return to UnscrambleNest to use the English word unscrambler.",
      noindex: true,
    });
  }

  const content = infoPages[loaderData.page];
  const pagePath = `/${loaderData.page}`;
  const pageTitle = content.title.includes("UnscrambleNest") ? content.title : `${content.title} | UnscrambleNest`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://unscramblenest.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": content.title,
        "item": `https://unscramblenest.com${pagePath}`,
      },
    ],
  };

  const schemas: object[] = [breadcrumbSchema];

  if (loaderData.page === "about") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About UnscrambleNest",
      "url": "https://unscramblenest.com/about",
      "description": content.intro,
      "mainEntity": {
        "@type": "Organization",
        "name": "UnscrambleNest",
        "url": "https://unscramblenest.com",
        "foundingDate": "2026",
        "description": "Independent client-side linguistic research and word puzzle platform.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8 The Green, Suite A",
          "addressLocality": "Dover",
          "addressRegion": "DE",
          "postalCode": "19901",
          "addressCountry": "US",
        },
      },
    });
  } else if (loaderData.page === "contact") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact UnscrambleNest",
      "url": "https://unscramblenest.com/contact",
      "description": content.intro,
      "mainEntity": {
        "@type": "Organization",
        "name": "UnscrambleNest",
        "url": "https://unscramblenest.com",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@unscramblenest.com",
            "availableLanguage": ["English"],
            "hoursAvailable": "Mo-Fr 09:00-17:00 EST",
          },
          {
            "@type": "ContactPoint",
            "contactType": "editorial corrections",
            "email": "editorial@unscramblenest.com",
            "availableLanguage": ["English"],
          },
        ],
      },
    });
  }

  return seo(
    { matches, location },
    {
      title: pageTitle,
      description: content.intro,
      path: pagePath,
      image: "https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png",
      jsonLd: schemas,
    }
  );
}

export default function InfoPage({ loaderData }: Route.ComponentProps) {
  return <InfoContent page={loaderData.page} />;
}
