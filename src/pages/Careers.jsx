import PageHero from '../components/PageHero.jsx';
import CareerApplicationForm from '../components/CareerApplicationForm.jsx';
import Icon from '../components/Icon.jsx';
import useDocumentMeta from '../hooks/useDocumentMeta.js';
import { applicationSteps, faqs, contact } from '../data/site.js';
import styles from './Careers.module.css';

export default function Careers() {
  useDocumentMeta({
    title: 'Careers',
    description:
      'Apply for care or join the Vitanova Health Care team. Submit an application online, or download and print our application form and email it back to us.',
    path: '/careers',
  });

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Apply for care, or join our team"
        intro="Vitanova Health Care is a reliable and trustworthy health and social care provider. We work with clients and their families who require care in their own homes — from periodic check-ins to full live-in support — and we're committed to meeting all of your health and care needs."
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Careers', to: '/careers' },
        ]}
      />

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className={`section-head ${styles.center}`}>
            <span className="eyebrow">How to apply</span>
            <h2>Three simple steps</h2>
          </div>
          <ol className={styles.steps}>
            {applicationSteps.map((step, i) => (
              <li
                key={step.title}
                className={`${styles.step} reveal`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className={styles.stepNum}>{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Two paths */}
      <section className={styles.applySection}>
        <div className={`container ${styles.applyGrid}`}>
          <div className={`${styles.formCard} reveal`}>
            <CareerApplicationForm />
          </div>

          <aside className={styles.altCol}>
            <div className={styles.altCard}>
              <span className={styles.altIcon}>
                <Icon name="download" size={24} />
              </span>
              <h3>Prefer a paper form?</h3>
              <p>
                Download and print our application form, complete it at your own
                pace, then email the finished form back to our team.
              </p>
              <a
                className={styles.altBtn}
                href="/application-form.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="download" size={18} />
                Download &amp; print form
              </a>
              <a
                className={styles.altLink}
                href={`mailto:${contact.email}?subject=Application%20form`}
              >
                <Icon name="mail" size={18} />
                Email your completed form
              </a>
            </div>

            <div className={styles.commitCard}>
              <h3>Our commitment to you</h3>
              <ul>
                <li>
                  <Icon name="check" size={16} />
                  Committed to meeting all of your health and care support needs
                </li>
                <li>
                  <Icon name="check" size={16} />
                  We go above and beyond to secure the best care available
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Good to know</span>
            <h2>Frequently asked questions</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((f) => (
              <details key={f.q} className={styles.faq}>
                <summary>
                  <span>{f.q}</span>
                  <span className={styles.faqIcon} aria-hidden="true">
                    <Icon name="arrow" size={18} />
                  </span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
