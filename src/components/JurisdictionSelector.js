"use client";
import { IconArrowRight, IconBooks, IconShield } from "@tabler/icons-react";

export function JurisdictionSelector({ jurisdictions, onSelect, onBrowse }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cyber-dark px-4 py-24">
      <div className="text-center mb-14 rise">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-gray bg-cyber-navy/60 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent-2" />
          <span className="text-xs text-cyber-accent tracking-widest uppercase">AI-Powered Forensics</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight">
          <span className="text-cyber-accent">CyberLaw</span> <span className="text-text-primary">Finder</span>
        </h1>

        <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
          Describe a cybercrime scenario in plain language.
          <br />
          <span className="text-sm text-text-muted">The AI understands context — not just keywords.</span>
        </p>
      </div>

      <p className="text-center mb-8 rise">
        <span className="inline-flex items-center gap-3 text-xs text-text-muted uppercase tracking-[0.15em]">
          <span className="h-px w-8 bg-cyber-border" />
          Select jurisdiction
          <span className="h-px w-8 bg-cyber-border" />
        </span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full rise-view">
        {jurisdictions.map((jur) => (
          <button
            key={jur.id}
            onClick={() => onSelect(jur)}
            className="group relative p-6 rounded-lg border border-cyber-gray bg-cyber-navy hover:border-cyber-accent/50 transition-colors duration-150 text-left"
          >
            {jur.primary && (
              <span className="absolute -top-2.5 left-5 px-2 py-0.5 rounded bg-cyber-accent text-white text-[10px] uppercase tracking-wider">
                Primary
              </span>
            )}

            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{jur.flag}</span>
              <h2 className="text-lg font-semibold font-serif text-text-primary">
                {jur.name}
              </h2>
            </div>

            <p className="text-xs text-text-muted mb-4">
              {jur.laws} statutes indexed
            </p>

            <span className="inline-flex items-center gap-1.5 text-sm text-cyber-accent">
              Launch investigation
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 rise-view">
        <button
          onClick={onBrowse}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyber-gray bg-cyber-navy hover:border-cyber-accent/50 transition-colors duration-150"
        >
          <IconBooks className="w-4 h-4 text-cyber-accent" />
          <span className="text-sm text-text-secondary">Browse all laws</span>
        </button>
      </div>

      <div className="mt-6 rise-view">
        <p className="inline-flex items-center gap-3 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <IconShield className="w-3.5 h-3.5" />
            96 laws
          </span>
          <span className="w-px h-3 bg-cyber-border" />
          <span>3 jurisdictions</span>
          <span className="w-px h-3 bg-cyber-border" />
          <span>Semantic search</span>
        </p>
      </div>
    </div>
  );
}