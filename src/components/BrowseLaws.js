"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowLeft, IconSearch, IconFilter, IconBooks, IconTag,
  IconGavel, IconClock, IconChevronRight, IconX, IconWorld,
} from "@tabler/icons-react";
import { listLaws } from "@/lib/api";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { EncryptedText } from "@/components/ui/encrypted-text";

const JUR_DISPLAY = {
  south_africa: { name: "South Africa", flag: "🇿🇦" },
  usa: { name: "United States", flag: "🇺🇸" },
  germany: { name: "Germany / EU", flag: "🇪🇺" },
};

function LawCard({ law, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <SpotlightCard className="p-5">
        <div className="flex items-start gap-2.5 mb-3">
          <span className="text-lg flex-shrink-0">{JUR_DISPLAY[law.jurisdiction]?.flag}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-mono text-gray-500 bg-cyber-darker px-1.5 py-0.5 rounded">
                {law.id}
              </span>
              <span className="text-[10px] font-mono text-cyber-cyan/70 border border-cyber-cyan/20 px-1.5 py-0.5 rounded">
                {law.category.replace(/_/g, " ")}
              </span>
            </div>
            <h3 className="text-sm font-semibold font-mono text-gray-200 leading-snug">
              {law.title}
            </h3>
            <p className="text-[11px] text-cyber-cyan/70 font-mono mt-0.5">
              {law.law_name} — {law.section}
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed mb-3">{law.summary}</p>

        <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <IconGavel className="w-2.5 h-2.5 text-cyber-cyan/40" />
            {law.penalty}
          </span>
          <span className="flex items-center gap-1">
            <IconClock className="w-2.5 h-2.5 text-cyber-cyan/40" />
            {law.year_enacted || "—"}
          </span>
          <span className="flex items-center gap-1">
            <IconWorld className="w-2.5 h-2.5 text-cyber-cyan/40" />
            {JUR_DISPLAY[law.jurisdiction]?.name}
          </span>
        </div>

        {law.keywords && (
          <div className="flex flex-wrap gap-1 mb-3">
            {law.keywords.slice(0, 3).map((kw, i) => (
              <span key={i} className="text-[9px] font-mono text-gray-600 bg-cyber-darker/50 px-1.5 py-0.5 rounded">
                {kw}
              </span>
            ))}
            {law.keywords.length > 3 && (
              <span className="text-[9px] font-mono text-gray-600">+{law.keywords.length - 3}</span>
            )}
          </div>
        )}

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-cyber-gray/50 mt-3 pt-3"
            >
              <p className="text-xs text-gray-400 font-mono leading-relaxed">
                <EncryptedText text={law.full_text} revealOnHover={false} />
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] font-mono text-gray-500 hover:text-gray-300 transition-colors mt-1 flex items-center gap-1"
        >
          {expanded ? "Show less" : "Read full text"}
          <IconChevronRight className={`w-2.5 h-2.5 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>
      </SpotlightCard>
    </motion.div>
  );
}

const CACHE_KEY = "clf-law-library-v1";
const CACHE_TTL = 10 * 60 * 1000;

function readCache() {
  if (typeof window === "undefined") return null;
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    return c && Date.now() - c.t < CACHE_TTL ? c : null;
  } catch {
    return null;
  }
}

export function BrowseLaws({ onBack }) {
  const cached = useRef(readCache());
  const [laws, setLaws] = useState(cached.current?.laws || []);
  const [jurisdiction, setJurisdiction] = useState("");
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState(cached.current?.categories || []);
  const [jurisdictions, setJurisdictions] = useState(cached.current?.jurisdictions || []);
  const [loading, setLoading] = useState(!cached.current);
  const [total, setTotal] = useState(cached.current?.total || 0);
  const isFirstRun = useRef(true);

  const loadLaws = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
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
      // Only cache the unfiltered library
      if (!jurisdiction && !category && !searchText) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), ...data }));
        } catch {}
      }
    } catch (e) {
      console.error("Browse error:", e);
    } finally {
      setLoading(false);
    }
  }, [jurisdiction, category, searchText]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      // Fresh cache renders instantly; refresh silently in the background.
      loadLaws(!!cached.current);
      return;
    }
    const timer = setTimeout(() => {
      loadLaws();
    }, 300);
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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-cyber-cyan transition-colors font-mono text-xs mb-6 group"
        >
          <IconArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          <span>Back to home</span>
        </button>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center">
            <IconBooks className="w-5 h-5 text-cyber-cyan" />
          </div>
          <div>
            <h2 className="text-xl font-semibold font-mono text-gray-100">Law Library</h2>
            <p className="text-xs text-gray-500 font-mono">
              Browse {total} statutes across {jurisdictions.length} jurisdictions
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-2xl border border-cyber-gray/40 bg-cyber-navy/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
            <IconFilter className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>Filters</span>
            {hasFilters && (
              <button onClick={clearFilters} className="ml-auto text-cyber-cyan hover:text-cyber-teal flex items-center gap-1 transition-colors">
                <IconX className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="bg-cyber-darker border border-cyber-gray rounded-xl px-3 py-2 text-xs font-mono text-gray-300 focus:outline-none focus:border-cyber-cyan/50 appearance-none cursor-pointer"
            >
              <option value="">All Jurisdictions</option>
              {jurisdictions.map((j) => (
                <option key={j} value={j}>{JUR_DISPLAY[j]?.name || j}</option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-cyber-darker border border-cyber-gray rounded-xl px-3 py-2 text-xs font-mono text-gray-300 focus:outline-none focus:border-cyber-cyan/50 appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
              ))}
            </select>

            <div className="relative">
              <IconSearch className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by name, title, keyword..."
                className="w-full bg-cyber-darker border border-cyber-gray rounded-xl pl-8 pr-3 py-2 text-xs font-mono text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      {loading ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-cyber-cyan/30 border-t-cyber-cyan rounded-full"
          />
          <span className="text-xs font-mono text-gray-500">Loading laws...</span>
        </div>
      ) : laws.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 font-mono text-sm">No laws match your filters.</p>
          <button onClick={clearFilters} className="mt-2 text-xs font-mono text-cyber-cyan hover:text-cyber-teal transition-colors">
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs font-mono text-gray-500 mb-4">
            Showing {laws.length} of {total} statutes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {laws.map((law, index) => (
              <LawCard key={law.id} law={law} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
