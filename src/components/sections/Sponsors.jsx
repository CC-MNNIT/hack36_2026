import { sponsors, event } from "@/data/site";
import SectionHead from "@/components/ui/SectionHead";
import styles from "./Sponsors.module.css";

const half = Math.ceil(sponsors.length / 2);
const rows = [sponsors.slice(0, half), sponsors.slice(half)];

// Pure CSS marquee: each row is duplicated once and translated -50% on loop.
export default function Sponsors() {
  return (
    <section id="sponsors" className={`section ${styles.sponsors}`}>
      <div className="container">
        <SectionHead index="05" label="Partners" title="Backed by" />
      </div>

      <div className={styles.rows}>
        {rows.map((row, r) => (
          <div key={r} className={styles.viewport}>
            <ul className={`${styles.row} ${r % 2 ? styles.reverse : ""}`}>
              {[...row, ...row].map((name, i) => (
                <li key={i} className={styles.logo} aria-hidden={i >= row.length || undefined}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`container ${styles.foot}`}>
        <span className="muted">Past partners · 2025</span>
        <a href={`mailto:${event.email}?subject=Sponsoring%20Hack36`} className={styles.pitch}>
          Partner with us →
        </a>
      </div>
    </section>
  );
}
