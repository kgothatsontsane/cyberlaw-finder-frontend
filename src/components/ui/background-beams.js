"use client";
import { motion } from "framer-motion";

function BeamLine({ left, delay }) {
  return (
    <motion.div
      className="absolute w-px h-full will-change-transform"
      style={{ left }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.3, 0] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/40 to-transparent" />
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-cyber-cyan/60 rounded-full blur-sm"
        animate={{ y: ["0vh", "110vh"] }}
        transition={{ duration: 4, delay, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

export function BackgroundBeams() {
  const beamPositions = ["5%", "15%", "28%", "40%", "55%", "68%", "78%", "90%"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beamPositions.map((pos, i) => (
        <BeamLine key={i} left={pos} delay={i * 0.6} />
      ))}

    </div>
  );
}