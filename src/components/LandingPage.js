"use client";
import { IconArrowRight, IconDatabase, IconBrain, IconWorld } from "@tabler/icons-react";
import { LogoMark } from "@/components/brand/Logo";

const stats = [
  { icon: IconDatabase, value: "96", label: "Statutes indexed" },
  { icon: IconWorld, value: "3", label: "Jurisdictions" },
  { icon: IconBrain, value: "AI", label: "Semantic search" },
];

export function LandingPage({ onEnter }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cyber-dark">
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center rise">
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl border border-cyber-gray bg-cyber-navy/60 mb-8">
            <LogoMark className="w-12 h-12 text-cyber-accent" blink />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight">
            <span className="text-cyber-accent">CyberLaw</span>{" "}
            <span>Finder</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-lg mx-auto leading-relaxed mb-3">
            AI-powered cybercrime law search for digital forensic investigations.
          </p>

          <p className="text-sm text-text-muted max-w-md mx-auto">
            Describe an incident in plain language. The AI finds the laws that apply — even when the words don&apos;t match.
          </p>
        </div>

        <div className="flex items-center justify-center gap-10 my-10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <stat.icon className="w-4 h-4 text-cyber-accent/70" />
              <span className="text-2xl font-bold font-serif text-text-primary">{stat.value}</span>
              <span className="text-[11px] text-text-muted uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onEnter}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-cyber-accent hover:bg-cyber-accent/90 text-white font-medium text-base transition-colors duration-150 group"
        >
          Enter CyberLaw Finder
          <IconArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-150" />
        </button>

        <p className="mt-8 text-xs text-text-muted">
          Powered by sentence-transformers NLP &middot; South Africa, USA, Germany/EU
        </p>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="text-[11px] text-text-muted uppercase tracking-[0.15em]">
          Digital Forensics Module — COS783
        </span>
      </div>
    </div>
  );
}