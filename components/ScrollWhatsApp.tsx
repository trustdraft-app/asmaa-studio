"use client";

/**
 * Scroll-aware floating WhatsApp CTA.
 *
 * Conversion pattern: the button stays out of the way above the fold (hero
 * already has its own CTAs) and slides in once the visitor has scrolled ~30%
 * of the page — the moment of demonstrated interest. On short pages it shows
 * immediately so the CTA is never lost.
 *
 * Pure client enhancement on top of the existing anchor — static-export safe,
 * passive listeners, rAF-throttled, respects prefers-reduced-motion via CSS.
 */

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type ScrollWhatsAppProps = {
  href: string;
  className: string;
  ariaLabel: string;
  children: ReactNode;
};

const SCROLL_DEPTH = 0.3;

export function ScrollWhatsApp({ href, className, ariaLabel, children }: ScrollWhatsAppProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const evaluate = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // Short pages (nothing meaningful to scroll) — show immediately.
      if (scrollable < window.innerHeight * 0.5) {
        setVisible(true);
        return;
      }
      setVisible(window.scrollY / scrollable >= SCROLL_DEPTH);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(evaluate);
      }
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      className={`${className} wa-scroll ${visible ? "wa-scroll-visible" : "wa-scroll-hidden"}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
    >
      {children}
    </a>
  );
}
