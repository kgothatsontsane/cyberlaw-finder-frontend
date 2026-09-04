"use client";
import { motion } from "framer-motion";
import { IconBulb, IconArrowRight } from "@tabler/icons-react";

const SCENARIOS = [
  { text: "Someone guessed my password and logged into my bank account", category: "access_crimes" },
  { text: "I received a phishing email asking me to click a link and enter my details", category: "fraud_crimes" },
  { text: "My computer was infected with ransomware demanding payment", category: "malware_crimes" },
  { text: "Someone is posting threatening messages about me on social media", category: "harassment_crimes" },
  { text: "A former employee stole our customer database", category: "data_protection" },
  { text: "Someone is using my identity to open credit accounts online", category: "financial_crimes" },
];

const categoryColors = {
  access_crimes: "border-cyber-cyan/20 text-cyber-cyan/70",
  fraud_crimes: "border-cyber-red/20 text-cyber-red/70",
  malware_crimes: "border-cyber-purple/20 text-cyber-purple/70",
  harassment_crimes: "border-cyber-amber/20 text-cyber-amber/70",
  data_protection: "border-cyber-teal/20 text-cyber-teal/70",
  financial_crimes: "border-cyber-amber/20 text-cyber-amber/70",
};

export function SampleScenarios({ onSelect }) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <motion.div
        className="flex items-center gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <IconBulb className="w-4 h-4 text-cyber-amber" />
        <span className="text-xs font-mono text-cyber-amber/80 uppercase tracking-wider">Sample Scenarios</span>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      >
        {SCENARIOS.map((scenario, index) => (
          <motion.button
            key={index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            onClick={() => onSelect(scenario.text)}
            className="group text-left px-4 py-3 rounded-xl bg-cyber-navy/40 border border-cyber-gray hover:border-cyber-cyan/40 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-2">
              <span className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase border ${categoryColors[scenario.category] || "border-cyber-gray text-gray-500"}`}>
                {scenario.category.replace("_", " ")}
              </span>
              <p className="text-sm text-gray-400 group-hover:text-gray-200 font-mono leading-relaxed transition-colors truncate">
                {scenario.text}
              </p>
              <IconArrowRight className="w-3 h-3 text-cyber-cyan/0 group-hover:text-cyber-cyan flex-shrink-0 mt-0.5 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
