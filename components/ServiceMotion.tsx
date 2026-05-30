// ServiceMotion — animated SVG illustration per service type.
// Pure CSS animations (keyframes), respects prefers-reduced-motion,
// safe under prune-static-js (no client JS).

import type { CSSProperties } from "react";

type Props = { serviceSlug: string; ariaLabel?: string };

const COMMON_STYLE: CSSProperties = { width: "100%", maxWidth: 480, height: "auto" };

export function ServiceMotion({ serviceSlug, ariaLabel }: Props) {
  const label = ariaLabel ?? `illustration for ${serviceSlug}`;
  switch (serviceSlug) {
    case "zaffa-tasweer":
    case "zaffa-plus-tasweer":
      return (
        <svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" aria-label={label} role="img" style={COMMON_STYLE}>
          <defs>
            <linearGradient id="sm-zaffa-g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f1cb82" />
              <stop offset="100%" stopColor="#b8924d" />
            </linearGradient>
            <radialGradient id="sm-spot" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#f1cb82" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#f1cb82" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M300 0 L460 220 L140 220 Z" fill="url(#sm-spot)" />
          <g fill="url(#sm-zaffa-g)" className="sm-zaffa-figures">
            <g transform="translate(180 180)"><ellipse cx="0" cy="0" rx="20" ry="36" /><circle cx="0" cy="-30" r="12" /></g>
            <g transform="translate(300 190)"><ellipse cx="0" cy="0" rx="24" ry="42" /><circle cx="0" cy="-34" r="14" /></g>
            <g transform="translate(420 180)"><ellipse cx="0" cy="0" rx="20" ry="36" /><circle cx="0" cy="-30" r="12" /></g>
          </g>
        </svg>
      );
    case "khotuba-tasweer":
      return (
        <svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" aria-label={label} role="img" style={COMMON_STYLE}>
          <defs>
            <linearGradient id="sm-eng-g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f1cb82" /><stop offset="100%" stopColor="#b8924d" /></linearGradient>
            <radialGradient id="sm-eng-d" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="#fff6df" stopOpacity="0.95" /><stop offset="100%" stopColor="#b8924d" stopOpacity="0" /></radialGradient>
          </defs>
          <g transform="translate(300 120)">
            <ellipse cx="0" cy="40" rx="100" ry="26" fill="none" stroke="url(#sm-eng-g)" strokeWidth="10" />
            <polygon points="0,-70 28,-30 0,30 -28,-30" fill="url(#sm-eng-d)" stroke="url(#sm-eng-g)" strokeWidth="2.5" className="sm-eng-diamond" />
          </g>
        </svg>
      );
    case "henna-tasweer":
      return (
        <svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" aria-label={label} role="img" style={COMMON_STYLE}>
          <defs><linearGradient id="sm-henna-g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f1cb82" /><stop offset="100%" stopColor="#b8924d" /></linearGradient></defs>
          <g transform="translate(300 120)" fill="none" stroke="url(#sm-henna-g)" strokeWidth="2.5" strokeLinecap="round">
            <circle r="90" opacity="0.4" />
            <circle r="60" opacity="0.6" />
            <circle r="30" opacity="0.85" />
            <g fill="url(#sm-henna-g)" stroke="none"><circle r="10" /><circle cx="0" cy="-90" r="5" /><circle cx="0" cy="90" r="5" /><circle cx="-90" cy="0" r="5" /><circle cx="90" cy="0" r="5" /></g>
          </g>
        </svg>
      );
    case "full-day-tasweer":
      return (
        <svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" aria-label={label} role="img" style={COMMON_STYLE}>
          <defs><linearGradient id="sm-fd-g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f1cb82" /><stop offset="100%" stopColor="#b8924d" /></linearGradient></defs>
          <rect x="60" y="80" width="480" height="80" rx="8" fill="none" stroke="url(#sm-fd-g)" strokeWidth="3" />
          <g fill="url(#sm-fd-g)"><rect x="80" y="64" width="14" height="14" rx="2" /><rect x="120" y="64" width="14" height="14" rx="2" /><rect x="160" y="64" width="14" height="14" rx="2" /><rect x="200" y="64" width="14" height="14" rx="2" /><rect x="240" y="64" width="14" height="14" rx="2" /><rect x="280" y="64" width="14" height="14" rx="2" /><rect x="320" y="64" width="14" height="14" rx="2" /><rect x="360" y="64" width="14" height="14" rx="2" /><rect x="400" y="64" width="14" height="14" rx="2" /><rect x="440" y="64" width="14" height="14" rx="2" /><rect x="480" y="64" width="14" height="14" rx="2" /><rect x="80" y="162" width="14" height="14" rx="2" /><rect x="120" y="162" width="14" height="14" rx="2" /><rect x="160" y="162" width="14" height="14" rx="2" /><rect x="200" y="162" width="14" height="14" rx="2" /><rect x="240" y="162" width="14" height="14" rx="2" /><rect x="280" y="162" width="14" height="14" rx="2" /><rect x="320" y="162" width="14" height="14" rx="2" /><rect x="360" y="162" width="14" height="14" rx="2" /><rect x="400" y="162" width="14" height="14" rx="2" /><rect x="440" y="162" width="14" height="14" rx="2" /><rect x="480" y="162" width="14" height="14" rx="2" /></g>
          <line x1="200" y1="80" x2="200" y2="160" stroke="url(#sm-fd-g)" strokeWidth="1.5" opacity="0.5" /><line x1="300" y1="80" x2="300" y2="160" stroke="url(#sm-fd-g)" strokeWidth="1.5" opacity="0.5" /><line x1="400" y1="80" x2="400" y2="160" stroke="url(#sm-fd-g)" strokeWidth="1.5" opacity="0.5" />
        </svg>
      );
    case "half-day-tasweer":
      return (
        <svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" aria-label={label} role="img" style={COMMON_STYLE}>
          <defs><linearGradient id="sm-hd-g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f1cb82" /><stop offset="100%" stopColor="#b8924d" /></linearGradient></defs>
          <g transform="translate(300 120)">
            <circle r="90" fill="none" stroke="url(#sm-hd-g)" strokeWidth="3" />
            <circle r="6" fill="url(#sm-hd-g)" />
            <g stroke="url(#sm-hd-g)" strokeWidth="6" strokeLinecap="round" className="sm-hd-hands">
              <line x1="0" y1="0" x2="0" y2="-60" />
              <line x1="0" y1="0" x2="40" y2="20" />
            </g>
            <g fill="url(#sm-hd-g)"><circle cx="0" cy="-78" r="3" /><circle cx="78" cy="0" r="3" /><circle cx="0" cy="78" r="3" /><circle cx="-78" cy="0" r="3" /></g>
          </g>
        </svg>
      );
    case "bride-session":
      return (
        <svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" aria-label={label} role="img" style={COMMON_STYLE}>
          <defs><linearGradient id="sm-bs-g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f1cb82" /><stop offset="100%" stopColor="#b8924d" /></linearGradient></defs>
          <g transform="translate(300 120)" fill="url(#sm-bs-g)">
            <path d="M-100 40 L-65 -40 L-30 30 L0 -70 L30 30 L65 -40 L100 40 Z" />
            <rect x="-110" y="46" width="220" height="12" rx="4" />
            <circle cx="-65" cy="-50" r="9" /><circle cx="0" cy="-86" r="11" /><circle cx="65" cy="-50" r="9" />
          </g>
        </svg>
      );
    case "ladies-event":
    default:
      return (
        <svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" aria-label={label} role="img" style={COMMON_STYLE}>
          <defs><linearGradient id="sm-le-g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f1cb82" /><stop offset="100%" stopColor="#b8924d" /></linearGradient></defs>
          <g fill="url(#sm-le-g)" className="sm-le-figures">
            <g transform="translate(160 170)"><ellipse cx="0" cy="0" rx="18" ry="40" /><circle cx="0" cy="-30" r="11" /></g>
            <g transform="translate(240 180)"><ellipse cx="0" cy="0" rx="20" ry="44" /><circle cx="0" cy="-34" r="12" /></g>
            <g transform="translate(320 170)"><ellipse cx="0" cy="0" rx="18" ry="40" /><circle cx="0" cy="-30" r="11" /></g>
            <g transform="translate(400 175)"><ellipse cx="0" cy="0" rx="19" ry="42" /><circle cx="0" cy="-32" r="11" /></g>
            <g transform="translate(440 170)" opacity="0.7"><ellipse cx="0" cy="0" rx="17" ry="38" /><circle cx="0" cy="-28" r="10" /></g>
          </g>
        </svg>
      );
  }
}
