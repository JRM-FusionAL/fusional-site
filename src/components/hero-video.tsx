"use client";

import { useEffect, useState } from "react";

type SaveDataConnection = { saveData?: boolean; effectiveType?: string };

// The hero loop is 1.7 MB. Loading it during the initial paint starves the
// LCP still of bandwidth, so it is mounted only once the page has settled.
export function HeroVideo() {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const connection = (
      navigator as Navigator & { connection?: SaveDataConnection }
    ).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /2g/.test(connection.effectiveType)) return;

    let idle = 0;
    const schedule = () => {
      idle = window.setTimeout(() => setMounted(true), 200);
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      window.clearTimeout(idle);
      window.removeEventListener("load", schedule);
    };
  }, []);

  if (!mounted) return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    >
      <source src="/assets/hero-loop.mp4" type="video/mp4" />
    </video>
  );
}
