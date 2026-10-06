import { useState } from "react";
import {
  branches,
  contactContent,
  contactDetails,
  socialLinks,
} from "../../data/contactData";
import "../../assets/css/Contact.css";

function ContactIcon({ type }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (type === "phone") {
    return (
      <svg {...common}>
        <path
          d="M6.5 4.5h3l1.5 4.5-2 1.2a11 11 0 0 0 5.3 5.3l1.2-2 4.5 1.5v3c0 .8-.7 1.5-1.5 1.5C10.2 19.5 4.5 13.8 4.5 6c0-.8.7-1.5 1.5-1.5Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg {...common}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

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

function SocialIcon({ type }) {
  const common = {
    fill: "currentColor",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  switch (type) {
    case "Facebook":
      return (
        <svg {...common}>
          <path d="M14 8h3V5h-3c-2.8 0-5 2.2-5 5v2H6v3h3v7h3v-7h2.6l.4-3H12V9c0-.6.4-1 1-1Z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg {...common}>
          <path d="M18.2 6.5h-2.5l-4.3 5.5-4.1-5.5H4.5l6 7.9-6.3 8.1h2.5l4.7-6 4.5 6h2.8l-6.4-8.3 6.7-8.7Z" />
        </svg>
      );
    case "LinkedIn":
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
          <a href={phone.href}>{phone.label}</a>
        </span>
      ))}
    </span>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section
      className="contact-section parallax-bg"
      style={{ backgroundImage: `url(${contactContent.backgroundImage})` }}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-start">
          <div className="col-lg-6">
            <p className="contact-subtitle">{contactContent.subtitle}</p>
            <h1 id="contact-title" className="contact-title">
              {contactContent.title}
            </h1>
            <p className="contact-description">{contactContent.description}</p>

            <ul className="list-unstyled contact-info-list">
              {contactDetails.map((item) => (
                <li key={item.id} className="contact-info-item">
                  <span className="contact-info-icon">
                    <ContactIcon type={item.type} />
                  </span>
                  {item.phones?.length ? (
                    <ContactPhoneLinks phones={item.phones} />
                  ) : (
                    <a
                      href={item.href}
                      target={item.type === "address" ? "_blank" : undefined}
                      rel={item.type === "address" ? "noreferrer" : undefined}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="contact-socials">
              <p className="contact-socials-label mb-2">Follow Us</p>
              <div className="d-flex gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="contact-social-link"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                  >
                    <SocialIcon type={item.label} />
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-branches">
              <h2 className="contact-branches-title">Our Offices</h2>
              <div className="row g-3">
                {branches.map((branch) => (
                  <div key={branch.id} className="col-md-6">
                    <article className="contact-branch-card">
                      <h3>{branch.name}</h3>
                      <p className="contact-branch-city mb-1">{branch.city}</p>
                      <p className="mb-2">{branch.address}</p>
                      <a href={branch.phoneHref ?? `tel:${branch.phone.replace(/\s/g, '')}`}>
                        {branch.phone}
                      </a>
                      
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="contact-form-card">
              <h2 className="contact-form-title">Drop us a line</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="contact-name" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact-phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-control"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="theme-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
