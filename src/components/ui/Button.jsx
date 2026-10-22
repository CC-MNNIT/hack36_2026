import styles from "./Button.module.css";

export default function Button({ href, children, variant = "primary", size = "md", className = "", ...rest }) {
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3 8h9M8 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </a>
  );
}
