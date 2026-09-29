import Icon from './Icon.jsx';
import styles from './CheckList.module.css';

/** Vertical checklist of feature items with a small brand check icon. */
export default function CheckList({ items, columns = 1, className = '' }) {
  return (
    <ul
      className={`${styles.list} ${className}`}
      style={columns > 1 ? { '--cols': columns } : undefined}
      data-cols={columns > 1 ? 'multi' : 'single'}
    >
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <span className={styles.check}>
            <Icon name="check" size={14} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
