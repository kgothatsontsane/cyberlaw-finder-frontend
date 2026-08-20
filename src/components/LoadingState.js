"use client";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const NLP_STEPS = [
  { text: "Analyzing query semantics...", icon: "search" },
  { text: "Extracting key entities with spaCy...", icon: "extract" },
  { text: "Encoding to 384-dim vector space...", icon: "encode" },
  { text: "Cosine similarity against 75 laws...", icon: "search" },
  { text: "Ranking by semantic relevance...", icon: "score" },
  { text: "Preparing forensic guidance...", icon: "prepare" },
];

export function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-lg">
        <p className="text-center text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mb-8">
          AI Processing Pipeline
        </p>
        <MultiStepLoader loadingStates={NLP_STEPS} />
      </div>
    </div>
  );
}
