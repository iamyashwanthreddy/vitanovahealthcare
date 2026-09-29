import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import styles from './PageHero.module.css';

/**
 * Inner-page header on the dark canopy-green brand surface.
 * `crumbs`: array of { label, to } — the last item is the current page (no link).
 */
export default function PageHero({ eyebrow, title, intro, crumbs = [] }) {
  return (
    <header className={styles.hero}>
      <div className="container">
        {crumbs.length > 0 && (
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <ol>
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={c.label}>
                    {last || !c.to ? (
                      <span aria-current="page">{c.label}</span>
                    ) : (
                      <Link to={c.to}>{c.label}</Link>
                    )}
                    {!last && <Icon name="arrow" size={14} className={styles.sep} />}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1 className={styles.title}>{title}</h1>
        {intro && <p className={styles.intro}>{intro}</p>}
      </div>
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />
    </header>
  );
}
