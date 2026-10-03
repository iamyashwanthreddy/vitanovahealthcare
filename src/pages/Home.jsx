import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import CtaBand from '../components/CtaBand.jsx';
import useDocumentMeta from '../hooks/useDocumentMeta.js';
import {
  brand,
  services,
  homeHighlights,
  about,
  servicesIntro,
} from '../data/site.js';
import styles from './Home.module.css';

const highlightIcons = ['heart', 'users', 'shield'];

export default function Home() {
  useDocumentMeta({
    title: 'Compassionate Home & Social Care in Ireland',
    description:
      'Vitanova Health Care delivers high-quality home care, 24-hour care, companionship and specialist support across Ireland — seeing the person first before their disability.',
    path: '/',
  });

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <img
          src="/images/hero-home-care.jpg"
          alt=""
          className={styles.heroBg}
          width="1920"
          height="1280"
          fetchpriority="high"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className={styles.heroEyebrow}>
              <Icon name="sparkle" size={16} />
              Health &amp; social care, nationwide
            </span>
            <h1 className={styles.heroTitle}>
              Seeing the person <span className="accent-leaf">first</span>, before
              their disability
            </h1>
            <p className={styles.heroLead}>
              Vitanova Health Care is a trustworthy health and social care provider
              delivering quality services across Ireland — from short check-in
              visits to full live-in support, with compassion and care.
            </p>
            <div className={styles.heroActions}>
              <Button to="/careers" variant="coral">
                Apply Here
              </Button>
              <Button to="/services" variant="ghost-dark">
                Explore our services
              </Button>
            </div>
            <ul className={styles.heroMeta}>
              <li>
                <Icon name="clock" size={18} /> 24-hour care available
              </li>
              <li>
                <Icon name="shield" size={18} /> Family-run &amp; trusted
              </li>
            </ul>
          </div>

          {/* Composed brand visual (no misleading photography) */}
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.visualCard}>
              <span className={styles.visualChip}>
                <Icon name="leaf" size={16} /> Person-centred care
              </span>
              <p className={styles.visualQuote}>
                “A reliable, affordable, high-quality service — with compassion and
                care.”
              </p>
              <ul className={styles.visualList}>
                <li>
                  <span className={styles.visualDot} data-tone="mint">
                    <Icon name="check" size={13} />
                  </span>
                  Care calls at agreed times each day
                </li>
                <li>
                  <span className={styles.visualDot} data-tone="sky">
                    <Icon name="check" size={13} />
                  </span>
                  Regular carers who build real relationships
                </li>
                <li>
                  <span className={styles.visualDot} data-tone="lilac">
                    <Icon name="check" size={13} />
                  </span>
                  Peace of mind for families near and far
                </li>
              </ul>
            </div>
            <div className={`${styles.floatCard} ${styles.floatOne}`}>
              <Icon name="clock" size={22} />
              <span>24/7</span>
              <small>Round-the-clock care</small>
            </div>
            <div className={`${styles.floatCard} ${styles.floatTwo}`}>
              <Icon name="home" size={22} />
              <span>At home</span>
              <small>Live-in &amp; visiting support</small>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Highlights ---------- */}
      <section className="section">
        <div className="container">
          <div className={`section-head ${styles.center}`}>
            <span className="eyebrow">Why families choose us</span>
            <h2>Quality care from a team that treats you like family</h2>
          </div>
          <div className={styles.highlightGrid}>
            {homeHighlights.map((h, i) => (
              <article
                key={h.title}
                className={`${styles.highlightCard} reveal`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className={styles.highlightIcon}>
                  <Icon name={highlightIcons[i] || 'heart'} size={24} />
                </span>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <div className={styles.servicesHead}>
            <div className="section-head">
              <span className="eyebrow">Our services</span>
              <h2>Support shaped around each person</h2>
              <p className="lead">{servicesIntro}</p>
            </div>
            <Button to="/services" variant="ghost" className={styles.allServices}>
              View all services
            </Button>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
            <Link to="/services" className={`${styles.moreCard} reveal`}>
              <span className={styles.moreIcon}>
                <Icon name="arrow" size={24} />
              </span>
              <h3>Explore every service</h3>
              <p>See how we support individuals, families and communities.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Mission / values ---------- */}
      <section className={styles.mission}>
        <div className={`container ${styles.missionInner}`}>
          <div className={`${styles.missionText} reveal`}>
            <span className="eyebrow">Our purpose</span>
            <h2>{about.missionStatement}</h2>
            <p className={styles.missionBody}>{brand.coreValue}</p>
            <Button to="/about" variant="coral">
              More about us
            </Button>
          </div>
          <ul className={styles.valueList}>
            {about.values.map((v, i) => (
              <li
                key={v.title}
                className={`${styles.valueItem} reveal`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
