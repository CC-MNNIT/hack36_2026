"use client";

import { useRef } from "react";
import { event } from "@/data/site";
import { gsap } from "@/lib/gsap";
import { useScrollAnim } from "@/lib/useScrollAnim";
import Button from "@/components/ui/Button";
import Countdown from "@/components/ui/Countdown";
import Skyline from "./Skyline";
import styles from "./Hero.module.css";

export default function Hero() {
  const root = useRef(null);

  useScrollAnim(root, ({ desktop }) => {
    // Boot sequence
    const intro = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });
    intro
      .fromTo("[data-hud] > div",{ scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.12, duration: 1.6 })
      .fromTo(
        "[data-title]",
        { opacity: 0, yPercent: 40, rotateX: -70, transformPerspective: 900 },
        { opacity: 1, yPercent: 0, rotateX: 0, duration: 1.4 },
        0.15
      )
      .fromTo("[data-intro]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.08 }, 0.45)
      .fromTo("[data-skyline]", { yPercent: 25 }, { yPercent: 0, duration: 1.8 }, 0);

    // Scroll exit: content tips back into the screen while the city sinks
    const exit = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
    exit
      .to("[data-content]", { yPercent: -18, rotateX: 28, scale: 0.86, opacity: 0, transformPerspective: 1000 }, 0)
      .to("[data-hud]", { rotate: 90, scale: 1.4, opacity: 0 }, 0)
      .to("[data-floor]", { rotateX: desktop ? 62 : 68 }, 0)
      .to('[data-layer="back"]', { yPercent: 20 }, 0)
      .to('[data-layer="front"]', { yPercent: 35 }, 0);
  });

  return (
    <section id="top" ref={root} className={styles.hero}>
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.sky} />
        <Skyline className={styles.skyline} />
        <div className={styles.horizon} />
        <div className={styles.floorWrap}>
          <div className={styles.floor} data-floor>
            <div className={styles.grid} />
          </div>
        </div>
      </div>

      <div className={styles.hud} data-hud aria-hidden="true">
        <div className={styles.ring}>
          <svg viewBox="0 0 200 200" className={styles.ringA}>
            <circle cx="100" cy="100" r="96" pathLength="100" strokeDasharray="22 3 1 3" />
          </svg>
        </div>
        <div className={styles.ring}>
          <svg viewBox="0 0 200 200" className={styles.ringB}>
            <circle cx="100" cy="100" r="80" pathLength="100" strokeDasharray="0.4 1.6" />
          </svg>
        </div>
        <div className={styles.ring}>
          <svg viewBox="0 0 200 200" className={styles.ringC}>
            <circle cx="100" cy="100" r="66" pathLength="100" strokeDasharray="40 10" />
            <path d="M100 18v10M100 172v10M18 100h10M172 100h10" />
          </svg>
        </div>
      </div>

      <div className={`container ${styles.content}`} data-content>
        <p className={styles.kicker} data-intro>
          <span className={styles.dot} /> {event.host} presents
        </p>

        <h1 className={styles.title} data-title>
          <span className="sr-only">
            {event.name} {event.edition} {event.theme}
          </span>
          <span className={styles.glitch} data-text="HACK36" aria-hidden="true">
            HACK36
          </span>
        </h1>

        <div className={styles.sub} data-intro>
          <span className={styles.edition}>{event.edition}</span>
          <span className={styles.theme}>{"//"} {event.theme}</span>
        </div>

        <p className={styles.tagline} data-intro>
          {event.tagline.join(" · ")}
        </p>

        <div data-intro>
          <Countdown to={event.startsAt} />
        </div>

        <div className={styles.ctas} data-intro>
          <Button href={event.registerUrl}>Register now</Button>
          <Button href={event.discordUrl} variant="ghost">
            Join Discord
          </Button>
        </div>
      </div>

      <div className={`container ${styles.meta}`} data-intro>
        <span>{event.dateLabel}</span>
        <span className={styles.scroll}>
          Scroll <i aria-hidden="true" />
        </span>
        <span>{event.duration}H · Offline</span>
      </div>
    </section>
  );
}
