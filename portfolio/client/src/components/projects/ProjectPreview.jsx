// Shows the project's real screenshot once one exists at `images[0]`.
// Until then, renders a deterministic abstract gradient inside a browser
// chrome frame instead of a broken image or an obvious placeholder box.
const PALETTES = [
  ["#7c6cff", "#38bdf8"],
  ["#8b5cf6", "#7c6cff"],
  ["#38bdf8", "#8b5cf6"],
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export default function ProjectPreview({ project, className = "", chrome = true }) {
  const image = project.images?.[0];
  const [from, to] = PALETTES[hashString(project.id) % PALETTES.length];

  return (
    <div
      className={`relative overflow-hidden rounded-(--radius-card) border border-line-strong bg-surface ${className}`}
    >
      {chrome && (
        <div className="flex items-center gap-1.5 border-b border-line bg-surface/90 px-3.5 py-2.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
      )}

      <div className="relative aspect-[16/10] w-full">
        {image ? (
          <img
            src={image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-grid"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, ${from}33, transparent 60%), radial-gradient(circle at 80% 85%, ${to}26, transparent 55%)`,
            }}
          >
            <span className="font-mono text-sm tracking-widest text-subtle">
              {project.title.toUpperCase()}
            </span>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}