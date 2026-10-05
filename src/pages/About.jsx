import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import useDocumentMeta from '../hooks/useDocumentMeta.js';
import { about, brand } from '../data/site.js';
import styles from './About.module.css';

const pillars = [
  { key: 'mission', label: 'Mission', icon: 'compass', body: about.mission, tone: 'mint' },
  { key: 'vision', label: 'Vision', icon: 'sparkle', body: about.vision, tone: 'sky' },
  { key: 'passion', label: 'Passion', icon: 'heart', body: about.passion, tone: 'lilac' },
];

const toneBg = {
  mint: 'var(--color-mint-wash)',
  sky: 'var(--color-sky-wash)',
  lilac: 'var(--color-lilac-wash)',
};
const toneInk = {
  mint: 'var(--color-canopy-green)',
  sky: 'var(--color-deep-teal)',
  lilac: 'var(--color-indigo-bloom)',
};

export default function About() {
  useDocumentMeta({
    title: 'About Us',
    description:
      'Vitanova Health Care is a trustworthy, family-run health and social care provider delivering elite, holistic home care across Ireland and beyond.',
    path: '/about',
  });

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A trustworthy partner in health and social care"
        intro={about.intro}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
        ]}
      />

      {/* Intro + core value */}
      <section className="section">
        <div className={`container ${styles.introGrid}`}>
          <div className="reveal">
            <span className="eyebrow">Who we are</span>
            <h2>Care built on compassion, delivered with integrity</h2>
          </div>
          <div className={`${styles.introBody} reveal`}>
            <p className="lead">{brand.coreValue}</p>
            <p>
              We specialise in home-based care — from short check-in visits to full
              live-in support — and go above and beyond to make sure you or your
              family member gets the best care available, wherever you call home.
            </p>
            <img
              src="/images/care.jpg"
              alt="A young carer preparing a meal alongside an older client in his home kitchen."
              className={styles.introImage}
              width="1100"
              height="733"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Mission statement banner */}
      <section className="section--tight">
        <div className="container">
          <div className={`${styles.statement} reveal`}>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <p>{about.missionStatement}</p>
            <span className={styles.statementLabel}>Our mission statement</span>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Passion */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What drives us</span>
            <h2>Mission, vision &amp; passion</h2>
          </div>
          <div className={styles.pillarGrid}>
            {pillars.map((p, i) => (
              <article
                key={p.key}
                className={`${styles.pillar} reveal`}
                style={{
                  background: toneBg[p.tone],
                  color: toneInk[p.tone],
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span className={styles.pillarIcon} style={{ color: toneInk[p.tone] }}>
                  <Icon name={p.icon} size={24} />
                </span>
                <h3 style={{ color: toneInk[p.tone] }}>{p.label}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesInner}>
            <div className={`${styles.valuesHead} reveal`}>
              <span className="eyebrow">Our values</span>
              <h2>The principles behind every visit</h2>
              <p className="lead">
                These values guide how our nurses, healthcare assistants, support
                workers and specialist carers show up for the people we serve.
              </p>
              <img
                src="/images/caregive.jpg"
                alt="A support worker and a family member helping an older man use a tablet together at home."
                className={styles.valuesImage}
                width="1100"
                height="733"
                loading="lazy"
              />
            </div>
            <ul className={styles.valueGrid}>
              {about.values.map((v, i) => (
                <li
                  key={v.title}
                  className={`${styles.valueCard} reveal`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span className={styles.valueNum}>0{i + 1}</span>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's find the right care together"
        body="Talk to our team about home care, 24-hour support or joining Vitanova Health Care."
      />
    </>
  );
}
