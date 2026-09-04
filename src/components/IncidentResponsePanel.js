"use client";
import { useState } from "react";
import {
  IconPhone, IconMail, IconGlobe, IconCheck,
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
    <section className="mt-14 rise-view">
      <div className="rounded-lg border border-cyber-warn/25 bg-cyber-navy overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="w-10 h-10 rounded-lg bg-cyber-warn/10 border border-cyber-warn/25 flex items-center justify-center">
              <IconAlertTriangle className="w-5 h-5 text-cyber-warn" />
            </div>
            <div>
              <h2 className="text-base font-serif font-semibold text-text-primary">
                Incident Response Guide
              </h2>
              <p className="text-xs text-text-muted">Recommended actions based on your search results</p>
            </div>
            {allChecked && (
              <span className="ml-auto law-id px-2.5 py-1 rounded bg-cyber-accent-2/10 text-cyber-accent-2 border border-cyber-accent-2/30">
                Evidence checklist complete
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 rounded-md bg-cyber-bg-deep border border-cyber-gray">
                <p className="law-id text-text-muted uppercase tracking-wider mb-3">Primary Authority</p>
                <p className="text-sm text-text-primary mb-2">{reportingInfo.primary_authority}</p>
                <div className="space-y-1.5">
                  <p className="text-xs text-text-secondary flex items-center gap-2">
                    <IconPhone className="w-3.5 h-3.5 flex-shrink-0" />
                    {reportingInfo.contact}
                  </p>
                  {reportingInfo.email && (
                    <p className="text-xs text-text-secondary flex items-center gap-2">
                      <IconMail className="w-3.5 h-3.5 flex-shrink-0" />
                      {reportingInfo.email}
                    </p>
                  )}
                  {reportingInfo.website && (
                    <a href={reportingInfo.website} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-cyber-accent hover:underline flex items-center gap-2">
                      <IconGlobe className="w-3.5 h-3.5 flex-shrink-0" />
                      {reportingInfo.website}
                    </a>
                  )}
                </div>
              </div>

              {reportingInfo.additional_authorities && reportingInfo.additional_authorities.length > 0 && (
                <div className="p-4 rounded-md bg-cyber-bg-deep border border-cyber-gray">
                  <p className="law-id text-text-muted uppercase tracking-wider mb-3">Additional Authorities</p>
                  <div className="space-y-3">
                    {reportingInfo.additional_authorities.map((auth, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <IconChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5 text-cyber-border" />
                        <div>
                          <p className="text-xs text-text-primary">{auth.name}</p>
                          <p className="text-[11px] text-text-muted">{auth.role} — {auth.contact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reportingInfo.when_to_contact && (
                <div className="p-3 rounded-md border border-cyber-accent/20 bg-cyber-accent/[0.04]">
                  <p className="text-xs text-text-secondary flex items-start gap-2">
                    <IconClock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    {reportingInfo.when_to_contact}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 rounded-md bg-cyber-bg-deep border border-cyber-gray">
              <p className="law-id text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <IconListCheck className="w-3.5 h-3.5 text-cyber-accent-2" />
                Evidence Preservation
              </p>
              <div className="space-y-1">
                {evidenceItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => toggleCheck(index)}
                    aria-pressed={!!checkedItems[index]}
                    className="flex items-start gap-2.5 text-left w-full py-1.5 group"
                  >
                    <span className={`w-4 h-4 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors duration-150 ${
                      checkedItems[index]
                        ? "bg-cyber-accent-2 border-cyber-accent-2"
                        : "border-cyber-border group-hover:border-cyber-accent/50"
                    }`}>
                      {checkedItems[index] && <IconCheck className="w-2.5 h-2.5 text-white" />}
                    </span>
                    <span className={`text-xs transition-colors duration-150 ${
                      checkedItems[index] ? "text-text-muted line-through" : "text-text-secondary group-hover:text-text-primary"
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
    </section>
  );
}