"use client";

import { useLayoutEffect, useEffect } from "react";
import { gsap } from "./gsap";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Runs GSAP setup scoped to `ref`. Skipped entirely when the user prefers
// reduced motion. `setup({ desktop, finePointer })` re-runs when those
// breakpoints flip, and everything it creates is reverted automatically.
export function useScrollAnim(ref, setup, deps = []) {
  useIsoLayoutEffect(() => {
    if (!ref.current) return;
    const mm = gsap.matchMedia(ref.current);
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px)",
        finePointer: "(pointer: fine)",
      },
      (ctx) => {
        if (!ctx.conditions.motion) return;
        return setup(ctx.conditions);
      }
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
