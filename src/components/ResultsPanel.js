"use client";
import { IconSearch, IconAlertTriangle, IconArrowLeft, IconBrain, IconChartBar } from "@tabler/icons-react";
import { ResultCard } from "@/components/ResultCard";
import { IncidentResponsePanel } from "@/components/IncidentResponsePanel";

export function ResultsPanel({ results, query, jurisdiction, onNewSearch }) {
  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center rise">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg border border-cyber-warn/30 bg-cyber-warn/5 flex items-center justify-center">
            <IconAlertTriangle className="w-8 h-8 text-cyber-warn" />
          </div>
          <h1 className="text-xl font-serif font-semibold text-text-primary mb-2">
            No matching laws found
          </h1>
          <p className="text-text-muted text-sm mb-6 max-w-md mx-auto leading-relaxed">
            The AI couldn&apos;t find relevant laws for your scenario. Try rephrasing with more
            detail or selecting a different jurisdiction.
          </p>
          <button
            onClick={onNewSearch}
            className="px-5 py-2.5 rounded-lg bg-cyber-accent/10 hover:bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/30 text-sm transition-colors duration-150"
          >
            New Search
          </button>
        </div>
      </div>
    );
  }

  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
  const categories = [...new Set(results.map((r) => r.category))];

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 max-w-4xl mx-auto">
      <div className="mb-10 rise">
        <button
          onClick={onNewSearch}
          className="flex items-center gap-2 text-text-muted hover:text-cyber-accent transition-colors duration-150 text-xs mb-6 group"
        >
          <IconArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" />
          <span>New Search</span>
        </button>

        <div className="p-6 rounded-lg border border-cyber-gray bg-cyber-navy">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyber-accent/10 border border-cyber-accent/20 flex items-center justify-center">
                <IconSearch className="w-5 h-5 text-cyber-accent" />
              </div>
              <div>
                <h1 className="text-lg font-serif font-semibold text-text-primary">
                  Investigation Report
                </h1>
                <p className="text-xs text-text-muted">
                  {jurisdiction?.name} &middot; Semantic search
                </p>
              </div>
            </div>
            <span className="law-id px-2.5 py-1 rounded bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20">
              {results.length} statutes matched
            </span>
          </div>

          <blockquote className="p-4 rounded-md bg-cyber-bg-deep border-l-2 border-cyber-accent">
            <p className="text-sm text-text-primary font-serif italic mb-2">
              &ldquo;{query}&rdquo;
            </p>
            <footer className="flex items-center gap-3 text-[11px] text-text-muted flex-wrap">
              <span className="flex items-center gap-1.5">
                <IconBrain className="w-3 h-3" />
                AI confidence: {(avgScore * 100).toFixed(0)}%
              </span>
              <span className="w-px h-3 bg-cyber-border" />
              <span className="flex items-center gap-1.5">
                <IconChartBar className="w-3 h-3" />
                {categories.length} categories
              </span>
              <span className="w-px h-3 bg-cyber-border" />
              <span>75 laws searched</span>
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="space-y-3">
        {results.map((law) => (
          <ResultCard key={law.id} law={law} />
        ))}
      </div>

      <IncidentResponsePanel results={results} jurisdiction={jurisdiction} />
    </div>
  );
}