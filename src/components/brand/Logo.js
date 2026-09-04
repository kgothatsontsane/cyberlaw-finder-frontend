"use client";

export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" data-testid="logo-mark">
      <circle cx="10.5" cy="9.5" r="6" stroke="currentColor" strokeWidth="2.2" />
      <path d="M 15.1 14.1 L 20.3 19.3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M 7.2 7 H 13.8 M 7.2 9.5 H 13.8 M 7.2 12 H 11.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}