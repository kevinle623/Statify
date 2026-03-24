"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, BellOff } from "lucide-react";

export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        className="cursor-pointer"
      >
        <Bell className="size-5 text-on-surface-variant hover:text-primary transition-colors" />
      </button>
      {open && (
        <div className="fixed right-4 top-[calc(4rem+0.75rem)] w-[calc(100vw-2rem)] sm:w-80 sm:absolute sm:right-0 sm:top-full sm:mt-3 bg-surface-container ghost-border shadow-xl z-50">
          <div className="flex items-center justify-between px-5 py-4 border-b border-divider">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface font-bold">
              Notifications
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              0 New
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <BellOff className="size-8 text-on-surface-variant/30 mb-4" />
            <p className="text-sm text-on-surface-variant text-center">
              No notifications right now
            </p>
            <p className="text-xs text-on-surface-variant/50 text-center mt-1">
              We&apos;ll let you know when something comes up.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
