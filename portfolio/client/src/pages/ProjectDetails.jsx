import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Users } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Button from "@/components/ui/Button.jsx";
import TechBadge from "@/components/ui/TechBadge.jsx";
import Reveal from "@/components/ui/Reveal.jsx";
import ProjectPreview from "@/components/projects/ProjectPreview.jsx";
import CaseStudySection from "@/components/projects/CaseStudySection.jsx";
import ProjectCard from "@/components/projects/ProjectCard.jsx";
import { getProjectBySlug, projects } from "@/data/projects.js";

function NotFoundProject() {
  return (
    <section className="container-page grid min-h-screen place-items-center pt-24 text-center">
      <div>
        <p className="eyebrow">Project</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Not found</h1>
        <p className="mt-3 text-muted">That project doesn&apos;t exist (yet).</p>
        <Link to="/#work" className="mt-8 inline-flex items-center gap-2 text-accent hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>
      </div>
    </section>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFoundProject />;

  const hasTech = project.technologies?.length > 0;
  const hasFeatures = project.features?.length > 0;
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      {/* Header */}
      <header className="container-page">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">{project.category}</p>
            {project.role === "team" && (
              <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-muted">
                <Users className="h-3 w-3" />
                {project.roleLabel || "Team project"}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.tagline}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          {project.github && (
            <Button href={project.github} variant="secondary">
              <FaGithub className="h-4 w-4" /> GitHub
            </Button>
          )}
          {project.live && (
            <Button href={project.live}>
              Live Demo <ArrowUpRight className="h-4 w-4" />
            </Button>
          )}
        </Reveal>
      </header>

      {/* Preview */}
      <Reveal delay={0.15} className="container-page mt-12">
        <ProjectPreview project={project} className="shadow-[0_60px_120px_-60px_rgb(124_108_255/0.35)]" />
      </Reveal>

      {/* Overview + tech */}
      <div className="container-page mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <p className="mt-4 text-lg leading-relaxed text-fg/90">{project.description}</p>
          </Reveal>

          {hasFeatures && (
            <Reveal delay={0.08} className="mt-12">
              <p className="eyebrow">Key Features</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        {hasTech && (
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="eyebrow">Technology Stack</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} className="px-3.5 py-1.5 text-sm">
                  {tech}
                </TechBadge>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {/* Case study (currently: InterviewIQ) */}
      {project.caseStudy && (
        <div className="container-page mt-24 border-t border-line pt-16">
          <Reveal>
            <p className="eyebrow">Case Study</p>
          </Reveal>
          <div className="mt-10">
            <CaseStudySection caseStudy={project.caseStudy} />
          </div>
        </div>
      )}

      {/* More projects */}
      {more.length > 0 && (
        <div className="container-page mt-24 border-t border-line pt-16">
          <p className="eyebrow">More projects</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {more.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}