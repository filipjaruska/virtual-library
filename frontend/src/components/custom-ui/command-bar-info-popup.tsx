"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const DISMISSED_KEY = "virtual-library:kbar-hint-dismissed";

export default function KBarInfoPopup() {
  // Rendered only after mount so the server HTML never disagrees about whether
  // the hint was already dismissed.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(DISMISSED_KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Storage unavailable (private mode); the hint simply returns next visit.
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-lg border bg-card p-3 text-sm text-card-foreground shadow-lg"
        >
          <span>
            Press{" "}
            <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">Ctrl</kbd>
            <span className="mx-1">+</span>
            <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">K</kbd> for the
            command bar
          </span>
          <button
            onClick={dismiss}
            className="text-muted-foreground transition-colors hover:text-card-foreground"
            aria-label="Dismiss hint"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
