"use client";
import { motion } from "framer-motion";
import { IconShield, IconArrowRight, IconDatabase, IconBooks, IconSearch } from "@tabler/icons-react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { BackgroundBeams } from "@/components/ui/background-beams";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function JurisdictionSelector({ jurisdictions, onSelect, onBrowse }) {
  return (
    <HeroHighlight>
      <BackgroundBeams />

      <motion.div variants={container} initial="hidden" animate="show" className="text-center mb-14">
        <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/[0.03] mb-6">
          <span className="w-2 h-2 rounded-full bg-cyber-teal animate-pulse" />
          <span className="text-xs font-mono text-cyber-cyan/80 tracking-widest uppercase">Semantic Law Search</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl md:text-8xl font-bold font-mono mb-6 tracking-tight"
        >
          <Highlight>CyberLaw</Highlight>{" "}
          <span className="text-gray-200">Finder</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-gray-400 font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Describe a cybercrime scenario in plain language.
          <br />
          <span className="text-cyber-cyan/70 font-mono text-sm">AI understands context — not just keywords.</span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-[0.2em]">
          <span className="h-px w-8 bg-cyber-gray" />
          Select jurisdiction
          <span className="h-px w-8 bg-cyber-gray" />
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto px-4">
        {jurisdictions.map((jur, index) => (
          <motion.button
            key={jur.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + index * 0.12, type: "spring", stiffness: 200, damping: 20 }}
            onClick={() => onSelect(jur)}
            className="group relative p-6 rounded-2xl glass hover:border-cyber-cyan/40 transition-all duration-500 text-left"
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 70%)",
              }}
            />

            {jur.primary && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/30">
                <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-wider">Primary</span>
              </div>
            )}

            <div className="relative z-10">
              <motion.div
                className="w-12 h-12 rounded-xl bg-cyber-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyber-cyan/20 transition-colors"
              >
                <IconDatabase className="w-6 h-6 text-cyber-cyan" />
              </motion.div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{jur.flag}</span>
                <h3 className="text-lg font-semibold font-mono text-gray-100">
                  {jur.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-gray-400">
                  {jur.laws} statutes indexed
                </span>
                <span className="w-1 h-1 rounded-full bg-cyber-cyan/40" />
                <span className="text-xs font-mono text-cyber-cyan/60">
                  AI-ready
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-mono text-cyber-cyan/0 group-hover:text-cyber-cyan transition-all duration-300">
                <span>Launch investigation</span>
                <IconArrowRight className="w-3 h-3" />
              </div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)",
              }}
            />
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-12 text-center"
      >
        <motion.button
          onClick={onBrowse}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyber-gray/50 bg-cyber-navy/40 hover:border-cyber-cyan/30 hover:bg-cyber-cyan/[0.03] transition-all duration-300 group"
        >
          <IconBooks className="w-4 h-4 text-cyber-cyan group-hover:text-cyber-teal transition-colors" />
          <span className="text-sm font-mono text-gray-400 group-hover:text-gray-200 transition-colors">
            Browse All Laws
          </span>
          <IconSearch className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyber-cyan transition-colors" />
          <span className="text-[10px] font-mono text-gray-600 group-hover:text-cyber-cyan/70 transition-colors">
            75 statutes
          </span>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-4 text-xs font-mono text-gray-600">
          <span className="flex items-center gap-1.5">
            <IconShield className="w-3 h-3" />
            75 laws
          </span>
          <span className="w-px h-3 bg-cyber-gray" />
          <span>3 jurisdictions</span>
          <span className="w-px h-3 bg-cyber-gray" />
          <span>NLP semantic search</span>
        </div>
      </motion.div>
    </HeroHighlight>
  );
}
