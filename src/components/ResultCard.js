"use client";
import { useState } from "react";
import {
  IconTag, IconChevronDown, IconChevronUp,
  IconExternalLink, IconBrain, IconFileCertificate,
  IconClock, IconBuildingBank, IconGavel,
} from "@tabler/icons-react";

function ScoreRing({ score }) {
  const clamped = Math.max(0, Math.min(score, 1));
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - clamped * circumference;

  const color = clamped > 0.7
    ? "rgb(var(--cyber-accent-2))"
    : clamped > 0.5
      ? "rgb(var(--cyber-accent))"
      : clamped > 0.05
        ? "rgb(var(--cyber-warn))"
        : "rgb(var(--cyber-muted))";

  const display = clamped > 0 ? Math.round(clamped * 100) : "—";

  return (
    <div className="relative w-12 h-12 flex-shrink-0" aria-label={`Relevance ${display}%`}>
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} fill="none" strokeWidth="3" style={{ stroke: "rgb(var(--cyber-border))" }} />
        <circle
          cx="22" cy="22" r={radius} fill="none"
          strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ stroke: color, transition: "stroke 0.2s ease-out" }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[11px] font-bold font-mono"
        style={{ color }}
      >
        {display}
      </span>
    </div>
  );
}

export function ResultCard({ law }) {
  const [expanded, setExpanded] = useState(false);
  const clampedScore = Math.max(0, law.score);
  const isHighMatch = clampedScore > 0.5;
  const isIrrelevant = clampedScore < 0.05;

  return (
    <article data-testid="result-card" className={`rounded-lg border border-cyber-gray bg-cyber-navy overflow-hidden rise-view ${isIrrelevant ? "opacity-60" : ""}`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <ScoreRing score={law.score} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="law-id text-text-muted bg-cyber-bg-deep px-2 py-0.5 rounded">
                {law.id}
              </span>
              {isHighMatch && (
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-cyber-accent-2 border border-cyber-accent-2/30 bg-cyber-accent-2/5 px-2 py-0.5 rounded">
                  Strong match
                </span>
              )}
            </div>

            <h2 className="text-base font-serif font-semibold text-text-primary mb-1 leading-snug">
              {law.title}
            </h2>
            <p className="law-id text-cyber-accent mb-2">
              {law.law_name} — {law.section}
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">{law.summary}</p>

            <div className="flex items-center gap-4 mt-3 text-[11px] text-text-muted flex-wrap">
              <span className="flex items-center gap-1">
                <IconGavel className="w-3 h-3" />
                {law.penalty}
              </span>
              <span className="flex items-center gap-1">
                <IconTag className="w-3 h-3" />
                {law.category.replace(/_/g, " ")}
              </span>
              <span className="flex items-center gap-1">
                <IconClock className="w-3 h-3" />
                {law.year_enacted || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-cyber-gray rise">
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-md bg-cyber-bg-deep border border-cyber-gray">
              <p className="law-id text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <IconBrain className="w-3 h-3" />
                AI Analysis
              </p>
              <p className="text-xs text-text-secondary leading-relaxed">
                {law.ai_notes || "Semantic similarity detected between your query and this law's text."}
              </p>
              {law.keywords && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {law.keywords.slice(0, 5).map((kw, i) => (
                    <span key={i} className="law-id px-2 py-0.5 bg-cyber-navy text-text-secondary rounded border border-cyber-gray">
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 rounded-md bg-cyber-bg-deep border border-cyber-gray">
              <p className="law-id text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <IconFileCertificate className="w-3 h-3" />
                Full Legal Text
              </p>
              <p className="text-sm text-text-secondary font-serif leading-relaxed">
                {law.full_text}
              </p>
            </div>

            {law.reporting_info && (
              <div className="p-4 rounded-md border border-cyber-warn/25 bg-cyber-warn/[0.04]">
                <p className="law-id text-cyber-warn uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <IconBuildingBank className="w-3 h-3" />
                  Incident Response
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-text-primary mb-1">{law.reporting_info.primary_authority}</p>
                    <p className="law-id text-text-muted mb-0.5">{law.reporting_info.contact}</p>
                    {law.reporting_info.email && (
                      <p className="law-id text-text-muted mb-0.5">{law.reporting_info.email}</p>
                    )}
                    {law.reporting_info.reporting_portal && (
                      <a href={law.reporting_info.reporting_portal} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-cyber-accent hover:underline mt-1">
                        Online Reporting Portal <IconExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  {law.reporting_info.evidence_preservation && (
                    <div>
                      <p className="text-[11px] text-text-secondary mb-1.5">Evidence checklist:</p>
                      {law.reporting_info.evidence_preservation.slice(0, 4).map((item, i) => (
                        <p key={i} className="text-[11px] text-text-muted flex items-start gap-1.5">
                          <span className="text-cyber-accent/60 mt-0.5">•</span>
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="w-full p-3 text-center text-xs text-text-muted hover:text-text-primary transition-colors duration-150 border-t border-cyber-gray flex items-center justify-center gap-1.5 hover:bg-cyber-bg-deep"
      >
        {expanded ? (
          <>
            <IconChevronUp className="w-3 h-3" />
            Collapse details
          </>
        ) : (
          <>
            <IconChevronDown className="w-3 h-3" />
            View full law, AI analysis &amp; reporting info
          </>
        )}
      </button>
    </article>
  );
}