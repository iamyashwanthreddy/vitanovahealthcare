import Button from '../components/Button.jsx';
import useDocumentMeta from '../hooks/useDocumentMeta.js';
import styles from './NotFound.module.css';

export default function NotFound() {
  useDocumentMeta({
    title: 'Page not found',
    description: 'The page you are looking for could not be found.',
  });

  return (
    <section className={styles.wrap}>
      <div className="container">
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>We couldn&rsquo;t find that page</h1>
        <p className={styles.body}>
          The page may have moved or no longer exists. Let&rsquo;s get you back to
          care and support.
        </p>
        <div className={styles.actions}>
          <Button to="/" variant="coral">
            Back to home
          </Button>
          <Button to="/services" variant="ghost">
            Browse services
          </Button>
        </div>
      </div>
    </section>
  );
}
