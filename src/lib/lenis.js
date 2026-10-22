"use client";

// Module-level handle so any component can drive the shared Lenis instance.
let instance = null;

export const setLenis = (l) => {
  instance = l;
};

export function scrollToId(id) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return;
  if (instance) instance.scrollTo(target, { offset: -64, duration: 1.4 });
  else if (target === 0) window.scrollTo({ top: 0, behavior: "smooth" });
  else target.scrollIntoView({ behavior: "smooth" });
}
