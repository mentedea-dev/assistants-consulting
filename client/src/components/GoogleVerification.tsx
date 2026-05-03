import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

/**
 * Fetches the Google Search Console verification code from site settings
 * and injects it as a <meta> tag in the document head.
 * This runs on every page load so Google can verify ownership.
 */
export default function GoogleVerification() {
  const { data: setting } = trpc.settings.get.useQuery(
    { key: "google_verification" },
    { staleTime: 1000 * 60 * 60 } // Cache for 1 hour
  );

  useEffect(() => {
    if (!setting?.value) return;

    const code = setting.value.trim();
    if (!code) return;

    // Check if meta tag already exists
    let el = document.querySelector(
      'meta[name="google-site-verification"]'
    ) as HTMLMetaElement | null;

    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "google-site-verification");
      document.head.appendChild(el);
    }

    el.setAttribute("content", code);

    // Cleanup on unmount
    return () => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, [setting?.value]);

  return null;
}
