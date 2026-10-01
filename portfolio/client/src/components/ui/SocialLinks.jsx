
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";
import portfolioConfig from "@/data/portfolioConfig.js";

export default function SocialLinks({ className = "" }) {
  const items = [
    {
      label: "GitHub",
      href: portfolioConfig.github,
      icon: GithubIcon,
    },
    {
      label: "LinkedIn",
      href: portfolioConfig.linkedin,
      icon: LinkedinIcon,
    },
  ].filter((item) => item.href);

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {items.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="glass grid h-11 w-11 place-items-center rounded-full text-muted transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-white/[0.07] hover:text-fg"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}