"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlRahmahLoader } from "./AlRahmahLoader";

export interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
}

export function LoadingModal({
  isOpen,
  title = "Mohon tunggu",
  message,
}: LoadingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Subtle Frosted Backdrop (No card container, soft transparent blur) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white/75 backdrop-blur-xs"
          />

          {/* Clean Floating Loader - Zero Card, Zero Borders, Fully Minimalist */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex flex-col items-center justify-center text-center select-none pointer-events-none"
          >
            {/* Logo Al-Rahmah Centered with Dynamic Spinning Ring */}
            <AlRahmahLoader size="lg" mode="inline" showLogo={true} />

            {/* Clean Floating Text */}
            <div className="mt-3.5 flex flex-col items-center">
              <p className="text-sm font-medium text-zinc-700 tracking-tight flex items-center gap-0.5">
                <span>{title}</span>
                <span className="inline-flex tracking-widest animate-pulse font-mono font-bold text-brand-primary">
                  ...
                </span>
              </p>
              {message && (
                <p className="text-xs text-zinc-400 mt-0.5 max-w-xs leading-relaxed font-normal">
                  {message}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
