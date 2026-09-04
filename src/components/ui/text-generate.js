"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextGenerateEffect({ words, className, delay = 0.05 }) {
  const [scope, animate] = useAnimate();
  const [hasAnimated, setHasAnimated] = useState(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (hasAnimated) return;
    animate(
      "span",
      { opacity: 1, y: 0 },
      { duration: 0.4, delay: stagger(delay) }
    );
    setHasAnimated(true);
  }, [scope, animate, hasAnimated, delay]);

  return (
    <div className={cn("text-lg leading-relaxed", className)} ref={scope}>
      {wordsArray.map((word, i) => (
        <motion.span
          key={word + i}
          className="text-gray-400 opacity-0 inline-block mr-2"
          initial={{ y: 10 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
