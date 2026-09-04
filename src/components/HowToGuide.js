"use client";
import { useState } from "react";
import { IconX, IconSearch, IconBrain, IconShield, IconReport } from "@tabler/icons-react";

const STEPS = [
  {
    icon: IconSearch,
    title: "1. Select Jurisdiction",
    description: "Choose the country whose cybercrime laws you want to search — South Africa, USA, or Germany/EU.",
  },
  {
    icon: IconBrain,
    title: "2. Describe Your Incident",
    description: "Type what happened in plain language. The AI understands context and synonyms — you don't need legal terminology.",
  },
  {
    icon: IconShield,
    title: "3. Review Matching Laws",
    description: "The NLP engine finds the most semantically relevant laws, ranked by relevance score. Click any result to see full details.",
  },
  {
    icon: IconReport,
    title: "4. Take Action",
    description: "Each result includes which authorities to contact, how to preserve evidence, and direct links to reporting portals.",
  },
];

export function HowToGuide({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const StepIcon = STEPS[currentStep].icon;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
      style={{ animation: "rise 0.15s ease-out" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="How to use CyberLaw Finder"
    >
      <div
        className="bg-cyber-navy border border-cyber-gray rounded-lg p-8 max-w-lg w-full relative rise"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors duration-150"
        >
          <IconX className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-lg font-serif font-semibold text-text-primary mb-1">
            How to Use CyberLaw Finder
          </h2>
          <p className="text-sm text-text-muted">
            AI-powered cybercrime law search in 4 steps
          </p>
        </div>

        <div key={currentStep} className="text-center rise">
          <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-cyber-accent/10 border border-cyber-accent/25 flex items-center justify-center">
            <StepIcon className="w-7 h-7 text-cyber-accent" />
          </div>
          <h3 className="text-base font-serif font-semibold text-text-primary mb-2">
            {STEPS[currentStep].title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {STEPS[currentStep].description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prev}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Back
          </button>

          <div className="flex gap-1.5" aria-hidden="true" data-testid="step-dots">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${
                  i === currentStep ? "bg-cyber-accent" : "bg-cyber-border"
                }`}
              />
            ))}
          </div>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={next}
              className="px-4 py-2 text-sm text-cyber-accent hover:text-cyber-accent-2 transition-colors duration-150"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-cyber-accent/15 hover:bg-cyber-accent/25 text-cyber-accent rounded-md transition-colors duration-150"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}