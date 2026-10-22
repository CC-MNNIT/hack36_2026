"use client";

import { useRef } from "react";
import { about, event } from "@/data/site";
import { gsap } from "@/lib/gsap";
import { useScrollAnim } from "@/lib/useScrollAnim";
import SectionHead from "@/components/ui/SectionHead";
import styles from "./About.module.css";

const TRACES = [
  "M0 120H220L260 160H520",
  "M0 300H140L190 250H360L400 290H600",
  "M1200 80H980L940 120H760",
  "M1200 420H1040L1000 380H820L780 420H640",
  "M0 520H300L340 480H460",
  "M1200 560H900L860 520H720",
];

const FACES = [
  { cls: "front", label: "36" },
  { cls: "back", label: "10.0" },
  { cls: "right", label: "</>" },
  { cls: "left", label: "{ }" },
  { cls: "top", label: "" },
  { cls: "bottom", label: "" },
];

const chips = [`${event.duration}H`, "2–4 / team", "Free", "Offline"];

export default function About() {
  const root = useRef(null);

  useScrollAnim(root, () => {
    const scrub = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 };

    gsap.fromTo("[data-trace]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", stagger: 0.05, scrollTrigger: { ...scrub, end: "center center" } });

    gsap.fromTo(
      "[data-cube]",
      { rotateX: -30, rotateY: -45 },
      { rotateX: 30, rotateY: 315, ease: "none", scrollTrigger: scrub }
    );
    gsap.fromTo("[data-core]", { rotateX: 45, rotateY: 0 }, { rotateX: -315, rotateY: -360, ease: "none", scrollTrigger: scrub });

    gsap.fromTo("[data-line]", { opacity: 0, x: -40 }, {
      opacity: 1,
      x: 0,
      stagger: 0.12,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: "[data-lines]", start: "top 80%" },
    });
    gsap.fromTo("[data-chip]", { opacity: 0, scale: 0.6 }, {
      opacity: 1,
      scale: 1,
      stagger: 0.06,
      duration: 0.6,
      ease: "back.out(2)",
      scrollTrigger: { trigger: "[data-lines]", start: "top 75%" },
    });
  });

  return (
    <section id="about" ref={root} className={`section ${styles.about}`}>
      <svg className={styles.traces} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {TRACES.map((d, i) => (
          <path key={i} d={d} pathLength="1" data-trace />
        ))}
      </svg>

      <div className={`container ${styles.grid}`}>
        <div>
          <SectionHead index="01" label="About" title={about.title} />
          <div className={styles.lines} data-lines>
            {about.lines.map((l) => (
              <p key={l} className={styles.line} data-line>
                <span aria-hidden="true">&gt;</span> {l}
              </p>
            ))}
          </div>
          <ul className={styles.chips}>
            {chips.map((c) => (
              <li key={c} data-chip>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.cubeScene} aria-hidden="true">
          <div className={styles.cube} data-cube>
            {FACES.map((f) => (
              <div key={f.cls} className={`${styles.face} ${styles[f.cls]}`}>
                {f.label}
              </div>
            ))}
            <div className={styles.core} data-core>
              {FACES.map((f) => (
                <div key={f.cls} className={`${styles.coreFace} ${styles[f.cls]}`} />
              ))}
            </div>
          </div>
          <div className={styles.shadow} />
        </div>
      </div>
    </section>
  );
}
