"use client";

export function LogoMark({ className, blink = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" data-testid="logo-mark">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 16.2 4.6 C 14.8 2.6, 12.4 1.6, 10.6 1.7 C 8.8 1.8, 7.2 2.4, 6.2 3.4 C 5.7 3.9, 5.9 4.5, 6.8 5.1 C 7.8 5.8, 9.0 6.5, 10.8 7.4 C 12.8 8.4, 14.6 9.2, 16.0 10.1 C 17.0 10.9, 17.3 11.6, 17.0 12.2 C 16.6 13.0, 15.4 13.9, 13.6 14.4" />
        <path d="M 6.6 7.5 C 5.6 8.1, 4.7 8.9, 4.5 9.8 C 4.3 10.7, 4.7 11.5, 5.6 12.1 C 7.2 12.8, 9.2 13.4, 11.2 14.1 C 13.2 14.9, 14.8 15.7, 15.3 16.7 C 15.7 17.6, 15.5 18.3, 14.9 18.8 C 13.9 19.6, 12.1 20.0, 10.5 19.9 C 8.6 19.8, 6.8 19.2, 5.9 18.2 C 5.3 17.7, 5.0 17.5, 4.8 17.3" />
        <path
          d="M 16.6 21.5 L 22.0 21.5"
          strokeWidth="2.3"
          className={blink ? "logo-cursor-blink" : undefined}
        />
      </g>
    </svg>
  );
}