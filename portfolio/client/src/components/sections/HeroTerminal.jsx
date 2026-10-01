import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Everything shown here is real profile data. Edit freely.
const SCRIPT = [
  {
    cmd: "whoami",
    out: [
      { text: "Siddharth Pant", className: "font-medium text-fg" },
      { text: "Full-Stack Developer" },
    ],
  },
  { cmd: "stack --primary", out: [{ tags: ["React", "Node.js", "Express", "MongoDB", "AI"] }] },
  { cmd: "education", out: [{ text: "B.Tech in CSE" }, { text: "IERT Prayagraj · 2026" }] },
  { cmd: "experience", out: [{ text: "IT Intern · HAL Korwa" }] },
  {
    cmd: "status",
    out: [{ text: "● open to opportunities", className: "text-emerald-400" }, { text: "building…" }],
  },
];

const toLine = (o) => (o.tags ? { kind: "tags", ...o } : { kind: "out", ...o });
const finalLines = () =>
  SCRIPT.flatMap((s) => [{ kind: "cmd", text: s.cmd }, ...s.out.map(toLine)]);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function Caret() {
  return (
    <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] animate-blink bg-accent" />
  );
}

export default function HeroTerminal() {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLines([]);
      setDone(false);

      if (reduce) {
        setLines(finalLines());
        setDone(true);
        return;
      }

      await wait(1000);
      for (const step of SCRIPT) {
        if (cancelled) return;
        setLines((l) => [...l, { kind: "cmd", text: "" }]);

        for (let i = 1; i <= step.cmd.length; i++) {
          await wait(50 + Math.random() * 45);
          if (cancelled) return;
          setLines((l) => {
            const next = [...l];
            next[next.length - 1] = { kind: "cmd", text: step.cmd.slice(0, i) };
            return next;
          });
        }

        await wait(280);
        for (const out of step.out) {
          if (cancelled) return;
          setLines((l) => [...l, toLine(out)]);
          await wait(170);
        }
        await wait(420);
      }
      if (!cancelled) setDone(true);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  const last = lines.length - 1;

  return (
    <div className="relative h-[26rem] overflow-hidden rounded-(--radius-card) border border-line-strong bg-surface/80 shadow-[0_40px_90px_-40px_rgb(124_108_255/0.45)] backdrop-blur">
      <div
        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        aria-hidden="true"
      />

      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-xs text-subtle">siddharth@portfolio ~ zsh</span>
      </div>

      <p className="sr-only">
        Siddharth Pant, Full-Stack Developer. Stack: React, Node.js, Express, MongoDB and AI.
        B.Tech in Computer Science at IERT Prayagraj, 2026. IT Intern at HAL Korwa. Open to
        opportunities.
      </p>

      <div
        aria-hidden="true"
        className="space-y-1 p-5 font-mono text-[13px] leading-relaxed text-muted sm:text-sm"
      >
        {lines.map((line, i) => {
          if (line.kind === "cmd") {
            return (
              <div key={i} className="flex gap-2 pt-1.5">
                <span className="select-none text-accent">$</span>
                <span className="text-fg">
                  {line.text}
                  {!done && i === last && <Caret />}
                </span>
              </div>
            );
          }
          if (line.kind === "tags") {
            return (
              <div key={i} className="flex flex-wrap gap-1.5 py-1 pl-4">
                {line.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line-strong bg-white/[0.04] px-2 py-0.5 text-xs text-fg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            );
          }
          return (
            <div key={i} className={`pl-4 ${line.className || ""}`}>
              {line.text}
            </div>
          );
        })}

        {done && (
          <div className="flex gap-2 pt-1.5">
            <span className="select-none text-accent">$</span>
            <Caret />
          </div>
        )}
      </div>
    </div>
  );
}