"use client";
import { IconArrowLeft, IconDatabase, IconBrain } from "@tabler/icons-react";
import { VanishInput } from "@/components/ui/vanish-input";
import { SampleScenarios } from "@/components/SampleScenarios";

export function SearchInput({ jurisdiction, onSearch, onBack }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 rise">
      <button
        onClick={onBack}
        className="absolute top-24 left-8 flex items-center gap-2 text-text-muted hover:text-cyber-accent transition-colors duration-150 text-sm group"
      >
        <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
        <span>Change jurisdiction</span>
      </button>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-gray bg-cyber-navy/60 mb-6">
          <span>{jurisdiction.flag}</span>
          <span className="law-id text-cyber-accent">{jurisdiction.name}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
          Describe the <span className="text-cyber-accent">incident</span>
        </h1>

        <p className="flex items-center justify-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <IconDatabase className="w-3.5 h-3.5" />
            {jurisdiction.laws} laws indexed
          </span>
          <span className="w-px h-3 bg-cyber-border" />
          <span className="flex items-center gap-1.5">
            <IconBrain className="w-3.5 h-3.5" />
            AI semantic search active
          </span>
        </p>
      </div>

      <VanishInput onSubmit={onSearch} />

      <SampleScenarios onSelect={onSearch} />
    </div>
  );
}