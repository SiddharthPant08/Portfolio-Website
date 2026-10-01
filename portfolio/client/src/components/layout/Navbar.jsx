import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import MagneticButton from "@/components/ui/MagneticButton.jsx";
import SocialLinks from "@/components/ui/SocialLinks.jsx";
import useActiveSection from "@/hooks/useActiveSection.js";
import portfolioConfig from "@/data/portfolioConfig.js";
import { navItems, sectionIds } from "@/data/navigation.js";

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const { pathname } = useLocation();
  const activeSection = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Which item is highlighted
  const current =
    pathname === "/"
      ? activeSection ?? "home"
      : pathname.startsWith("/projects")
        ? "work"
        : null;

  // Shrink + glass on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, Escape to close, focus first link
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  const compact = scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-500 ease-premium sm:px-5 ${
        compact ? "pt-3" : "pt-0"
      }`}
    >
      {/* Mobile menu overlay (sits below the nav bar in the same stacking context) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-0 flex flex-col bg-bg/95 px-6 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <nav aria-label="Mobile" className="relative flex flex-1 flex-col justify-center">
              <ul>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.6, ease: EASE }}
                  >
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      to={`/#${item.id}`}
                      onClick={close}
                      className="group flex items-baseline gap-4 border-b border-line py-4"
                    >
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      <span
                        className={`text-4xl font-semibold tracking-tight transition-colors sm:text-5xl ${
                          current === item.id ? "text-fg" : "text-muted group-hover:text-fg"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
              className="relative flex flex-col gap-5"
            >
              <Button to="/#contact" size="lg" onClick={close} className="w-full">
                Let&apos;s Talk
              </Button>
              <SocialLinks className="justify-center" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        aria-label="Primary"
        className={`relative z-10 mx-auto flex w-full items-center justify-between transition-all duration-500 ease-premium ${
          compact
            ? "glass max-w-5xl rounded-full px-4 py-2 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.7)] sm:px-5"
            : "max-w-7xl border border-transparent px-2 py-5 sm:px-7"
        }`}
      >
        {/* Logo */}
        <Link
          to="/#home"
          onClick={close}
          className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-[0.22em]"
          aria-label={`${portfolioConfig.name} — home`}
        >
          <span
            className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-accent-3 to-accent-2 shadow-[0_0_14px_rgb(124_108_255/0.9)]"
            aria-hidden="true"
          />
          {portfolioConfig.shortName}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = current === item.id;
            return (
              <li key={item.id}>
                <Link
                  to={`/#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative isolate rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <MagneticButton>
              <Button to="/#contact" size="sm">
                Let&apos;s Talk
              </Button>
            </MagneticButton>
          </div>

          {/* Hamburger */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="glass grid h-10 w-10 place-items-center rounded-full text-fg lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    </header>
  );
}