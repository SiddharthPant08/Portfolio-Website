import { useState } from "react";

// Drop-in profile photo. Falls back to a monogram if no image is set or it fails to load.
export default function ProfileImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <figure
      className={`relative overflow-hidden rounded-(--radius-card) border border-line bg-surface ${className}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label="Profile photo placeholder"
          className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(124_108_255/0.28),transparent_60%),radial-gradient(circle_at_80%_90%,rgb(56_189_248/0.18),transparent_55%)]"
        >
          <span className="text-gradient font-mono text-7xl font-semibold tracking-tighter">SP</span>
          {import.meta.env.DEV && (
            <span className="eyebrow absolute bottom-4 left-4 right-4 text-center normal-case tracking-normal">
              dev hint: set avatar in portfolioConfig.js
            </span>
          )}
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent"
        aria-hidden="true"
      />
    </figure>
  );
}