"use client";
import { motion } from "framer-motion";
import { IconArrowLeft, IconDatabase, IconBrain } from "@tabler/icons-react";
import { VanishInput } from "@/components/ui/vanish-input";
import { SampleScenarios } from "@/components/SampleScenarios";

export function SearchInput({ jurisdiction, onSearch, onBack }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative">
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-24 left-8 flex items-center gap-2 text-gray-400 hover:text-cyber-cyan transition-colors font-mono text-sm group"
      >
        <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Change jurisdiction</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/[0.03] mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-lg">{jurisdiction.flag}</span>
          <span className="text-xs font-mono text-cyber-cyan/70">{jurisdiction.name}</span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold font-mono text-gray-100 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Describe the <span className="text-cyber-cyan text-glow-cyan">incident</span>
        </motion.h2>

        <motion.div
          className="flex items-center justify-center gap-4 text-xs font-mono text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center gap-1.5">
            <IconDatabase className="w-3 h-3 text-cyber-cyan/50" />
            {jurisdiction.laws} laws indexed
          </span>
          <span className="w-px h-3 bg-cyber-gray" />
          <span className="flex items-center gap-1.5">
            <IconBrain className="w-3 h-3 text-cyber-cyan/50" />
            AI semantic search active
          </span>
        </motion.div>
      </motion.div>

      <VanishInput onSubmit={onSearch} />

      <SampleScenarios onSelect={onSearch} />
    </div>
  );
}
