import ScrambleText from "./ScrambleText";
import styles from "./SectionHead.module.css";

export default function SectionHead({ index, label, title, align = "left" }) {
  return (
    <header className={`${styles.head} ${align === "center" ? styles.center : ""}`}>
      <p className="eyebrow">
        <span className={styles.slash}>{"//"}</span> {index} — {label}
      </p>
      <ScrambleText as="h2" text={title} className={`display ${styles.title}`} />
    </header>
  );
}
