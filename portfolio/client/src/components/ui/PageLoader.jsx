export default function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-live="polite">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}