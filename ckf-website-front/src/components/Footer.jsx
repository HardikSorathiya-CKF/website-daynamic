import { Link } from 'react-router-dom';
import { contactDetails, socialLinks } from '../data/contactData';
import { servicesList } from '../data/servicesData';
import './Footer.css';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Contact Us', to: '/contact' },
];

const serviceMid = Math.ceil(servicesList.length / 2);
const serviceColumns = [
  servicesList.slice(0, serviceMid),
  servicesList.slice(serviceMid),
];

function ContactIcon({ type }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    viewBox: '0 0 24 24',
    className: 'footer-contact-svg',
    'aria-hidden': true,
  };

  switch (type) {
    case 'phone':
      return (
        <svg {...common}>
          <path
            d="M6.5 4.5h3l1.5 4.5-2 1.2a11 11 0 0 0 5.3 5.3l1.2-2 4.5 1.5v3c0 .8-.7 1.5-1.5 1.5C10.2 19.5 4.5 13.8 4.5 6c0-.8.7-1.5 1.5-1.5Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'email':
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path
            d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2.2" />
        </svg>
      );
  }
}

function SocialIcon({ type }) {
  const common = { fill: 'currentColor', viewBox: '0 0 24 24', className: 'footer-social-svg', 'aria-hidden': true };

  switch (type) {
    case 'Facebook':
      return (
        <svg {...common}>
          <path d="M14 8h3V5h-3c-2.8 0-5 2.2-5 5v2H6v3h3v7h3v-7h2.6l.4-3H12V9c0-.6.4-1 1-1Z" />
        </svg>
      );
    case 'Twitter':
      return (
        <svg {...common}>
          <path d="M18.2 6.5h-2.5l-4.3 5.5-4.1-5.5H4.5l6 7.9-6.3 8.1h2.5l4.7-6 4.5 6h2.8l-6.4-8.3 6.7-8.7Z" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg {...common}>
          <path d="M6.5 9.5H9v10H6.5V9.5ZM7.75 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11 9.5h2.4v1.4h.03c.34-.64 1.16-1.32 2.39-1.32 2.56 0 3.03 1.56 3.03 3.58V19.5H16.4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96v5.7H11V9.5Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 2A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 5h-9ZM12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm5.9-2.4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        </svg>
      );
  }
}

function ContactPhoneLinks({ phones, className = '' }) {
  return (
    <span className={className}>
      {phones.map((phone, index) => (
        <span key={phone.href}>
          {index > 0 && ' / '}
          <a href={phone.href} className="footer-contact-text">
            {phone.label}
          </a>
        </span>
      ))}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-container">
        <div className="row g-4 footer-main">
          <div className="col-12 col-md-6 col-lg-3 footer-col">
            <Link to="/" className="footer-brand d-inline-flex flex-column text-decoration-none mb-3">
              <img src="/logo.webp" alt="CloudKodeForm" className="footer-logo mb-2" width="140" height="46" />
            </Link>
            <p className="footer-about text-secondary mb-0">
              CloudKodeForm is an IT company delivering innovative digital solutions that help
              businesses grow and succeed.
            </p>
          </div>

          <div className="col-12 col-md-3 col-lg-2 footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="list-unstyled footer-links mb-0">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-3 col-lg-4 footer-col">
            <h3 className="footer-heading">Services</h3>
            <div className="footer-services-cols">
              {serviceColumns.map((column, index) => (
                <ul key={index} className="list-unstyled footer-links mb-0">
                  {column.map((service) => (
                    <li key={service.slug}>
                      <Link to={service.link}>{service.title}</Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 footer-col">
            <h3 className="footer-heading">Connect With Us</h3>
            
            <ul className="list-unstyled footer-contact-list mb-0">
              {contactDetails.map((item) => (
                <li key={item.id} className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <ContactIcon type={item.type} />
                  </span>
                  {item.phones?.length ? (
                    <ContactPhoneLinks phones={item.phones} className="footer-contact-text" />
                  ) : item.href ? (
                    <a href={item.href} className="footer-contact-text" target={item.type === 'address' ? '_blank' : undefined} rel={item.type === 'address' ? 'noreferrer' : undefined}>
                      {item.label}
                    </a>
                  ) : (
                    <span className="footer-contact-text">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="d-flex gap-2 footer-socials mt-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="footer-social-link"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                >
                  <SocialIcon type={item.label} />
                </a>
              ))}
            </div>
          </div>

        </div>

        <p className="footer-copy text-center mb-0">
          © 2024 CloudKodeForm, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
