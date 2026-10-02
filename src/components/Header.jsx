import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Button from './Button.jsx';
import { nav, brand } from '../data/site.js';
import styles from './Header.module.css';

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false); // mobile drawer
  const [servicesOpen, setServicesOpen] = useState(false); // mobile submenu
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const drawerRef = useRef(null);

  // close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // subtle elevation cue on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close drawer on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.brand} aria-label={`${brand.name} — home`}>
          <img
            src="/logo.png"
            alt={`${brand.name} logo`}
            className={styles.logo}
            width="200"
            height="96"
          />
        </Link>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {nav.map((item) =>
              item.children ? (
                <li key={item.to} className={styles.hasMenu}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.active : ''}`
                    }
                  >
                    {item.label}
                    <span className={styles.chev}>
                      <Chevron />
                    </span>
                  </NavLink>
                  <div className={styles.dropdown} role="menu">
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) =>
                              `${styles.dropLink} ${isActive ? styles.active : ''}`
                            }
                            role="menuitem"
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.active : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button to="/careers" variant="nav" className={styles.navCta}>
            Apply Here
          </Button>
          <button
            className={styles.burger}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.burgerBox} ${open ? styles.burgerOpen : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`${styles.scrim} ${open ? styles.scrimOpen : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-drawer"
        ref={drawerRef}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className={styles.mobileList}>
            {nav.map((item) =>
              item.children ? (
                <li key={item.to}>
                  <div className={styles.mobileRow}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `${styles.mobileLink} ${isActive ? styles.active : ''}`
                      }
                    >
                      {item.label}
                    </NavLink>
                    <button
                      className={`${styles.mobileToggle} ${
                        servicesOpen ? styles.mobileToggleOpen : ''
                      }`}
                      aria-label="Toggle services submenu"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((v) => !v)}
                    >
                      <Chevron />
                    </button>
                  </div>
                  {servicesOpen && (
                    <ul className={styles.mobileSub}>
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) =>
                              `${styles.mobileSubLink} ${
                                isActive ? styles.active : ''
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `${styles.mobileLink} ${isActive ? styles.active : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
        <Button to="/careers" variant="coral" className={styles.mobileCta}>
          Apply Here
        </Button>
      </aside>
    </header>
  );
}
