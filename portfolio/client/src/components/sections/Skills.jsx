import Reveal from "@/components/ui/Reveal.jsx";
import Tilt from "@/components/ui/Tilt.jsx";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import TechBadge from "@/components/ui/TechBadge.jsx";
import { skillGroups } from "@/data/skills.js";

export default function Skills() {
  return (
    <section id="skills" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          index="04"
          label="Skills"
          title={
            <>
              Tools I reach for, <span className="text-muted">and why.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.id} delay={i * 0.06} className="h-full">
                <Tilt max={4} className="h-full">
                  <div className="glass group flex h-full flex-col rounded-(--radius-card) p-6 transition-colors duration-300 hover:border-line-strong sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="glass grid h-10 w-10 shrink-0 place-items-center rounded-xl text-accent">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight">{group.label}</h3>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted">{group.context}</p>

                    <div className="mt-5 flex flex-wrap gap-2 pt-1">
                      {group.skills.map((skill) => (
                        <TechBadge key={skill}>{skill}</TechBadge>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}