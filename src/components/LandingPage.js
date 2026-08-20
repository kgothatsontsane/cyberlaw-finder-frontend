"use client";
import { motion } from "framer-motion";
import { IconShieldLock, IconArrowRight, IconDatabase, IconBrain, IconWorld } from "@tabler/icons-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

const stats = [
  { icon: IconDatabase, value: "96", label: "Statutes Indexed" },
  { icon: IconWorld, value: "3", label: "Jurisdictions" },
  { icon: IconBrain, value: "AI", label: "Semantic Search" },
];

export function LandingPage({ onEnter }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark">
      <BackgroundBeams />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-grid-sm"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/20 mb-6">
            <IconShieldLock className="w-10 h-10 text-cyber-cyan" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold font-mono mb-4 tracking-tight"
        >
          <span className="text-cyber-cyan">CyberLaw</span>{" "}
          <span className="text-gray-100">Finder</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-4"
        >
          AI-powered cybercrime law search for digital forensic investigations.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-gray-500 font-mono text-sm"
        >
          Describe an incident in plain language. The AI finds relevant laws — even when words don&apos;t match.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center gap-8 my-10"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <stat.icon className="w-5 h-5 text-cyber-cyan/60" />
              <span className="text-2xl font-bold font-mono text-gray-200">{stat.value}</span>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          onClick={onEnter}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyber-cyan hover:bg-cyber-cyan/90 text-white font-mono font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyber-cyan/20 group"
        >
          Enter CyberLaw Finder
          <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-6 text-[11px] font-mono text-gray-600"
        >
          Powered by sentence-transformers NLP • South Africa, USA, Germany/EU
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">
          Digital Forensics Module — COS783
        </span>
      </motion.div>
    </div>
  );
}
