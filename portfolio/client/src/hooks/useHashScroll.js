import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

// Makes links like <Link to="/#about"> scroll to the right section,
// both on arrival from another route and when already on the home page.
export default function useHashScroll() {
  const { hash, key, pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const behavior = reduce ? "auto" : "smooth";

    const timer = setTimeout(() => {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [hash, key, pathname, reduce]);
}