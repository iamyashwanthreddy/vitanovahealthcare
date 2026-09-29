import Button from './Button.jsx';
import styles from './CtaBand.module.css';

/**
 * Reusable call-to-action band used near the foot of most pages.
 */
export default function CtaBand({
  title = 'Ready to talk about care?',
  body = 'Whether you are looking for support for a loved one or joining our team, we would love to hear from you. Scheduling is easy, fast and secure.',
  primary = { label: 'Apply Here', to: '/application' },
  secondary = { label: 'Contact Us', to: '/contact' },
}) {
  return (
    <section className="section">
      <div className="container">
        <div className={`${styles.band} reveal`}>
          <div className={styles.text}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.body}>{body}</p>
          </div>
          <div className={styles.actions}>
            {primary && (
              <Button to={primary.to} href={primary.href} variant="coral">
                {primary.label}
              </Button>
            )}
            {secondary && (
              <Button to={secondary.to} href={secondary.href} variant="ghost-dark">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
