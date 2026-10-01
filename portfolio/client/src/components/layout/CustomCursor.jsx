import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import useFinePointer from "@/hooks/useFinePointer.js";

const SELECTOR =
  "[data-cursor], a[href], button, [role='button'], input, textarea, select, label, summary";
const TEXT_SELECTOR =
  "input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]), textarea";

const ringVariants = {
  default: {
    width: 36, height: 36, borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0.35)",
  },
  link: {
    width: 64, height: 64, borderRadius: 999,
    backgroundColor: "rgba(124,108,255,0.14)", borderColor: "rgba(124,108,255,0.6)",
  },
  project: {
    width: 96, height: 96, borderRadius: 999,
    backgroundColor: "rgba(124,108,255,0.92)", borderColor: "rgba(124,108,255,1)",
  },
  text: {
    width: 2, height: 28, borderRadius: 2,
    backgroundColor: "rgba(124,108,255,1)", borderColor: "rgba(124,108,255,0)",
  },
};

export default function CustomCursor() {
  const enabled = useFinePointer();
  const reduce = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 });

  const [variant, setVariant] = useState("default");
  const [label, setLabel] = useState("View");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target.closest(SELECTOR) : null;
      if (!el) return setVariant("default");

      const custom = el.getAttribute("data-cursor");
      if (custom && ringVariants[custom]) {
        setLabel(el.getAttribute("data-cursor-label") || "View");
        return setVariant(custom);
      }
      setVariant(el.matches(TEXT_SELECTOR) ? "text" : "link");
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringX = reduce ? x : springX;
  const ringY = reduce ? y : springY;

  return (
    <div aria-hidden="true">
      {/* trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-0 w-0 items-center justify-center"
      >
        <motion.div
          variants={ringVariants}
          initial="default"
          animate={variant}
          style={{ borderWidth: 1, borderStyle: "solid" }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="flex shrink-0 items-center justify-center"
        >
          <motion.span
            animate={{
              opacity: variant === "project" ? 1 : 0,
              scale: pressed ? 0.9 : 1,
            }}
            className="text-xs font-medium tracking-wide text-white"
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* exact-follow dot */}
      <motion.div
        style={{ x, y }}
        animate={{ opacity: visible && variant !== "project" && variant !== "text" ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[101] flex h-0 w-0 items-center justify-center"
      >
        <motion.div
          animate={{ scale: pressed ? 0.6 : variant === "link" ? 0.5 : 1 }}
          className="h-1.5 w-1.5 rounded-full bg-white"
        />
      </motion.div>
    </div>
  );
}