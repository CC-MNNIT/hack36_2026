"use client";

import { useRef } from "react";
import { event } from "@/data/site";
import { gsap } from "@/lib/gsap";
import { useScrollAnim } from "@/lib/useScrollAnim";
import Button from "@/components/ui/Button";
import ScrambleText from "@/components/ui/ScrambleText";
import styles from "./Cta.module.css";

const FRAMES = 8;
const GAP = 260;

export default function Cta() {
  const root = useRef(null);

  useScrollAnim(root, () => {
    // Endless tunnel: scroll pushes every frame toward the camera; a frame that
    // reaches NEAR wraps to the far end. Frames fade before getting too close so
    // nothing ever crosses the camera plane.
    const frames = gsap.utils.toArray("[data-frame]", root.current);
    const setters = frames.map((f) => ({
      z: gsap.quickSetter(f, "z", "px"),
      o: gsap.quickSetter(f, "opacity"),
    }));
    const SPAN = FRAMES * GAP;
    const NEAR = 380;
    const proxy = { p: 0 };
    const render = () => {
      const offset = proxy.p * SPAN * 1.5;
      setters.forEach((s, i) => {
        const d = (((i * GAP - offset) % SPAN) + SPAN) % SPAN; // 0 = nearest
        const z = NEAR - d;
        s.z(z);
        s.o(Math.min(1, (SPAN - d) / GAP, d / 160));
      });
    };
    render();
    gsap.to(proxy, {
      p: 1,
      ease: "none",
      onUpdate: render,
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
    });
    gsap.fromTo("[data-cta]", { opacity: 0, scale: 0.85 }, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: root.current, start: "top 55%" },
    });
  });

  return (
    <section ref={root} className={styles.cta}>
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.tunnel} data-tunnel>
          {Array.from({ length: FRAMES }, (_, i) => (
            <span key={i} className={styles.frame} style={{ "--z": `${-i * GAP}px` }} data-frame />
          ))}
        </div>
      </div>

      <div className={`container ${styles.content}`} data-cta>
        <p className="eyebrow">Connection ready</p>
        <ScrambleText as="h2" text="Jack in." className={`display ${styles.title}`} />
        <div className={styles.ctas}>
          <Button href={event.registerUrl}>Register now</Button>
          <Button href={event.discordUrl} variant="ghost">
            Discord
          </Button>
        </div>
      </div>
    </section>
  );
}
