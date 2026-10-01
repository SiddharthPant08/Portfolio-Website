import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import MagneticButton from "@/components/ui/MagneticButton.jsx";
import SocialLinks from "@/components/ui/SocialLinks.jsx";
import Tilt from "@/components/ui/Tilt.jsx";
import HeroTerminal from "./HeroTerminal.jsx";
import portfolioConfig from "@/data/portfolioConfig.js";
const EASE = [0.22, 1, 0.36, 1];
function Line({ children, delay, reduce, className = "" }) {
  return (
    <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={reduce ? false : { y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}>
        {children}
      </motion.span>
    </span>
  );
}
export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Mouse-following glow (percent coordinates inside the hero)
  const mx = useMotionValue(68);
  const my = useMotionValue(30);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(640px circle at ${smx}% ${smy}%, rgb(124 108 255 / 0.16), transparent 60%)`;
  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };
  // Subtle parallax on the background blobs
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };
  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onPointerMove}
      className="bg-noise relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 lg:pt-36"
    >
      {/* Background layers */}
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <motion.div className="absolute inset-0 -z-10" style={{ background: glow }} aria-hidden="true" />
      <motion.div style={{ y: blobY }} className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="animate-drift absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent-2/20 blur-3xl" />
        <div className="animate-drift absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent-3/10 blur-3xl [animation-delay:-9s]" />

      </motion.div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent" aria-hidden="true"/>
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.div {...fade(0.1)}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {portfolioConfig.status}
            </span>
          </motion.div>
          <motion.p {...fade(0.2)} className="mt-8 font-mono text-sm text-muted sm:text-base">
            Hi, I&apos;m <span className="text-fg">{portfolioConfig.name}</span>
          </motion.p>
          <h1 className="hero-title mt-4 font-semibold uppercase">
            <span className="sr-only">{portfolioConfig.name} — {portfolioConfig.role}. </span>
            <Line delay={0.3} reduce={reduce}>Building</Line>
            <Line delay={0.42} reduce={reduce}>Digital</Line>
            <Line delay={0.54} reduce={reduce} className="text-gradient">
              Experiences.
            </Line>
          </h1>
          <motion.p
            {...fade(0.85)}
            className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-muted"
          >
            <span className="text-fg">{portfolioConfig.role}</span> {portfolioConfig.tagline}
          </motion.p>
          <motion.div {...fade(1)} className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Button to="/#work" size="lg">
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"/>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button href={portfolioConfig.resume} variant="secondary" size="lg" download>
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </MagneticButton>
          </motion.div>
          <motion.div {...fade(1.1)} className="mt-10">
            <SocialLinks />
          </motion.div>
        </div>
        {/* Terminal */}
        <motion.div {...fade(0.7)} className="lg:col-span-5">
          <Tilt max={4}>
            <HeroTerminal />
          </Tilt>
        </motion.div>
      </div>
      {/* Scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-hidden="true"
      >
        <span className="eyebrow text-[10px]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent to-accent"
            animate={reduce ? undefined : { y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
);}