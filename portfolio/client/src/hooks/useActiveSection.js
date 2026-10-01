import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Finds which section currently crosses 40% of the viewport height.
// Uses scroll + rAF (not per-element observers) so it also works when
// sections mount late because of route-level code splitting.
export default function useActiveSection(ids) {
  const { pathname } = useLocation();
  const [active, setActive] = useState(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          setActive(id);
          return;
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids, pathname]);

  return active;
}