"use client";
import { IconShieldLock, IconHome, IconSun, IconMoon, IconHelp } from "@tabler/icons-react";
import { useTheme } from "@/context/ThemeContext";
import { LogoMark } from "@/components/brand/Logo";

export function FloatingNavbar({ onReset, onHelp }) {
  const { resolved, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-bg/95 border-b border-cyber-gray">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <button onClick={onReset} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md bg-cyber-accent/10 border border-cyber-accent/25 flex items-center justify-center group-hover:bg-cyber-accent/20 transition-colors duration-150">
            <LogoMark className="w-5 h-5 text-cyber-accent" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif font-bold text-sm text-text-primary leading-tight">
              Cyber<span className="text-cyber-accent">Law</span> Finder
            </span>
            <span className="text-[9px] text-text-muted uppercase tracking-wider">AI Forensics</span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-text-muted mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent-2" />
            NLP Engine Active
          </span>

          <button
            onClick={toggleTheme}
            aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 rounded-md border border-cyber-gray bg-cyber-navy flex items-center justify-center hover:border-cyber-accent/50 transition-colors duration-150"
          >
            {resolved === "dark" ? (
              <IconSun className="w-4 h-4 text-cyber-warn" />
            ) : (
              <IconMoon className="w-4 h-4 text-cyber-accent" />
            )}
          </button>

          {onHelp && (
            <button
              onClick={onHelp}
              aria-label="How to use"
              className="w-8 h-8 rounded-md border border-cyber-gray bg-cyber-navy flex items-center justify-center hover:border-cyber-accent/50 transition-colors duration-150"
            >
              <IconHelp className="w-4 h-4 text-cyber-accent" />
            </button>
          )}

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary rounded-md hover:bg-cyber-bg-deep border border-transparent hover:border-cyber-gray/60 transition-colors duration-150"
          >
            <IconHome className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Search</span>
          </button>
        </div>
      </div>
    </nav>
  );
}