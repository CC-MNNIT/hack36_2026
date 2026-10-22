"use client";

import { useRef } from "react";
import { timeline } from "@/data/site";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollAnim } from "@/lib/useScrollAnim";
import SectionHead from "@/components/ui/SectionHead";
import styles from "./Timeline.module.css";

export default function Timeline() {
  const root = useRef(null);

  useScrollAnim(root, ({ desktop }) => {
    const rail = root.current.querySelector("[data-rail]");
    const scrub = { trigger: rail, start: "top 60%", end: "bottom 60%", scrub: 0.6 };

    gsap.fromTo("[data-progress]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: scrub });
    gsap.fromTo(
      "[data-packet]",
      { y: 0 },
      { y: () => rail.offsetHeight, ease: "none", scrollTrigger: { ...scrub, invalidateOnRefresh: true } }
    );

    gsap.utils.toArray("[data-item]", root.current).forEach((item, i) => {
      const fromLeft = desktop && i % 2 === 0;
      gsap.fromTo(item.querySelector("[data-body]"), {
        opacity: 0,
        x: desktop ? (fromLeft ? -60 : 60) : 40,
        rotateY: desktop ? (fromLeft ? 50 : -50) : -30,
        transformPerspective: 900,
      }, {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: item, start: "top 80%" },
      });
      ScrollTrigger.create({
        trigger: item,
        start: "top 60%",
        onEnter: () => item.setAttribute("data-lit", ""),
        onLeaveBack: () => item.removeAttribute("data-lit"),
      });
    });

    return () => gsap.utils.toArray("[data-item]", root.current).forEach((el) => el.removeAttribute("data-lit"));
  });

  return (
    <section id="timeline" ref={root} className={`section ${styles.timeline}`}>
      <div className="container">
        <SectionHead index="03" label="Timeline" title="Run sequence" align="center" />

        <div className={styles.track}>
          <div className={styles.railWrap} data-rail aria-hidden="true">
            <svg className={styles.rail} viewBox="0 0 2 100" preserveAspectRatio="none">
              <line x1="1" y1="0" x2="1" y2="100" className={styles.base} />
              <line x1="1" y1="0" x2="1" y2="100" pathLength="1" className={styles.progress} data-progress />
            </svg>
            <span className={styles.packet} data-packet />
          </div>

          <ol className={styles.list}>
            {timeline.map((t) => (
              <li key={t.time} className={styles.item} data-item>
                <span className={styles.node} aria-hidden="true" />
                <div className={styles.body} data-body>
                  <span className={styles.time}>{t.time}</span>
                  <span className={styles.title}>{t.title}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
