
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import SocialLinks from "@/components/ui/SocialLinks.jsx";
import portfolioConfig from "@/data/portfolioConfig.js";
import { navItems } from "@/data/navigation.js";

export default function Footer() {
  const reduce = useReducedMotion();

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <footer className="relative border-t border-line">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-mono text-lg font-semibold tracking-[0.22em]">
              {portfolioConfig.name.toUpperCase()}
            </p>

            <p className="mt-3 text-fg">
              {portfolioConfig.role}
            </p>

            <p className="mt-1 text-muted">
              Building modern web experiences.
            </p>

            <SocialLinks className="mt-8" />
          </div>

          <nav
            aria-label="Footer"
            className="md:col-span-6 md:justify-self-end"
          >
            <ul className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hairline mt-14" aria-hidden="true" />

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-subtle">
            © {new Date().getFullYear()} {portfolioConfig.name} 
            {" "}
          </p>

          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
          >
            Back to top

            <span className="glass grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}