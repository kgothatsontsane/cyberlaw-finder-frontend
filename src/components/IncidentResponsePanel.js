"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconShield, IconPhone, IconMail, IconGlobe, IconCheck,
  IconAlertTriangle, IconClock, IconListCheck, IconChevronRight,
} from "@tabler/icons-react";

export function IncidentResponsePanel({ results, jurisdiction }) {
  const [checkedItems, setCheckedItems] = useState({});

  if (!results || results.length === 0) return null;

  const reportingInfo = results[0]?.reporting_info;
  if (!reportingInfo) return null;

  const toggleCheck = (index) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const evidenceItems = reportingInfo.evidence_preservation || [];
  const allChecked = evidenceItems.length > 0 && evidenceItems.every((_, i) => checkedItems[i]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-14"
    >
      <div className="rounded-2xl border border-cyber-amber/20 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.04) 0%, rgba(10,14,23,0.8) 100%)" }}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyber-amber/10 flex items-center justify-center">
              <IconAlertTriangle className="w-5 h-5 text-cyber-amber" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-semibold text-cyber-amber">
                Incident Response Guide
              </h3>
              <p className="text-[11px] text-gray-500 font-mono">Recommended actions based on your search results</p>
            </div>
            {allChecked && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-mono bg-cyber-teal/10 text-cyber-teal border border-cyber-teal/20"
              >
                Evidence checklist complete
              </motion.span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyber-navy/50 border border-cyber-gray/30">
                <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-3">Primary Authority</p>
                <p className="text-sm font-mono text-gray-200 mb-2">{reportingInfo.primary_authority}</p>
                <div className="space-y-1.5">
                  <p className="text-xs text-gray-400 font-mono flex items-center gap-2">
                    <IconPhone className="w-3 h-3 text-cyber-cyan/50 flex-shrink-0" />
                    {reportingInfo.contact}
                  </p>
                  {reportingInfo.email && (
                    <p className="text-xs text-gray-400 font-mono flex items-center gap-2">
                      <IconMail className="w-3 h-3 text-cyber-cyan/50 flex-shrink-0" />
                      {reportingInfo.email}
                    </p>
                  )}
                  {reportingInfo.website && (
                    <a href={reportingInfo.website} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-cyber-cyan hover:text-cyber-teal font-mono flex items-center gap-2 transition-colors">
                      <IconGlobe className="w-3 h-3 flex-shrink-0" />
                      {reportingInfo.website}
                    </a>
                  )}
                </div>
              </div>

              {reportingInfo.additional_authorities && reportingInfo.additional_authorities.length > 0 && (
                <div className="p-4 rounded-xl bg-cyber-navy/50 border border-cyber-gray/30">
                  <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-3">Additional Authorities</p>
                  <div className="space-y-3">
                    {reportingInfo.additional_authorities.map((auth, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <IconChevronRight className="w-3 h-3 text-cyber-cyan/30 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-300 font-mono">{auth.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono">{auth.role} — {auth.contact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reportingInfo.when_to_contact && (
                <div className="p-3 rounded-xl bg-cyber-cyan/5 border border-cyber-cyan/10">
                  <p className="text-[11px] text-gray-400 font-mono flex items-start gap-2">
                    <IconClock className="w-3 h-3 text-cyber-cyan/50 flex-shrink-0 mt-0.5" />
                    {reportingInfo.when_to_contact}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-cyber-navy/50 border border-cyber-gray/30">
              <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <IconListCheck className="w-3 h-3 text-cyber-teal" />
                Evidence Preservation
              </p>
              <div className="space-y-1">
                {evidenceItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => toggleCheck(index)}
                    className="flex items-start gap-2.5 text-left w-full py-1.5 group"
                  >
                    <div className={`w-4 h-4 rounded-md border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 ${
                      checkedItems[index]
                        ? "bg-cyber-teal border-cyber-teal"
                        : "border-gray-600 group-hover:border-gray-400"
                    }`}>
                      {checkedItems[index] && <IconCheck className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className={`text-xs font-mono transition-all duration-200 ${
                      checkedItems[index] ? "text-gray-500 line-through" : "text-gray-400 group-hover:text-gray-300"
                    }`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
