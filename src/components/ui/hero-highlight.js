"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    let running = true;

    const handleVisibility = () => {
      if (document.hidden && animationId) {
        cancelAnimationFrame(animationId);
        animationId = undefined;
        running = false;
      } else if (!document.hidden && !running) {
        running = true;
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3 - 0.1,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };
    createParticles();

    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

export function HeroHighlight({ children, className }) {
  return (
    <div className={cn("relative min-h-screen flex items-center justify-center overflow-hidden", className)}>
      <ParticleField />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cyber-cyan/[0.03] via-cyber-purple/[0.02] to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] opacity-[0.06]"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[100px] opacity-[0.04]"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center w-full">
        {children}
      </div>
    </div>
  );
}

export function Highlight({ children, className }) {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      className={cn(
        "relative inline-block px-3 py-1 rounded-lg",
        "bg-gradient-to-r from-cyber-cyan/20 via-cyber-cyan/10 to-cyber-teal/20",
        "text-cyber-cyan font-bold text-glow-cyan",
        className
      )}
    >
      <motion.span
        className="absolute inset-0 rounded-lg bg-cyber-cyan/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="relative z-10">{children}</span>
    </motion.span>
  );
}
