/*
 * ScrollToTop — Scrolls to top on every route change.
 * Fixes the issue where navigating via "Saiba mais" or other links
 * leaves the user mid-page instead of at the top.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
