"use client";

import { useRef } from "react";
import { stats } from "@/data/site";
import { gsap } from "@/lib/gsap";
import { useScrollAnim } from "@/lib/useScrollAnim";
import styles from "./Stats.module.css";

export default function Stats() {
  const root = useRef(null);

  useScrollAnim(root, () => {
    gsap.utils.toArray("[data-count]", root.current).forEach((el) => {
      const end = Number(el.dataset.count);
      const counter = { v: 0 };
      gsap.to(counter, {
        v: end,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => (el.textContent = Math.round(counter.v).toLocaleString("en-IN")),
      });
    });

    gsap.fromTo("[data-stat]", { opacity: 0, y: 30, rotateX: -45, transformPerspective: 600 }, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.1,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: root.current, start: "top 85%" },
    });
  });

  return (
    <section ref={root} className={styles.band} aria-label="Hack36 in numbers">
      <div className={`container ${styles.grid}`}>
        {stats.map((s) => (
          <div key={s.label} className={styles.stat} data-stat>
            <span className={styles.value}>
              <span data-count={s.value}>{s.value.toLocaleString("en-IN")}</span>
              <em>{s.suffix}</em>
            </span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
