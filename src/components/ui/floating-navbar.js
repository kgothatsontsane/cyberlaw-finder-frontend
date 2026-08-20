"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconShieldLock, IconHome, IconSun, IconMoon, IconHelp } from "@tabler/icons-react";
import { useTheme } from "@/context/ThemeContext";

export function FloatingNavbar({ onReset, onHelp }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { resolved, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="transition-all duration-300"
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
          borderBottom: scrolled ? "1px solid var(--cyber-border)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between"
          style={{
            background: scrolled ? undefined : "transparent",
          }}>
          <button onClick={onReset} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-cyber-accent/10 border border-cyber-accent/20 flex items-center justify-center group-hover:bg-cyber-accent/20 transition-all">
              <IconShieldLock className="w-4 h-4 text-cyber-accent" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-sm text-primary leading-tight">
                Cyber<span className="text-cyber-accent">Law</span> Finder
              </span>
              <span className="font-mono text-[9px] text-muted uppercase tracking-wider">AI Forensics</span>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent-2 animate-pulse" />
              NLP Engine Active
            </span>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg border border-cyber-border bg-cyber-darker flex items-center justify-center hover:bg-cyber-surface transition-colors"
              title={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {resolved === "dark" ? (
                <IconSun className="w-4 h-4 text-cyber-warn" />
              ) : (
                <IconMoon className="w-4 h-4 text-cyber-accent" />
              )}
            </motion.button>

            {onHelp && (
              <motion.button
                onClick={onHelp}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg border border-cyber-border bg-cyber-darker flex items-center justify-center hover:bg-cyber-surface transition-colors"
                title="How to use"
              >
                <IconHelp className="w-4 h-4 text-cyber-accent" />
              </motion.button>
            )}

            <motion.button
              onClick={onReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-secondary hover:text-primary rounded-lg hover:bg-cyber-surface border border-transparent hover:border-cyber-border/50 transition-all"
            >
              <IconHome className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Search</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
