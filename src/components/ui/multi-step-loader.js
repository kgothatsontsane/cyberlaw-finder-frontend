"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";

const DEFAULT_STEPS = [
  { text: "Analyzing query semantics...", icon: "search" },
  { text: "Preprocessing with spaCy NLP...", icon: "extract" },
  { text: "Encoding to 384-dim vector space...", icon: "encode" },
  { text: "Computing cosine similarity...", icon: "search" },
  { text: "Ranking by semantic relevance...", icon: "score" },
  { text: "Preparing forensic guidance...", icon: "prepare" },
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
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-8">
      <motion.div className="relative">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-cyber-cyan/5 border border-cyber-cyan/20 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <IconLoader2 className="w-7 h-7 text-cyber-cyan" />
        </motion.div>
        <div
          className="absolute -inset-3 rounded-3xl opacity-20"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)" }}
        />
      </motion.div>

      <div className="w-full max-w-sm space-y-2">
        <AnimatePresence>
          {steps.map((step, index) => (
            <motion.div
              key={step.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: index <= currentStep ? 1 : 0.25,
                x: 0,
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                index < currentStep ? "bg-cyber-teal/10" : index === currentStep ? "bg-cyber-cyan/10" : "bg-transparent"
              }`}>
                {index < currentStep ? (
                  <IconCheck className="w-3.5 h-3.5 text-cyber-teal" />
                ) : index === currentStep ? (
                  <IconLoader2 className="w-3.5 h-3.5 text-cyber-cyan animate-spin" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-700" />
                )}
              </div>
              <span className={`font-mono text-xs transition-colors ${
                index <= currentStep ? "text-gray-300" : "text-gray-600"
              }`}>
                {step.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-sm bg-cyber-gray/50 rounded-full h-1 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #06b6d4, #14b8a6)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
