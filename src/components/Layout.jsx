import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import useReveal from '../hooks/useReveal.js';

export default function Layout() {
  const { pathname } = useLocation();
  // Re-scan for reveal elements whenever the route changes.
  useReveal([pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
