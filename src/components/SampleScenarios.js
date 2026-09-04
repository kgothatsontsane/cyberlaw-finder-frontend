"use client";
import { IconBulb } from "@tabler/icons-react";

const SCENARIOS = [
  { text: "Someone guessed my password and logged into my bank account", category: "access_crimes" },
  { text: "I received a phishing email asking me to click a link and enter my details", category: "fraud_crimes" },
  { text: "My computer was infected with ransomware demanding payment", category: "malware_crimes" },
  { text: "Someone is posting threatening messages about me on social media", category: "harassment_crimes" },
  { text: "A former employee stole our customer database", category: "data_protection" },
  { text: "Someone is using my identity to open credit accounts online", category: "financial_crimes" },
];

export function SampleScenarios({ onSelect }) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 rise">
      <div className="flex items-center gap-2 mb-4">
        <IconBulb className="w-4 h-4 text-cyber-warn" />
        <span className="text-xs text-text-muted uppercase tracking-wider">Sample Scenarios</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {SCENARIOS.map((scenario, index) => (
          <button
            key={index}
            onClick={() => onSelect(scenario.text)}
            className="text-left px-4 py-3 rounded-lg bg-cyber-navy border border-cyber-gray hover:border-cyber-accent/50 transition-colors duration-150"
          >
            <span className="block text-sm text-text-secondary leading-relaxed">
              {scenario.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}