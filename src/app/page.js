"use client";

import { useState, useEffect } from "react";
import { FloatingNavbar } from "@/components/ui/floating-navbar";
import { LandingPage } from "@/components/LandingPage";
import { JurisdictionSelector } from "@/components/JurisdictionSelector";
import { SearchInput } from "@/components/SearchInput";
import { ResultsPanel } from "@/components/ResultsPanel";
import { LoadingState } from "@/components/LoadingState";
import { HowToGuide } from "@/components/HowToGuide";
import { BrowseLaws } from "@/components/BrowseLaws";

const JURISDICTIONS = [
  { id: "south_africa", name: "South Africa", flag: "🇿🇦", laws: 35, primary: true },
  { id: "usa", name: "United States", flag: "🇺🇸", laws: 22 },
  { id: "germany", name: "Germany / EU", flag: "🇪🇺", laws: 18 },
];

const GUIDE_KEY = "cyberlaw-finder-guide-seen";

export default function Home() {
  const [step, setStep] = useState(0);
  const [jurisdiction, setJurisdiction] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Check if user has already seen the guide
  useEffect(() => {
    const seen = localStorage.getItem(GUIDE_KEY);
    setShowGuide(seen !== "true");
  }, []);

  const handleDismissGuide = () => {
    localStorage.setItem(GUIDE_KEY, "true");
    setShowGuide(false);
  };

  const handleReopenGuide = () => {
    setShowGuide(true);
  };

  const handleEnterApp = () => {
    setStep(1);
  };

  const handleJurisdictionSelect = (jur) => {
    setJurisdiction(jur);
    setStep(2);
  };

  const handleBrowseLaws = () => {
    setStep("browse");
  };

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setLoading(true);
    setStep(3);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
          jurisdiction: jurisdiction?.id,
          top_k: 10,
        }),
      });

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setJurisdiction(null);
    setQuery("");
    setResults([]);
  };

  return (
    <main className="min-h-screen bg-cyber-dark relative">
      {step !== 0 && (
        <FloatingNavbar onReset={handleReset} onHelp={handleReopenGuide} />
      )}

      {showGuide && (
        <HowToGuide onClose={handleDismissGuide} onDismiss={handleDismissGuide} />
      )}

      <div className="relative z-10">
        {step === 0 && <LandingPage onEnter={handleEnterApp} />}

        {step === 1 && (
          <JurisdictionSelector
            jurisdictions={JURISDICTIONS}
            onSelect={handleJurisdictionSelect}
            onBrowse={handleBrowseLaws}
          />
        )}

        {step === "browse" && <BrowseLaws onBack={handleReset} />}

        {step === 2 && jurisdiction && (
          <SearchInput
            jurisdiction={jurisdiction}
            onSearch={handleSearch}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && loading && <LoadingState />}

        {step === 3 && !loading && (
          <ResultsPanel
            results={results}
            query={query}
            jurisdiction={jurisdiction}
            onNewSearch={handleReset}
          />
        )}
      </div>
    </main>
  );
}
