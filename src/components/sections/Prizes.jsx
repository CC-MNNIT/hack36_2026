"use client";

import { useRef } from "react";
import { prizes, perks } from "@/data/site";
import { gsap } from "@/lib/gsap";
import { useScrollAnim } from "@/lib/useScrollAnim";
import SectionHead from "@/components/ui/SectionHead";
import Cipher from "@/components/ui/Cipher";
import styles from "./Prizes.module.css";

export default function Prizes() {
  const root = useRef(null);

  useScrollAnim(root, ({ desktop, finePointer }) => {
    gsap.fromTo(
      "[data-prize]",
      { rotateX: 75, y: 120, opacity: 0, transformPerspective: 1200, transformOrigin: "50% 100%" },
      {
        rotateX: 0,
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-podium]", start: "top 90%", end: desktop ? "top 35%" : "top 50%", scrub: 0.8 },
      }
    );

    gsap.fromTo(
      "[data-hex]",
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.2, scrollTrigger: { trigger: "[data-podium]", start: "top 60%" } }
    );

    if (!finePointer) return;

    // Pointer tilt: writes two CSS vars per frame, nothing else
    const cleanups = gsap.utils.toArray("[data-tilt]", root.current).map((el) => {
      const rx = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3.out" });
      gsap.set(el, { transformPerspective: 900 });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 16);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 16);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  });

  return (
    <section id="prizes" ref={root} className={`section ${styles.prizes}`}>
      <div className="container">
        <SectionHead index="04" label="Prizes" title="The loot" align="center" />

        <div className={styles.podium} data-podium>
          {prizes.map((p) => (
            <div key={p.rank} className={`${styles.slot} ${p.featured ? styles.featured : ""}`} data-prize>
              <div className={`cut ${styles.card}`} data-tilt>
                <div className={styles.badge}>
                  <svg className={styles.hex} viewBox="0 0 100 100" aria-hidden="true">
                    <path d="M50 4l40 23v46L50 96 10 73V27z" pathLength="1" data-hex />
                  </svg>
                  <span className={styles.rank}>{p.rank}</span>
                </div>
                <span className={styles.tier}>{p.tier}</span>
                <span className={styles.amount}>{p.amount ?? <Cipher />}</span>
              </div>
            </div>
          ))}
        </div>

        <ul className={styles.perks}>
          {perks.map((perk) => (
            <li key={perk}>+ {perk}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
