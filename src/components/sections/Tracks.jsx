"use client";

import { useRef } from "react";
import { tracks } from "@/data/site";
import { gsap } from "@/lib/gsap";
import { useScrollAnim } from "@/lib/useScrollAnim";
import SectionHead from "@/components/ui/SectionHead";
import Icon from "@/components/ui/Icon";
import styles from "./Tracks.module.css";

const STEP = 360 / tracks.length;

export default function Tracks() {
  const root = useRef(null);

  useScrollAnim(root, ({ desktop }) => {
    const cards = gsap.utils.toArray("[data-card]", root.current);

    if (!desktop) {
      gsap.fromTo(cards, { opacity: 0, rotateY: -80, transformPerspective: 800, transformOrigin: "left center" }, {
        opacity: 1,
        rotateY: 0,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-ring]", start: "top 80%" },
      });
      return;
    }

    // Desktop: pin the stage and spin the ring one card per scroll step
    root.current.dataset.ring = "on";
    let active = -1;
    const setActive = (i) => {
      if (i === active) return;
      active = i;
      cards.forEach((c, j) => c.toggleAttribute("data-active", j === i));
    };
    setActive(0);

    const ring = root.current.querySelector("[data-ring]");
    const depth = -parseFloat(getComputedStyle(ring).getPropertyValue("--r"));

    gsap.fromTo(
      ring,
      { rotationY: 0, z: depth },
      {
        rotationY: -STEP * (tracks.length - 1),
        z: depth,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-pin]",
          start: "top top",
          end: () => `+=${window.innerHeight * 2.2}`,
          pin: true,
          scrub: 0.8,
          snap: { snapTo: 1 / (tracks.length - 1), duration: 0.4, ease: "power2.inOut" },
          onUpdate: (self) => setActive(Math.round(self.progress * (tracks.length - 1))),
        },
      }
    );

    return () => {
      delete root.current?.dataset.ring;
      cards.forEach((c) => c.removeAttribute("data-active"));
    };
  });

  return (
    <section id="tracks" ref={root} className={styles.tracks}>
      <div className={styles.pin} data-pin>
        <div className="container">
          <SectionHead index="02" label="Tracks" title="Pick your weapon" />
        </div>

        <div className={styles.stage}>
          <div className={styles.ring} data-ring>
            {tracks.map((t, i) => (
              <article key={t.code} className={styles.card} style={{ "--a": `${i * STEP}deg` }} data-card>
                <span className={styles.code}>TRK_{t.code}</span>
                <Icon name={t.icon} className={styles.icon} />
                <h3 className={styles.name}>{t.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
