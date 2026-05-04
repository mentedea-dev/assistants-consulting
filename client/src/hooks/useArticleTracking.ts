/**
 * useArticleTracking — Behavioral analytics hook
 * Tracks scroll depth, time on page, and reports to the server.
 * Powers the behavioral recommendation engine.
 */
import { useEffect, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";

function getOrCreateSessionId(): string {
  const key = "ac_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(key, id);
  }
  return id;
}

interface UseArticleTrackingOptions {
  slug: string;
  referrerSlug?: string;
  enabled?: boolean;
}

export function useArticleTracking({ slug, referrerSlug, enabled = true }: UseArticleTrackingOptions) {
  const sessionId = useRef(getOrCreateSessionId());
  const startTime = useRef(Date.now());
  const maxScrollDepth = useRef(0);
  const reported = useRef(false);

  const trackView = trpc.articles.trackView.useMutation();

  const report = useCallback(() => {
    if (reported.current || !enabled || !slug) return;
    reported.current = true;
    const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
    trackView.mutate({
      slug,
      sessionId: sessionId.current,
      scrollDepth: maxScrollDepth.current,
      timeOnPage,
      referrerSlug: referrerSlug || undefined,
    });
  }, [slug, referrerSlug, enabled, trackView]);

  useEffect(() => {
    if (!enabled || !slug) return;

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const depth = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      if (depth > maxScrollDepth.current) {
        maxScrollDepth.current = depth;
      }
    };

    // Report on page leave
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        report();
      }
    };

    const handleBeforeUnload = () => {
      report();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Also report after 30s of reading (mid-session signal)
    const timer = setTimeout(() => {
      if (maxScrollDepth.current >= 30) {
        report();
      }
    }, 30000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearTimeout(timer);
      report();
    };
  }, [slug, enabled, report]);

  return { sessionId: sessionId.current };
}
