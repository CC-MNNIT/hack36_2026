"use client";

import { useEffect, useRef, useState } from "react";
import { nav, event } from "@/data/site";
import { scrollToId } from "@/lib/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const setBar = gsap.quickSetter(barRef.current, "scaleX");
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setBar(self.progress);
        setScrolled(self.scroll() > 40);
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`${styles.nav} ${scrolled || open ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" onClick={go("top")} className={styles.logo} aria-label="Hack36 home">
          <span className={styles.logoMark}>36</span>
          <span>HACK36</span>
        </a>

        <nav className={`${styles.links} ${open ? styles.open : ""}`} aria-label="Primary">
          {nav.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} onClick={go(item.id)} className={styles.link}>
              <span className={styles.idx}>0{i + 1}</span>
              {item.label}
            </a>
          ))}
          <Button href={event.registerUrl} className={styles.mobileCta}>
            Register
          </Button>
        </nav>

        <div className={styles.right}>
          <Button href={event.registerUrl} size="sm" className={styles.desktopCta}>
            Register
          </Button>
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div ref={barRef} className={styles.progress} aria-hidden="true" />
    </header>
  );
}
