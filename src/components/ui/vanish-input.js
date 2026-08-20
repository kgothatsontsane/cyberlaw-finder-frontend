"use client";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
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
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = useCallback(() => {
    if (!value.trim() || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      onSubmit(value);
      setIsAnimating(false);
    }, 200);
  }, [value, onSubmit, isAnimating]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className || ""}`}>
      <div className="relative">
        <motion.div
          className="absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-700"
          style={{
            background: "linear-gradient(135deg, rgba(6,182,212,0.5), rgba(139,92,246,0.3), rgba(20,184,166,0.4))",
            filter: "blur(8px)",
          }}
          animate={{ opacity: isFocused ? 0.6 : 0 }}
        />

        <div className="relative flex items-center bg-cyber-navy/90 border border-cyber-gray rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="flex items-center gap-2 ml-5">
            <motion.div
              animate={{ scale: isFocused ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <IconSearch className="w-5 h-5 text-cyber-cyan" />
            </motion.div>
            <motion.div
              className="w-px h-5 bg-cyber-gray"
              animate={{ opacity: isFocused ? 1 : 0.3 }}
            />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={PLACEHOLDERS[0]}
            className="flex-1 bg-transparent px-4 py-5 text-gray-100 placeholder-gray-500 focus:outline-none font-mono text-sm"
            disabled={isAnimating}
          />

          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!value.trim()}
            className="mr-2 p-2.5 rounded-xl transition-all duration-300 disabled:opacity-30"
            style={{
              background: value.trim() ? "linear-gradient(135deg, rgba(6,182,212,0.3), rgba(20,184,166,0.2))" : "rgba(6,182,212,0.1)",
              border: value.trim() ? "1px solid rgba(6,182,212,0.4)" : "1px solid transparent",
            }}
          >
            <IconArrowRight className="w-5 h-5 text-cyber-cyan" />
          </motion.button>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center text-xs font-mono">
        <span className="text-gray-500 flex items-center gap-1.5">
          <IconKeyboard className="w-3 h-3" />
          Press Enter to search
        </span>
        <span className={value.length > 1800 ? "text-cyber-amber" : "text-gray-500"}>
          {value.length}/2000
        </span>
      </div>
    </div>
  );
}
