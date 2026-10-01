export default function TechBadge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line-strong bg-white/[0.04] px-3 py-1 text-xs text-muted transition-colors duration-300 group-hover:text-fg ${className}`}
    >
      {children}
    </span>
  );
}