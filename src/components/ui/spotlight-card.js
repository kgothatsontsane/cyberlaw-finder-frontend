"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SpotlightCard({ children, className, spotlightSize = 300 }) {
  const glowRef = useRef(null);
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const glow = glowRef.current;
    const card = cardRef.current;
    if (!glow || !card) return;
    const rect = card.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left - spotlightSize / 2}px`;
    glow.style.top = `${e.clientY - rect.top - spotlightSize / 2}px`;
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-xl border border-cyber-gray bg-cyber-navy overflow-hidden",
        "transition-all duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {isHovered && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute rounded-full will-change-[left,top]"
          style={{
            width: spotlightSize,
            height: spotlightSize,
            left: -spotlightSize,
            top: -spotlightSize,
            background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}