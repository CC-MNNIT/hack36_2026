import { faqs } from "@/data/site";
import SectionHead from "@/components/ui/SectionHead";
import styles from "./Faq.module.css";

// Native <details>: accessible, keyboard-friendly, and ships zero JS.
export default function Faq() {
  return (
    <section id="faq" className={`section ${styles.faq}`}>
      <div className={`container ${styles.grid}`}>
        <SectionHead index="06" label="FAQ" title="Queries" />

        <div className={styles.list}>
          {faqs.map((f, i) => (
            <details key={f.q} className={styles.item} name="faq">
              <summary className={styles.q}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                {f.q}
                <span className={styles.toggle} aria-hidden="true" />
              </summary>
              <p className={styles.a}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
