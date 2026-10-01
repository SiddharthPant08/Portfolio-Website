import { ArrowDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal.jsx";

export default function CaseStudySection({ caseStudy }) {
  if (!caseStudy) return null;
  const { problem, solution, architecture } = caseStudy;

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="space-y-10">
        {problem && (
          <Reveal>
            <p className="eyebrow">The Problem</p>
            <p className="mt-4 text-lg leading-relaxed text-fg/90">{problem}</p>
          </Reveal>
        )}
        {solution && (
          <Reveal delay={0.08}>
            <p className="eyebrow">The Solution</p>
            <p className="mt-4 text-lg leading-relaxed text-fg/90">{solution}</p>
          </Reveal>
        )}
      </div>

      {architecture?.length > 0 && (
        <Reveal delay={0.12}>
          <p className="eyebrow">Architecture</p>
          <div className="mt-4 flex flex-col items-stretch">
            {architecture.map((node, i) => (
              <div key={node.label} className="flex flex-col items-center">
                <div className="glass w-full rounded-2xl px-5 py-4 text-center">
                  <p className="font-mono text-sm font-medium text-fg">{node.label}</p>
                  {node.detail && <p className="mt-1 text-xs text-muted">{node.detail}</p>}
                </div>
                {i < architecture.length - 1 && (
                  <ArrowDown className="my-2 h-4 w-4 shrink-0 text-subtle" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}