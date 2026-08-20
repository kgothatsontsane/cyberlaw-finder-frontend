"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function EncryptedText({ text, className, revealOnHover = true }) {
  const [displayText, setDisplayText] = useState(text);
  const [isRevealed, setIsRevealed] = useState(!revealOnHover);
  const intervalRef = useRef(null);

  const scramble = () => {
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
  };

  useEffect(() => {
    if (isRevealed) {
      scramble();
    } else {
      setDisplayText(text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
    }
  }, [isRevealed, text]);

  if (!revealOnHover) {
    useEffect(() => { scramble(); }, [text]);
    return <span className={className}>{displayText}</span>;
  }

  return (
    <motion.span
      className={className}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      {displayText}
    </motion.span>
  );
}
