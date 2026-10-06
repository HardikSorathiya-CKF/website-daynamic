import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IconChevronDown } from './icons/Icons';
import { servicesList } from '../data/servicesData';
import './Navbar.css';

const BROCHURE_URL = '/brochure.pdf';

const MOBILE_MENU_ID = 'mobileMenu';

const navItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

function isServicesActive(pathname) {
  return (
    pathname === '/services' ||
    pathname.startsWith('/services/') ||
    pathname.startsWith('/technology/')
  );
}

function DesktopNavLink({ item }) {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={item.to} end={item.end}>
        {item.label}
      </NavLink>
    </li>
  );
}

function ServicesDropdown({ pathname }) {
  const active = isServicesActive(pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <li
      className={`nav-item nav-item-dropdown${open ? ' is-open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        className={`nav-link nav-link-dropdown${active ? ' active' : ''}`}
        to="/services"
        aria-current={active ? 'page' : undefined}
        onClick={() => setOpen(false)}
      >
        Services
        <IconChevronDown className="nav-dropdown-chevron" aria-hidden="true" />
      </NavLink>

      <div className="nav-dropdown" role="menu" aria-label="Services">
        <div className="nav-dropdown-panel">
          <p className="nav-dropdown-heading">Our Services</p>
          <ul className="nav-dropdown-list">
            {servicesList.map((service) => (
              <li key={service.id}>
                <Link
                  className={`nav-dropdown-link${pathname === service.link ? ' active' : ''}`}
                  to={service.link}
                  role="menuitem"
                  aria-current={pathname === service.link ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="nav-dropdown-link-title">{service.title}</span>
                  <span className="nav-dropdown-link-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className={`nav-dropdown-footer${pathname === '/services' ? ' active' : ''}`}
            to="/services"
            role="menuitem"
            aria-current={pathname === '/services' ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            View All Services
          </Link>
        </div>
      </div>
    </li>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileOpen]);

  return (
    <nav className="navbar navbar-expand-lg main-header">
      <div className="container site-container">
        <div className="nav-layout">
          <Link className="navbar-brand logo-text" to="/">
            <img className="logo img-fluid" src="/logo.webp" alt="CloudKodeForm" />
          </Link>

          <button
            className="navbar-toggler mobile-menu-toggle d-lg-none"
            type="button"
            aria-controls={MOBILE_MENU_ID}
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <span className="hamburger-icon" aria-hidden="true">
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </span>
          </button>

          <div className="menu-wrapper d-none d-lg-flex">
            <ul className="navbar-nav main-menu">
              <DesktopNavLink item={{ label: 'Home', to: '/', end: true }} />
              <ServicesDropdown pathname={pathname} />
              {navItems.slice(1).map((item) => (
                <DesktopNavLink key={item.to} item={item} />
              ))}
            </ul>

            <div className="header-btn">
              <a
                href={BROCHURE_URL}
                className="theme-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Brochure
              </a>
            </div>
          </div>

          {mobileOpen && (
            <div
              className="offcanvas-backdrop fade show"
              onClick={closeMobile}
              aria-hidden="true"
            />
          )}

          <div
            className={`offcanvas offcanvas-start mobile-menu d-lg-none${mobileOpen ? ' show' : ''}`}
            tabIndex="-1"
            id={MOBILE_MENU_ID}
            aria-labelledby="mobileMenuBrand"
            aria-hidden={!mobileOpen}
          >
            <div className="offcanvas-header">
              <Link
                to="/"
                className="offcanvas-brand"
                id="mobileMenuBrand"
                aria-label="CloudKodeForm home"
                onClick={closeMobile}
              >
                <img className="offcanvas-logo img-fluid" src="/logo.webp" alt="CloudKodeForm" />
              </Link>
              <button
                type="button"
                className="btn-close mobile-menu-close"
                aria-label="Close"
                onClick={closeMobile}
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav main-menu-mobile">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/"
                    end
                    onClick={closeMobile}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item mobile-services-item">
                  <button
                    type="button"
                    className={`nav-link mobile-services-toggle${isServicesActive(pathname) ? ' active' : ''}`}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-list"
                    onClick={() => setMobileServicesOpen((open) => !open)}
                  >
                    <span className="mobile-services-label">Services</span>
                    <IconChevronDown
                      className={`nav-dropdown-chevron mobile-services-chevron${mobileServicesOpen ? ' is-open' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <ul
                    id="mobile-services-list"
                    className={`mobile-services-list${mobileServicesOpen ? ' is-open' : ''}`}
                  >
                    {servicesList.map((service) => {
                      const isActive = pathname === service.link;

                      return (
                        <li key={service.id}>
                          <Link
                            className={`mobile-services-link${isActive ? ' active' : ''}`}
                            to={service.link}
                            aria-current={isActive ? 'page' : undefined}
                            onClick={closeMobile}
                          >
                            {service.title}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link
                        className={`mobile-services-link mobile-services-link-all${pathname === '/services' ? ' active' : ''}`}
                        to="/services"
                        aria-current={pathname === '/services' ? 'page' : undefined}
                        onClick={closeMobile}
                      >
                        View All Services
                      </Link>
                    </li>
                  </ul>
                </li>

                {navItems.slice(1).map((item) => (
                  <li className="nav-item" key={item.to}>
                    <NavLink
                      className="nav-link"
                      to={item.to}
                      end={item.end}
                      onClick={closeMobile}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="header-btn">
                <a
                  href={BROCHURE_URL}
                  className="theme-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                >
                  Download Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
