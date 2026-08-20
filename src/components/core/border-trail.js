"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BorderTrail({
  children,
  className,
  size = 60,
  trailColor = "from-cyber-cyan via-cyber-teal to-cyber-amber",
  duration = 4,
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <motion.div
        className={cn(
          "absolute inset-0 rounded-xl",
          `bg-gradient-to-r ${trailColor}`,
          "opacity-40 blur-md"
        )}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />
      {children}
    </div>
  );
}
