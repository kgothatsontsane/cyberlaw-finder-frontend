"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-cyber-navy border border-cyber-gray rounded-2xl p-8 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <IconX className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-mono font-semibold text-gray-200 mb-1">
            How to Use CyberLaw Finder
          </h2>
          <p className="text-sm text-gray-500 font-mono">
            AI-powered cybercrime law search in 4 steps
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-cyan/10 flex items-center justify-center">
              <StepIcon className="w-8 h-8 text-cyber-cyan" />
            </div>
            <h3 className="text-lg font-mono font-semibold text-gray-200 mb-2">
              {STEPS[currentStep].title}
            </h3>
            <p className="text-sm text-gray-400 font-mono">
              {STEPS[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prev}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-mono text-gray-400 hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>

          <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentStep ? "bg-cyber-cyan" : "bg-cyber-gray"
                }`}
              />
            ))}
          </div>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={next}
              className="px-4 py-2 text-sm font-mono text-cyber-cyan hover:text-cyber-teal transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-mono bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan rounded-lg transition-colors"
            >
              Get Started
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
