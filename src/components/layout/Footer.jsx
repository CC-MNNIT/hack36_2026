import { event, socials } from "@/data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.col}>
          <span className="eyebrow">Signal</span>
          <a href={`mailto:${event.email}`} className={styles.big}>
            {event.email}
          </a>
        </div>

        <div className={styles.col}>
          <span className="eyebrow">Location</span>
          <a href={event.mapUrl} target="_blank" rel="noreferrer" className={styles.big}>
            {event.venue}
          </a>
        </div>

        <ul className={styles.socials}>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`container ${styles.base}`}>
        <span>© {new Date().getFullYear()} Hack36 · {event.host}</span>
        <span className={styles.status}>
          <i aria-hidden="true" /> All systems online
        </span>
      </div>
    </footer>
  );
}
