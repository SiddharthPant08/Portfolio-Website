import { useEffect, useState } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

// True only on devices with a real mouse/trackpad. Used to gate the custom cursor.
export default function useFinePointer() {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = (e) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return matches;
}