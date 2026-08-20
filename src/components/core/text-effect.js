"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextEffect({
  children,
  per = "word",
  preset = "fade",
  delay = 0.05,
  className,
}) {
  const [scope, animate] = useAnimate();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const elements = scope.current?.querySelectorAll(".motion-char");
    if (!elements) return;

    const variants = {
      fade: { opacity: [0, 1], y: [10, 0] },
      slide: { opacity: [0, 1], x: [-10, 0] },
      scale: { opacity: [0, 1], scale: [0.8, 1] },
      blur: { opacity: [0, 1], filter: ["blur(8px)", "blur(0px)"] },
    };

    animate(
      ".motion-char",
      variants[preset] || variants.fade,
      { duration: 0.4, delay: stagger(delay) }
    );
    setHasAnimated(true);
  }, [scope, animate, hasAnimated, delay, preset]);

  const processChildren = (text) => {
    if (per === "word") {
      return text.split(" ").map((word, i, arr) => (
        <span key={i} className="motion-char inline-block mr-1.5 opacity-0">
          {word}
          {i < arr.length - 1 ? " " : ""}
        </span>
      ));
    }
    return text.split("").map((char, i) => (
      <span key={i} className="motion-char inline-block opacity-0">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <span ref={scope} className={cn("inline", className)}>
      {processChildren(children)}
    </span>
  );
}
