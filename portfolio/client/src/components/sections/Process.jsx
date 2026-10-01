import Reveal from "@/components/ui/Reveal.jsx";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import { processSteps } from "@/data/process.js";

export default function Process() {
  return (
    <section id="process" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading index="02" label="Process" title="How I build" />

        <div className="mt-16 grid gap-px overflow-hidden rounded-(--radius-card) border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.08} className="h-full">
              <div className="group relative h-full bg-bg p-7 transition-colors duration-300 hover:bg-surface sm:p-8">
                <span className="font-mono text-sm text-subtle transition-colors duration-300 group-hover:text-accent">
                  {step.index}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
                <div
                  className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}