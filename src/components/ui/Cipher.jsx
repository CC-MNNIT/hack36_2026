"use client";

import { useEffect, useRef } from "react";

// No digits on purpose: the scrambled value must never read as a real amount.
const GLYPHS = "▓▒░█#%&@";

// Continuously re-rolls a masked string — used for values that aren't public yet.
// Only ticks while on screen, at ~12fps, so it costs next to nothing.
export default function Cipher({ mask = "₹##,##,###", label = "To be revealed", className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer;
    const roll = () => {
      el.textContent = mask.replace(/#/g, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]);
    };
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) timer = setInterval(roll, 80);
    });
    io.observe(el);

    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [mask]);

  return (
    <span className={className} aria-label={label}>
      <span ref={ref} aria-hidden="true">
        {mask.replace(/#/g, "▓")}
      </span>
    </span>
  );
}
