import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  path?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE_NAME = "Aurelia Multispeciality Hospital";
const ORG = "https://demo.kyntriq.example";

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta") as HTMLMetaElement;
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
  return el;
}

export default function Seo({ title, description, path = "/", type = "website", jsonLd }: Props) {
  useEffect(() => {
    const full = `${title} | ${SITE_NAME}`;
    document.title = full;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: full });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: ORG + path });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: full });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: ORG + path });

    const existing = document.getElementById("page-jsonld");
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-jsonld";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, type, JSON.stringify(jsonLd)]);

  return null;
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: SITE_NAME,
  url: ORG,
  description: "Demonstration multispeciality hospital website built by Kyntriq Solutions.",
  slogan: "Advanced Care. Connected Healthcare.",
};
