import { Link } from 'react-router-dom';
import { brand, contact, nav } from '../data/site.js';
import styles from './Footer.module.css';

const year = new Date().getFullYear();

export default function Footer() {
  const services = nav.find((n) => n.to === '/services');

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <span className={styles.logoChip}>
            <img src="/logo.png" alt={`${brand.name} logo`} width="180" height="86" />
          </span>
          <p className={styles.tagline}>{brand.tagline}.</p>
          <ul className={styles.socials} aria-label="Social media">
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.linkCol} aria-label="Footer — explore">
          <h3 className={styles.colTitle}>Explore</h3>
          <ul>
            {nav
              .filter((n) => !n.children)
              .map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
          </ul>
        </nav>

        <nav className={styles.linkCol} aria-label="Footer — services">
          <h3 className={styles.colTitle}>Services</h3>
          <ul>
            {services?.children.map((c) => (
              <li key={c.to}>
                <Link to={c.to}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contactCol}>
          <h3 className={styles.colTitle}>Get in touch</h3>
          <address className={styles.address}>
            {contact.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <ul className={styles.contactList}>
            {contact.phones.map((p) => (
              <li key={p.number}>
                <a href={p.href}>{p.number}</a>
                <span className={styles.contactMeta}>{p.label}</span>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {brand.name}. All rights reserved.
        </p>
        <p className={styles.region}>{contact.region}</p>
      </div>
    </footer>
  );
}
