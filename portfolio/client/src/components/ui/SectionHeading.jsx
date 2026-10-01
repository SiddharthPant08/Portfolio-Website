import Reveal from "./Reveal.jsx";

export default function SectionHeading({ index, label, title, className = "" }) {
  return (
    <div className={className}>
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-accent">{index}</span>
          <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>
      {title && (
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h2>
        </Reveal>
      )}
    </div>
  );
}