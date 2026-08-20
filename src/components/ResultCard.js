"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconScale, IconGavel, IconTag, IconChevronDown, IconChevronUp,
  IconShield, IconExternalLink, IconBrain, IconArrowRight,
  IconFileCertificate, IconClock, IconBuildingBank,
} from "@tabler/icons-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { EncryptedText } from "@/components/ui/encrypted-text";

function ScoreRing({ score }) {
  const clamped = Math.max(0, Math.min(score, 1));
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped * circumference);

  const color = clamped > 0.7
    ? { stroke: "#14b8a6", bg: "rgba(20,184,166,0.1)" }
    : clamped > 0.5
      ? { stroke: "#06b6d4", bg: "rgba(6,182,212,0.1)" }
      : clamped > 0.05
        ? { stroke: "#f59e0b", bg: "rgba(245,158,11,0.1)" }
        : { stroke: "#6b7280", bg: "rgba(107,114,128,0.05)" };

  const display = clamped > 0 ? Math.round(clamped * 100) : "—";

  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <motion.circle
          cx="22" cy="22" r={radius} fill="none" stroke={color.stroke} strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold font-mono"
        style={{ color: color.stroke }}>
        {display}
      </span>
    </div>
  );
}

export function ResultCard({ law, index }) {
  const [expanded, setExpanded] = useState(false);
  const clampedScore = Math.max(0, law.score);
  const isHighMatch = clampedScore > 0.5;
  const isIrrelevant = clampedScore < 0.05;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
    >
      <SpotlightCard className="p-0 overflow-hidden">
        <div className={`p-6 ${isIrrelevant ? "opacity-60" : ""}`}>
          <div className="flex items-start gap-4">
            <ScoreRing score={law.score} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider bg-cyber-darker px-2 py-0.5 rounded">
                  {law.id}
                </span>
                {isHighMatch && (
                  <motion.span
                    className="flex items-center gap-1 text-[10px] font-mono text-cyber-teal bg-cyber-teal/10 px-2 py-0.5 rounded"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal animate-pulse" />
                    Strong match
                  </motion.span>
                )}
              </div>

              <h3 className="text-base font-semibold font-mono text-gray-100 mb-1">
                {law.title}
              </h3>
              <p className="text-xs text-cyber-cyan/80 font-mono mb-2">
                {law.law_name} — {law.section}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">{law.summary}</p>

              <div className="flex items-center gap-4 mt-3 text-[11px] font-mono text-gray-500">
                <span className="flex items-center gap-1">
                  <IconGavel className="w-3 h-3 text-cyber-cyan/50" />
                  {law.penalty}
                </span>
                <span className="flex items-center gap-1">
                  <IconTag className="w-3 h-3 text-cyber-cyan/50" />
                  {law.category.replace(/_/g, " ")}
                </span>
                <span className="flex items-center gap-1">
                  <IconClock className="w-3 h-3 text-cyber-cyan/50" />
                  {law.year_enacted || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-cyber-gray"
            >
              <div className="p-6 space-y-4">
                <div className="p-4 rounded-xl bg-cyber-darker border border-cyber-gray/30">
                  <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <IconBrain className="w-3 h-3 text-cyber-purple" />
                    AI Analysis
                  </p>
                  <p className="text-xs text-gray-400 font-mono leading-relaxed">
                    {law.ai_notes || "Semantic similarity detected between your query and this law's text."}
                  </p>
                  {law.keywords && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {law.keywords.slice(0, 5).map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] bg-cyber-navy text-gray-400 rounded font-mono border border-cyber-gray/30">
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-cyber-darker/50 border border-cyber-gray/30">
                  <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <IconFileCertificate className="w-3 h-3 text-cyber-cyan" />
                    Full Legal Text
                  </p>
                  <p className="text-sm text-gray-400 font-mono leading-relaxed">
                    <EncryptedText text={law.full_text} revealOnHover={false} />
                  </p>
                </div>

                {law.reporting_info && (
                  <div className="p-4 rounded-xl border border-cyber-amber/20" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.04) 0%, transparent 100%)" }}>
                    <p className="text-[11px] font-mono text-cyber-amber uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <IconBuildingBank className="w-3 h-3" />
                      Incident Response
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-300 font-mono mb-1">{law.reporting_info.primary_authority}</p>
                        <p className="text-[11px] text-gray-500 font-mono mb-0.5">{law.reporting_info.contact}</p>
                        {law.reporting_info.email && (
                          <p className="text-[11px] text-gray-500 font-mono mb-0.5">{law.reporting_info.email}</p>
                        )}
                        {law.reporting_info.reporting_portal && (
                          <a href={law.reporting_info.reporting_portal} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-cyber-cyan hover:text-cyber-teal font-mono mt-1">
                            Online Reporting Portal <IconExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      {law.reporting_info.evidence_preservation && (
                        <div>
                          <p className="text-[11px] text-gray-400 font-mono mb-1.5">Evidence checklist:</p>
                          {law.reporting_info.evidence_preservation.slice(0, 4).map((item, i) => (
                            <p key={i} className="text-[11px] text-gray-500 font-mono flex items-start gap-1.5">
                              <span className="text-cyber-cyan/50 mt-0.5">•</span>
                              {item}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full p-3 text-center text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors border-t border-cyber-gray/50 flex items-center justify-center gap-1.5 hover:bg-cyber-navy/50"
        >
          {expanded ? (
            <>
              <IconChevronUp className="w-3 h-3" />
              Collapse details
            </>
          ) : (
            <>
              <IconChevronDown className="w-3 h-3" />
              View full law, AI analysis & reporting info
            </>
          )}
        </button>
      </SpotlightCard>
    </motion.div>
  );
}
