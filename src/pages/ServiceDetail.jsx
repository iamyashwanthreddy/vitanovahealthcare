import { useParams, Link, Navigate } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import CheckList from '../components/CheckList.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import useDocumentMeta from '../hooks/useDocumentMeta.js';
import { services } from '../data/site.js';
import pastel from '../data/pastel.js';
import styles from './ServiceDetail.module.css';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  useDocumentMeta({
    title: service ? service.title : 'Service not found',
    description: service ? service.summary : undefined,
    path: `/services/${slug}`,
  });

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const others = services.filter((s) => s.slug !== slug);
  const tone = pastel(service.pastel);

  return (
    <>
      <PageHero
        eyebrow={service.kicker || 'Service'}
        title={service.title}
        intro={service.intro}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            {service.sections.map((section) => (
              <div key={section.heading} className={`${styles.block} reveal`}>
                <h2 className={styles.blockTitle}>{section.heading}</h2>
                {section.type === 'list' && (
                  <CheckList
                    items={section.items}
                    columns={section.items.length > 4 ? 2 : 1}
                  />
                )}
                {section.type === 'text' &&
                  section.body.map((para) => (
                    <p key={para} className={styles.para}>
                      {para}
                    </p>
                  ))}
              </div>
            ))}

            <div
              className={`${styles.callout} reveal`}
              style={{ background: tone.bg, color: tone.ink }}
            >
              <div>
                <h3 style={{ color: tone.ink }}>Schedule online</h3>
                <p>It&rsquo;s easy, fast and secure. Apply today and we&rsquo;ll be in touch.</p>
              </div>
              <Link to="/application" className={styles.calloutBtn}>
                Apply Here
                <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>

          <aside className={styles.side}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Other services</h3>
              <ul className={styles.sideList}>
                {others.map((o) => {
                  const t = pastel(o.pastel);
                  return (
                    <li key={o.slug}>
                      <Link to={`/services/${o.slug}`} className={styles.sideLink}>
                        <span className={styles.sideDot} style={{ background: t.bg }} />
                        <span>{o.title}</span>
                        <Icon name="arrow" size={16} className={styles.sideArrow} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.helpCard}>
              <span className={styles.helpIcon}>
                <Icon name="phone" size={22} />
              </span>
              <h3>Talk to our team</h3>
              <p>
                Not sure which service fits? We&rsquo;ll help you find the right
                support.
              </p>
              <Link to="/contact" className={styles.helpLink}>
                Contact us
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
