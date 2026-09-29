import PageHero from '../components/PageHero.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import useDocumentMeta from '../hooks/useDocumentMeta.js';
import { services, servicesIntro } from '../data/site.js';
import styles from './Services.module.css';

const steps = [
  {
    icon: 'phone',
    title: 'Get in touch',
    body: 'Tell us about the care you or your loved one needs — there is no obligation.',
  },
  {
    icon: 'compass',
    title: 'Plan the care',
    body: 'We agree a care plan and set care calls at times that suit your daily routine.',
  },
  {
    icon: 'hands',
    title: 'Meet your carer',
    body: 'Regular carers build a relationship with you, so support feels familiar and warm.',
  },
];

export default function Services() {
  useDocumentMeta({
    title: 'Our Services',
    description:
      'From 24-hour care and home services to general care, care support and homelessness services — explore how Vitanova Health Care supports individuals, families and communities.',
    path: '/services',
  });

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Care and support, shaped around each person"
        intro={servicesIntro}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={`section-head ${styles.processHead}`}>
            <span className="eyebrow">How it works</span>
            <h2>Getting started is simple</h2>
            <p className="lead">
              Scheduling is easy, fast and secure. Here is what to expect when you
              reach out to Vitanova Health Care.
            </p>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li
                key={step.title}
                className={`${styles.step} reveal`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className={styles.stepIcon}>
                  <Icon name={step.icon} size={24} />
                </span>
                <span className={styles.stepNum}>Step {i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
