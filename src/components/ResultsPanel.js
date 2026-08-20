"use client";
import { motion } from "framer-motion";
import { IconSearch, IconAlertTriangle, IconArrowLeft, IconBrain, IconChartBar } from "@tabler/icons-react";
import { ResultCard } from "@/components/ResultCard";
import { IncidentResponsePanel } from "@/components/IncidentResponsePanel";

export function ResultsPanel({ results, query, jurisdiction, onNewSearch }) {
  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyber-amber/10 flex items-center justify-center">
            <IconAlertTriangle className="w-10 h-10 text-cyber-amber" />
          </div>
          <h2 className="text-xl font-mono font-semibold text-gray-200 mb-2">
            No matching laws found
          </h2>
          <p className="text-gray-500 font-mono text-sm mb-6 max-w-md mx-auto leading-relaxed">
            The AI couldn&apos;t find relevant laws for your scenario. Try rephrasing with more detail or selecting a different jurisdiction.
          </p>
          <button
            onClick={onNewSearch}
            className="px-5 py-2.5 rounded-xl bg-cyber-cyan/10 hover:bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/20 font-mono text-sm transition-all"
          >
            New Search
          </button>
        </motion.div>
      </div>
    );
  }

  const avgScore = results.length > 0
    ? results.reduce((sum, r) => sum + r.score, 0) / results.length
    : 0;
  const categories = [...new Set(results.map((r) => r.category))];

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <button
          onClick={onNewSearch}
          className="flex items-center gap-2 text-gray-400 hover:text-cyber-cyan transition-colors font-mono text-xs mb-6 group"
        >
          <IconArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          <span>New Search</span>
        </button>

        <div className="p-6 rounded-2xl border border-cyber-gray/50 bg-cyber-navy/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 flex items-center justify-center">
                <IconSearch className="w-5 h-5 text-cyber-cyan" />
              </div>
              <div>
                <h2 className="text-lg font-semibold font-mono text-gray-100">
                  Investigation Report
                </h2>
                <p className="text-xs text-gray-500 font-mono">
                  {jurisdiction?.name} &bull; NLP semantic search
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20">
              {results.length} statutes matched
            </span>
          </div>

          <div className="p-4 rounded-xl bg-cyber-darker/50 border border-cyber-gray/30">
            <p className="text-sm text-gray-300 font-mono mb-1">
              &ldquo;{query}&rdquo;
            </p>
            <div className="flex items-center gap-4 text-[11px] font-mono text-gray-500 mt-2 flex-wrap">
              <span className="flex items-center gap-1.5">
                <IconBrain className="w-3 h-3 text-cyber-purple" />
                AI confidence: {(avgScore * 100).toFixed(0)}%
              </span>
              <span className="w-px h-3 bg-cyber-gray" />
              <span className="flex items-center gap-1.5">
                <IconChartBar className="w-3 h-3 text-cyber-teal" />
                {categories.length} categories matched
              </span>
              <span className="w-px h-3 bg-cyber-gray" />
              <span>75 laws searched</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        {results.map((law, index) => (
          <ResultCard key={law.id} law={law} index={index} />
        ))}
      </div>

      <IncidentResponsePanel results={results} jurisdiction={jurisdiction} />
    </div>
  );
}
