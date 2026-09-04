"use client";
import { useState, useEffect } from "react";
import { IconCheck } from "@tabler/icons-react";

const DEFAULT_STEPS = [
  { text: "Analyzing query semantics..." },
  { text: "Preprocessing with spaCy NLP..." },
  { text: "Encoding to 384-dim vector space..." },
  { text: "Computing cosine similarity..." },
  { text: "Ranking by semantic relevance..." },
  { text: "Preparing forensic guidance..." },
];

export function MultiStepLoader({ loadingStates }) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = loadingStates || DEFAULT_STEPS;

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length]);

  return (
    <div data-testid="multi-step-loader" className="flex flex-col items-center justify-center min-h-[40vh] gap-8">
      <div className="w-full max-w-sm space-y-1">
        {steps.map((step, index) => (
          <div
            key={step.text}
            className="flex items-center gap-3 py-1.5"
            style={{ opacity: index <= currentStep ? 1 : 0.35, transition: "opacity 0.2s ease-out" }}
          >
            <span
              className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors duration-200 ${
                index < currentStep
                  ? "bg-cyber-accent-2/10 border-cyber-accent-2/40"
                  : index === currentStep
                    ? "border-cyber-accent/50"
                    : "border-cyber-gray"
              }`}
            >
              {index < currentStep && <IconCheck className="w-3 h-3 text-cyber-accent-2" />}
            </span>
            <span className={`text-xs ${index <= currentStep ? "text-text-primary" : "text-text-muted"}`}>
              {step.text}
            </span>
          </div>
        ))}
      </div>

      <div
        className="w-full max-w-sm h-0.5 bg-cyber-border rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(((currentStep + 1) / steps.length) * 100)}
      >
        <div
          className="h-full bg-cyber-accent rounded-full"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            transition: "width 0.4s ease-out",
          }}
        />
      </div>
    </div>
  );
}