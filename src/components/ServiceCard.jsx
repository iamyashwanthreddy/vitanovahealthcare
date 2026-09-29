import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import pastel from '../data/pastel.js';
import styles from './ServiceCard.module.css';

const iconFor = {
  '24-hour-care': 'clock',
  'home-services': 'home',
  'general-care': 'heart',
  'care-support': 'hands',
  homelessness: 'shield',
};

export default function ServiceCard({ service, index = 0 }) {
  const { bg, ink } = pastel(service.pastel);
  return (
    <Link
      to={`/services/${service.slug}`}
      className={`${styles.card} reveal`}
      style={{
        background: bg,
        color: ink,
        transitionDelay: `${Math.min(index, 5) * 70}ms`,
      }}
    >
      <span className={styles.iconWrap} style={{ color: ink }}>
        <Icon name={iconFor[service.slug] || 'heart'} size={26} />
      </span>
      <h3 className={styles.title} style={{ color: ink }}>
        {service.title}
      </h3>
      <p className={styles.summary}>{service.summary}</p>
      <span className={styles.more}>
        Learn more
        <Icon name="arrow" size={18} />
      </span>
    </Link>
  );
}
