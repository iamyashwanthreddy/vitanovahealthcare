import PageHero from '../components/PageHero.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import Icon from '../components/Icon.jsx';
import useDocumentMeta from '../hooks/useDocumentMeta.js';
import { contact, brand } from '../data/site.js';
import styles from './Contact.module.css';

export default function Contact() {
  useDocumentMeta({
    title: 'Contact Us',
    description:
      'Get in touch with Vitanova Health Care in Balbriggan, Co. Dublin. Call, email or send us a message and our team will be in touch.',
    path: '/contact',
  });

  const mapQuery = encodeURIComponent(contact.addressInline);

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We'd love to hear from you"
        intro={`${brand.tagline}. Reach out about care for a loved one, joining our team, or any question at all — we're here to help.`}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact', to: '/contact' },
        ]}
      />

      <section className="section">
        <div className={`container ${styles.grid}`}>
          {/* Details */}
          <div className={styles.details}>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>
                <Icon name="pin" size={22} />
              </span>
              <div>
                <h3>Our location</h3>
                <address className={styles.address}>
                  {contact.addressLines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
                <p className={styles.region}>{contact.region}</p>
              </div>
            </div>

            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>
                <Icon name="phone" size={22} />
              </span>
              <div>
                <h3>Call us</h3>
                <ul className={styles.contactList}>
                  {contact.phones.map((p) => (
                    <li key={p.number}>
                      <a href={p.href}>{p.number}</a>
                      <span className={styles.meta}>{p.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>
                <Icon name="mail" size={22} />
              </span>
              <div>
                <h3>Email us</h3>
                <a className={styles.email} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
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
            </div>
          </div>

          {/* Form */}
          <div className={styles.formCard}>
            <EnquiryForm heading="Send us a message" defaultSubject="" />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section--tight">
        <div className="container">
          <div className={styles.mapWrap}>
            <iframe
              title={`Map showing ${brand.name} in Balbriggan, Co. Dublin`}
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=-6.22%2C53.58%2C-6.14%2C53.63&layer=mapnik&marker=53.6067%2C-6.1811`}
            />
            <a
              className={styles.mapLink}
              href={`https://www.openstreetmap.org/search?query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="compass" size={18} />
              Open in maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
