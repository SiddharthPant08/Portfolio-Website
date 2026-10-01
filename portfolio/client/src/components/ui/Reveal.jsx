import { motion, useReducedMotion } from "framer-motion";

// Fade + rise when scrolled into view. Runs once.
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  amount = 0.2,
  className = "",
}) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}