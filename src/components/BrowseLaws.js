"use client";
import { useState, useEffect, useCallback } from "react";
import {
  IconArrowLeft, IconSearch, IconFilter, IconBooks,
  IconGavel, IconClock, IconChevronRight, IconX, IconWorld,
} from "@tabler/icons-react";
import { listLaws } from "@/lib/api";

const JUR_DISPLAY = {
  south_africa: { name: "South Africa", flag: "🇿🇦" },
  usa: { name: "United States", flag: "🇺🇸" },
  germany: { name: "Germany / EU", flag: "🇪🇺" },
};

function LawCard({ law }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-lg border border-cyber-gray bg-cyber-navy p-5 rise-view">
      <div className="flex items-start gap-2.5 mb-3">
        <span className="text-lg flex-shrink-0">{JUR_DISPLAY[law.jurisdiction]?.flag}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="law-id text-text-muted bg-cyber-bg-deep px-1.5 py-0.5 rounded">
              {law.id}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-cyber-accent border border-cyber-accent/25 px-1.5 py-0.5 rounded">
              {law.category.replace(/_/g, " ")}
            </span>
          </div>
          <h2 className="text-sm font-serif font-semibold text-text-primary leading-snug">
            {law.title}
          </h2>
          <p className="law-id text-cyber-accent mt-0.5">
            {law.law_name} — {law.section}
          </p>
        </div>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed mb-3">{law.summary}</p>

      <div className="flex items-center gap-3 text-[10px] text-text-muted mb-2 flex-wrap">
        <span className="flex items-center gap-1">
          <IconGavel className="w-2.5 h-2.5" />
          {law.penalty}
        </span>
        <span className="flex items-center gap-1">
          <IconClock className="w-2.5 h-2.5" />
          {law.year_enacted || "—"}
        </span>
        <span className="flex items-center gap-1">
          <IconWorld className="w-2.5 h-2.5" />
          {JUR_DISPLAY[law.jurisdiction]?.name}
        </span>
      </div>

      {expanded && (
        <div className="border-t border-cyber-gray mt-3 pt-3 rise">
          <p className="text-xs text-text-secondary font-serif leading-relaxed">
            {law.full_text}
          </p>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="text-[11px] text-text-muted hover:text-text-primary transition-colors duration-150 mt-2 flex items-center gap-1"
      >
        {expanded ? "Show less" : "Read full text"}
        <IconChevronRight className={`w-3 h-3 transition-transform duration-150 ${expanded ? "rotate-90" : ""}`} />
      </button>
    </article>
  );
}

export function BrowseLaws({ onBack }) {
  const [laws, setLaws] = useState([]);
  const [jurisdiction, setJurisdiction] = useState("");
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const loadLaws = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listLaws({
        jurisdiction: jurisdiction || undefined,
        category: category || undefined,
        search: searchText || undefined,
      });
      setLaws(data.laws);
      setTotal(data.total);
      setCategories(data.categories || []);
      setJurisdictions(data.jurisdictions || []);
    } catch (e) {
      console.error("Browse error:", e);
    } finally {
      setLoading(false);
    }
  }, [jurisdiction, category, searchText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadLaws();
    }, 350);
    return () => clearTimeout(timer);
  }, [loadLaws]);

  const clearFilters = () => {
    setJurisdiction("");
    setCategory("");
    setSearchText("");
  };

  const hasFilters = jurisdiction || category || searchText;

  return (
    <div className="min-h-screen px-4 pt-24 pb-12 max-w-5xl mx-auto">
      <div className="mb-8 rise">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-muted hover:text-cyber-accent transition-colors duration-150 text-xs mb-6 group"
        >
          <IconArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" />
          <span>Back to home</span>
        </button>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="w-10 h-10 rounded-lg bg-cyber-accent/10 border border-cyber-accent/25 flex items-center justify-center">
            <IconBooks className="w-5 h-5 text-cyber-accent" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-semibold text-text-primary">Law Library</h1>
            <p className="text-xs text-text-muted">
              Browse {total} statutes across {jurisdictions.length} jurisdictions
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-cyber-gray bg-cyber-navy space-y-3">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <IconFilter className="w-3.5 h-3.5 text-cyber-accent" />
            <span>Filters</span>
            {hasFilters && (
              <button onClick={clearFilters} className="ml-auto text-cyber-accent hover:underline flex items-center gap-1">
                <IconX className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="bg-cyber-bg-deep border border-cyber-gray rounded-md px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cyber-accent/60 cursor-pointer"
            >
              <option value="">All Jurisdictions</option>
              {jurisdictions.map((j) => (
                <option key={j} value={j}>{JUR_DISPLAY[j]?.name || j}</option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-cyber-bg-deep border border-cyber-gray rounded-md px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-cyber-accent/60 cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
              ))}
            </select>

            <div className="relative">
              <IconSearch className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by name, title, keyword..."
                className="w-full bg-cyber-bg-deep border border-cyber-gray rounded-md pl-8 pr-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyber-accent/60"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="w-6 h-6 border-2 border-cyber-border border-t-cyber-accent rounded-full animate-spin" />
          <span className="text-xs text-text-muted">Loading laws...</span>
        </div>
      ) : laws.length === 0 ? (
        <div className="text-center py-20 rise">
          <p className="text-text-muted text-sm">No laws match your filters.</p>
          <button onClick={clearFilters} className="mt-2 text-xs text-cyber-accent hover:underline">
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-text-muted mb-4">
            Showing {laws.length} of {total} statutes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {laws.map((law) => (
              <LawCard key={law.id} law={law} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}