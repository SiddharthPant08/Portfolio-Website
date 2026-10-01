import { Briefcase } from "lucide-react";
import Reveal from "@/components/ui/Reveal.jsx";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import { experience } from "@/data/experience.js";

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          index="05"
          label="Experience"
          title={
            <>
              Where I&apos;ve <span className="text-muted">worked.</span>
            </>
          }
        />

        <div className="relative mt-16 max-w-2xl">
          <div className="absolute left-5 top-2 h-full w-px bg-line-strong sm:left-6" aria-hidden="true" />

          <ol className="space-y-10">
            {experience.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08} as="li" className="relative pl-14 sm:pl-16">
                <span className="glass absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full text-accent sm:h-12 sm:w-12">
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>

                <div className="glass rounded-(--radius-card) p-6 sm:p-7">
                  <p className="eyebrow">
                    {item.period} · {item.duration}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{item.role}</h3>
                  <p className="mt-1 text-sm text-muted">{item.company}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}