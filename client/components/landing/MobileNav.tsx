"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { LoginButton } from "@/client/components/auth/LoginButton";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function MobileNav() {
  const [iconActive, setIconActive] = useState(false);
  const [overlayMounted, setOverlayMounted] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const canPortal = typeof document !== "undefined";

  const handleOpen = useCallback(() => {
    setIconActive(true);
    setOverlayMounted(true);
    requestAnimationFrame(() => setOverlayVisible(true));
  }, []);

  const handleClose = useCallback(() => {
    setIconActive(false);
    setOverlayVisible(false);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (!overlayVisible) {
      setOverlayMounted(false);
    }
  }, [overlayVisible]);

  useEffect(() => {
    document.body.style.overflow = overlayMounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayMounted]);

  // Close when clicking outside the overlay and not on the hamburger button
  useEffect(() => {
    if (!overlayMounted) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      // Ignore clicks on the hamburger button (it has its own toggle logic)
      if (buttonRef.current?.contains(target)) return;
      // Ignore clicks inside the overlay
      if (overlayRef.current?.contains(target)) return;
      handleClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [overlayMounted, handleClose]);

  return (
    <>
      <button
        ref={buttonRef}
        className="md:hidden relative w-6 h-5 cursor-pointer group"
        onClick={iconActive ? handleClose : handleOpen}
        aria-label={iconActive ? "Close menu" : "Open menu"}
      >
        <span
          className="absolute left-0 w-full h-[2px] bg-on-surface-variant group-hover:bg-on-surface transition-all duration-300 ease-in-out"
          style={{
            top: iconActive ? "50%" : "0",
            transform: iconActive ? "translateY(-50%) rotate(45deg)" : "none",
          }}
        />
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-on-surface-variant group-hover:bg-on-surface transition-all duration-300 ease-in-out"
          style={{
            opacity: iconActive ? 0 : 1,
            transform: iconActive
              ? "translateY(-50%) scaleX(0)"
              : "translateY(-50%) scaleX(1)",
          }}
        />
        <span
          className="absolute left-0 w-full h-[2px] bg-on-surface-variant group-hover:bg-on-surface transition-all duration-300 ease-in-out"
          style={{
            bottom: iconActive ? "auto" : "0",
            top: iconActive ? "50%" : "auto",
            transform: iconActive ? "translateY(-50%) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {overlayMounted &&
        canPortal &&
        createPortal(
          <div
            ref={overlayRef}
            onTransitionEnd={handleTransitionEnd}
            className="fixed inset-0 top-16 z-[9998] md:hidden flex flex-col"
            style={{
              backgroundColor: "var(--background)",
              opacity: overlayVisible ? 1 : 0,
              transition: "opacity 300ms ease",
            }}
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex-1 flex flex-col justify-center px-6 gap-2">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleClose}
                  className="text-3xl font-black font-headline uppercase tracking-tight text-on-surface hover:text-primary py-4"
                  style={{
                    opacity: overlayVisible ? 1 : 0,
                    transform: overlayVisible
                      ? "translateY(0)"
                      : "translateY(20px)",
                    transition: overlayVisible
                      ? `opacity 350ms ease ${80 + i * 50}ms, transform 350ms ease ${80 + i * 50}ms`
                      : "opacity 200ms ease, transform 200ms ease",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div
              className="px-6 py-10 border-t border-divider flex-shrink-0"
              style={{
                opacity: overlayVisible ? 1 : 0,
                transform: overlayVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: overlayVisible
                  ? "opacity 400ms ease 200ms, transform 400ms ease 200ms"
                  : "opacity 200ms ease, transform 200ms ease",
              }}
            >
              <LoginButton label="Connect with Spotify" />
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50 mt-4">
                Free during closed beta
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
