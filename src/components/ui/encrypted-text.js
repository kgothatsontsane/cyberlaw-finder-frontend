"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const SCRAMBLE_LIMIT = 120;

export function EncryptedText({ text, className, revealOnHover = true }) {
  const [displayText, setDisplayText] = useState(text);
  const [isRevealed, setIsRevealed] = useState(!revealOnHover);
  const intervalRef = useRef(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 2;
    }, 30);
  }, [text]);

  const showPlain = text.length > SCRAMBLE_LIMIT;

  useEffect(() => {
    if (isRevealed && !showPlain) {
      scramble();
    } else {
      setDisplayText(text);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRevealed, text, scramble, showPlain]);

  return (
    <span
      className={className}
      onMouseEnter={revealOnHover ? () => setIsRevealed(true) : undefined}
      onMouseLeave={revealOnHover ? () => setIsRevealed(false) : undefined}
    >
      {displayText}
    </span>
  );
}