"use client";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const NLP_STEPS = [
  { text: "Analyzing query semantics..." },
  { text: "Extracting key entities with spaCy..." },
  { text: "Encoding to 384-dim vector space..." },
  { text: "Cosine similarity against 75 laws..." },
  { text: "Ranking by semantic relevance..." },
  { text: "Preparing forensic guidance..." },
];

export function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-lg rise">
        <p className="text-center text-xs text-text-muted uppercase tracking-[0.15em] mb-8">
          AI Processing Pipeline
        </p>
        <MultiStepLoader loadingStates={NLP_STEPS} />
      </div>
    </div>
  );
}