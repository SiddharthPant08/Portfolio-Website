import Reveal from "@/components/ui/Reveal.jsx";
import Tilt from "@/components/ui/Tilt.jsx";
import SectionHeading from "@/components/ui/SectionHeading.jsx";
import ProfileImage from "@/components/ui/ProfileImage.jsx";
import portfolioConfig from "@/data/portfolioConfig.js";

const facts = [
  { value: "2026", label: "B.Tech CSE" },
  { value: "MERN", label: "Full Stack" },
  { value: "AI", label: "AI Applications" },
  { value: "∞", label: "Always Learning" },
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + photo */}
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              label="About me"
              title={
                <>
                  I build complete products, <span className="text-muted">end to end.</span>
                </>
              }
            />
            <Reveal delay={0.15} className="mt-10 max-w-sm sm:max-w-md lg:max-w-none">
              <Tilt max={4}>
                <ProfileImage
                  src={portfolioConfig.avatar}
                  alt={`Portrait of ${portfolioConfig.name}`}
                  className="aspect-[4/3] lg:aspect-[4/5]"
                />
              </Tilt>
            </Reveal>
          </div>

          {/* Right: copy + fact cards */}
          <div className="lg:col-span-7 lg:pt-3">
            <Reveal>
              <p className="text-balance text-xl leading-relaxed text-fg/90 sm:text-2xl">
                I&apos;m a Full-Stack Developer who works mainly with the MERN stack, building the
                interface, the API and the database as one product.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-2xl leading-relaxed text-muted">
                I enjoy database-driven applications and REST APIs, and I&apos;ve been integrating AI
                into what I build, such as InterviewIQ, an AI-powered interview practice platform. I&apos;m
                finishing my B.Tech in Computer Science and Engineering at {portfolioConfig.education.institute},
                graduating in {portfolioConfig.education.end}, and I&apos;ve worked as an IT Intern in the
                IT department at Hindustan Aeronautics Limited, Korwa.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4">
              {facts.map((fact, i) => (
                <Reveal key={fact.label} delay={0.1 + i * 0.07} className="h-full">
                  <Tilt max={6} className="h-full">
                    <div className="glass group relative h-full overflow-hidden rounded-(--radius-card) p-5 transition-colors duration-300 hover:border-line-strong sm:p-6">
                      <span className="font-mono text-[10px] text-subtle">0{i + 1}</span>
                      <p className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {fact.value}
                      </p>
                      <p className="mt-1 text-sm text-muted">{fact.label}</p>
                      <div
                        className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/25"
                        aria-hidden="true"
                      />
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}