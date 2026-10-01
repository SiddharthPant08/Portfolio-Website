
import { Link } from "react-router-dom";
import { ArrowUpRight, Users } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "@/components/ui/Reveal.jsx";
import Tilt from "@/components/ui/Tilt.jsx";
import TechBadge from "@/components/ui/TechBadge.jsx";
import ProjectPreview from "./ProjectPreview.jsx";

function IconLink({ href, label, Icon }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="glass relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

export default function ProjectCard({ project, delay = 0 }) {
  const isFeatured = project.size === "featured";
  const isCompact = project.size === "compact";
  const hasTech = project.technologies?.length > 0;

  const cardHeight = isCompact ? "h-auto" : "h-full";

  return (
    <Reveal
      delay={delay}
      className={cardHeight}
    >
      <Tilt
        max={isCompact ? 2 : 3}
        className={cardHeight}
      >
        <article
          className={`glass group relative flex ${cardHeight} flex-col overflow-hidden rounded-(--radius-card) transition-colors duration-300 hover:border-line-strong ${
            isFeatured ? "lg:flex-row" : ""
          }`}
        >
          {!isCompact && (
            <Link
              to={`/projects/${project.slug}`}
              aria-label={`View ${project.title} project details`}
              className={isFeatured ? "lg:w-3/5" : "block"}
            >
              <ProjectPreview
                project={project}
                className="rounded-none border-0"
              />
            </Link>
          )}

          <div
            className={`flex flex-1 flex-col p-6 sm:p-7 ${
              isFeatured ? "lg:w-2/5 lg:p-9" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">{project.category}</p>

                <h3
                  className={`mt-2 font-semibold tracking-tight ${
                    isFeatured ? "text-2xl sm:text-3xl" : "text-xl"
                  }`}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {project.title}
                  </Link>
                </h3>
              </div>

              {project.role === "team" && (
                <span
                  className="glass mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-muted"
                  title={project.roleLabel}
                >
                  <Users className="h-3 w-3" />
                  Team
                </span>
              )}
            </div>

            <p
              className={`mt-3 text-sm leading-relaxed text-muted ${
                isCompact ? "" : "clamp-3"
              }`}
            >
              {isCompact ? project.tagline : project.description}
            </p>

            {hasTech && (
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies
                  .slice(0, isFeatured ? 6 : 4)
                  .map((tech) => (
                    <TechBadge key={tech}>
                      {tech}
                    </TechBadge>
                  ))}
              </div>
            )}

            <div
              className={`flex items-center justify-between gap-3 ${
                isCompact ? "mt-6" : "mt-auto pt-6"
              }`}
            >
              <Link
                to={`/projects/${project.slug}`}
                data-cursor="project"
                data-cursor-label="Case Study"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-transform duration-300 hover:translate-x-0.5"
              >
                {isCompact ? "View details" : "Case Study"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <div className="flex shrink-0 items-center gap-2">
                <IconLink
                  href={project.github}
                  label={`${project.title} on GitHub`}
                  Icon={FaGithub}
                />

                <IconLink
                  href={project.live}
                  label={`${project.title} live demo`}
                  Icon={ArrowUpRight}
                />
              </div>
            </div>
          </div>
        </article>
      </Tilt>
    </Reveal>
  );
}