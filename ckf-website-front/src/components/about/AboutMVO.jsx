import { IconBullseye, IconEye, IconHandshake } from '../icons/Icons';
import aboutImage from '../../assets/images/common/about1.webp';
import { useBootstrap } from '../../utils/useBootstrap';
import '../../assets/css/About.css';

const tabs = [
  {
    id: 'mission',
    label: 'Mission',
    icon: <IconBullseye />,
    text: 'Empower businesses with smart, reliable technology that drives real growth.',
  },
  {
    id: 'vision',
    label: 'Vision',
    icon: <IconEye />,
    text: 'Become a trusted partner for innovation, digital transformation, and long-term success.',
  },
  {
    id: 'values',
    label: 'Our Values',
    icon: <IconHandshake />,
    text: 'Integrity, innovation, collaboration, and a strong commitment to client success.',
  },
];

export default function AboutMVO() {
  useBootstrap();

  return (
    <section className="about-mvo-section" aria-labelledby="about-mvo-title">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-6">
            <span className="about-mvo-subtitle">Our Purpose</span>
            <h2 id="about-mvo-title" className="about-mvo-title">
              What Guides Us Every Day
            </h2>
            <p className="about-mvo-description">
              CloudKodeForm is a technology partner focused on helping businesses
              transform with AI, custom software, and cloud engineering. We combine
              technical expertise with a practical approach to deliver solutions that
              improve efficiency, scalability, and long-term growth.
            </p>

            <ul className="nav nav-pills mvo-tabs" id="mvoTab" role="tablist">
              {tabs.map((tab, index) => (
                <li key={tab.id} className="nav-item" role="presentation">
                  <button
                    className={`nav-link${index === 0 ? ' active' : ''}`}
                    id={`${tab.id}-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#${tab.id}`}
                    type="button"
                    role="tab"
                    aria-controls={tab.id}
                    aria-selected={index === 0}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="tab-content mvo-tab-content" id="mvoTabContent">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`tab-pane fade${index === 0 ? ' show active' : ''}`}
                  id={tab.id}
                  role="tabpanel"
                  aria-labelledby={`${tab.id}-tab`}
                  tabIndex={0}
                >
                  <div className="mvo-tab-card">
                    <span className="mvo-tab-icon" aria-hidden="true">
                      {tab.icon}
                    </span>
                    <p className="mvo-tab-text mb-0">{tab.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="about-mvo-image">
              <img
                src={aboutImage}
                alt="CloudKodeForm team working on digital solutions"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
