import { Link } from "react-router-dom";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,box-shadow] duration-300 ease-premium";

const variants = {
  primary:
    "bg-fg text-bg hover:bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_10px_36px_-10px_rgb(124_108_255/0.6)]",

  secondary:
    "glass text-fg hover:bg-white/[0.07] hover:border-line-strong",

  ghost:
    "text-muted hover:text-fg",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

// Renders a router <Link> (to), an <a> (href), or a <button>.
export default function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  children,
  ...rest
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  // Internal React Router link
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  // External/internal anchor
  if (href) {
    const isWeb = /^https?:/.test(href);

    return (
      <a
        href={href}
        className={cls}
        {...(isWeb
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Normal button
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}