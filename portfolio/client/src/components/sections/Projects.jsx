import SectionHeading from "@/components/ui/SectionHeading.jsx";
import ProjectCard from "@/components/projects/ProjectCard.jsx";
import { featuredProjects, projects } from "@/data/projects.js";

// Kept as separate groups (rather than one "secondary" grid) on purpose: a
// medium card (has a preview image + description) and a compact card (name,
// tagline, links only) are very different heights. Mixing them in one grid
// row made CSS Grid's default align-items:stretch force the short compact
// cards up to the tall medium card's height, leaving a large empty gap
// before their footer. Each group now gets its own grid with items-start,
// so every card is only as tall as its own content.
const mediumProjects = projects.filter((p) => p.size === "medium");
const compactProjects = projects.filter((p) => p.size === "compact");

export default function Projects() {
  return (
    <section id="work" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Selected work"
          title={
            <>
              Things I&apos;ve <span className="text-muted">actually built.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>

        
{mediumProjects.length > 0 && (
  <div
    className={`mt-6 grid items-start gap-6 ${
      mediumProjects.length === 1
        ? ""
        : "sm:grid-cols-2"
    }`}
  >
    {mediumProjects.map((project, i) => (
      <ProjectCard
        key={project.id}
        project={project}
        delay={i * 0.08}
      />
    ))}
  </div>
)}

        {compactProjects.length > 0 && (
          <div className="mt-6 grid items-start gap-6 sm:grid-cols-2">
            {compactProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 0.08} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}