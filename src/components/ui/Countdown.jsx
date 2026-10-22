"use client";

import { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

const UNITS = [
  ["Days", 86400000],
  ["Hrs", 3600000],
  ["Min", 60000],
  ["Sec", 1000],
];

function split(ms) {
  let rest = Math.max(ms, 0);
  return UNITS.map(([label, size]) => {
    const v = Math.floor(rest / size);
    rest -= v * size;
    return [label, String(v).padStart(2, "0")];
  });
}

export default function Countdown({ to }) {
  // Placeholder on the server avoids a hydration mismatch.
  const [parts, setParts] = useState(() => UNITS.map(([l]) => [l, "--"]));

  useEffect(() => {
    const target = new Date(to).getTime();
    const update = () => setParts(split(target - Date.now()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [to]);

  return (
    <div className={styles.wrap} role="timer" aria-label="Time until hacking begins">
      {parts.map(([label, value], i) => (
        <div key={label} className={styles.cell}>
          <span className={styles.value}>{value}</span>
          <span className={styles.label}>{label}</span>
          {i < parts.length - 1 && <span className={styles.sep} aria-hidden="true">:</span>}
        </div>
      ))}
    </div>
  );
}
