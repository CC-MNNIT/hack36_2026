"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&/<>[]{}*+=";
const rand = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

// Decodes `text` character by character the first time it scrolls into view.
// The real text is server-rendered, so it is readable without JS.
export default function ScrambleText({ text, as: Tag = "span", duration = 900, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf;
    const run = () => {
      const start = performance.now();
      const frame = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const revealed = Math.floor(p * text.length);
        let out = text.slice(0, revealed);
        for (let i = revealed; i < text.length; i++) out += text[i] === " " ? " " : rand();
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text, duration]);

  return (
    <Tag className={className} aria-label={text}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </Tag>
  );
}
