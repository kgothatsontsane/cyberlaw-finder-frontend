"use client";
import { useState, useRef, useCallback } from "react";
import { IconSearch, IconArrowRight, IconKeyboard } from "@tabler/icons-react";

const PLACEHOLDERS = [
  "Someone hacked into my email account...",
  "I received a phishing email asking for my password...",
  "My computer was infected with ransomware...",
  "Someone is posting threats about me online...",
  "A former employee stole our customer database...",
];

export function VanishInput({ onSubmit, className }) {
  const [value, setValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = useCallback(() => {
    if (!value.trim() || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      onSubmit(value);
      setIsAnimating(false);
    }, 150);
  }, [value, onSubmit, isAnimating]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className || ""}`}>
      <div className="relative flex items-center bg-cyber-navy border border-cyber-gray rounded-lg transition-colors duration-150 focus-within:border-cyber-accent/60">
        <div className="flex items-center gap-2 ml-4">
          <IconSearch className="w-5 h-5 text-cyber-accent" />
          <span className="w-px h-5 bg-cyber-border" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDERS[0]}
          className="flex-1 bg-transparent px-4 py-4 text-text-primary placeholder:text-text-muted focus:outline-none font-serif text-base"
          disabled={isAnimating}
        />

        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          aria-label="Search"
          className="m-2 p-2.5 rounded-md bg-cyber-accent/10 hover:bg-cyber-accent/20 disabled:opacity-30 transition-colors duration-150"
        >
          <IconArrowRight className="w-5 h-5 text-cyber-accent" />
        </button>
      </div>

      <div className="mt-3 flex justify-between items-center text-xs">
        <span className="text-text-muted flex items-center gap-1.5">
          <IconKeyboard className="w-3.5 h-3.5" />
          Press Enter to search
        </span>
        <span className={value.length > 1800 ? "text-cyber-warn" : "text-text-muted"}>
          {value.length}/2000
        </span>
      </div>
    </div>
  );
}