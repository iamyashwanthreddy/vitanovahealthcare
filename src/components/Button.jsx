import { Link } from 'react-router-dom';
import styles from './Button.module.css';

/**
 * Button / link that renders in one of the DESIGN.md button styles.
 * variant: 'coral' (primary filled) | 'ghost' | 'ghost-dark' | 'nav'
 * Renders a react-router <Link> for `to`, an <a> for `href`, else a <button>.
 */
export default function Button({
  children,
  variant = 'coral',
  to,
  href,
  onClick,
  type,
  className = '',
  ...rest
}) {
  const cls = `${styles.btn} ${styles[variant] || ''} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type || 'button'} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
