import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "Assistants Consulting — Consultoria Atuarial",
  description = "Há 35 anos transformando complexidade atuarial em clareza estratégica. Saúde suplementar, previdência complementar e benefícios pós-emprego.",
  image = "",
  url = "",
  type = "website",
}: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set or create meta tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement | null;
      }
      if (!el) {
        el = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("article:")) {
          el.setAttribute("property", property);
        } else {
          el.setAttribute("name", property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("description", description);

    // Open Graph
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:type", type);
    if (url) setMeta("og:url", url);
    if (image) setMeta("og:image", image);
    setMeta("og:site_name", "Assistants Consulting");
    setMeta("og:locale", "pt_BR");
    setMeta("og:locale:alternate", "en_US");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    if (image) setMeta("twitter:image", image);
  }, [title, description, image, url, type]);

  return null;
}
