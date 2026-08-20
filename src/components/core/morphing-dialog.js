"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function MorphingDialog({
  trigger,
  title,
  children,
  open,
  onOpenChange,
  className,
}) {
  const [isOpen, setIsOpen] = useState(open || false);

  useEffect(() => {
    if (open !== undefined) setIsOpen(open);
  }, [open]);

  const handleToggle = useCallback(() => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onOpenChange) onOpenChange(newState);
  }, [isOpen, onOpenChange]);

  return (
    <>
      <div onClick={handleToggle}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={handleToggle}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={cn(
                "bg-cyber-navy border border-cyber-gray rounded-2xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto",
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleToggle}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
              >
                <IconX className="w-5 h-5" />
              </button>

              {title && (
                <h2 className="text-xl font-mono font-semibold text-gray-200 mb-4">
                  {title}
                </h2>
              )}

              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
