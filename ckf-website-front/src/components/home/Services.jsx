import { Link } from 'react-router-dom';
import Image1 from '../../assets/images/services/webdevelopmentservice.webp';
import Image2 from '../../assets/images/services/aiservice.webp';
import Image3 from '../../assets/images/services/cloudservice.webp';
import Image4 from '../../assets/images/services/appdevelopmentservice.webp';

const services = [
  {
    id: 1,
    image: Image1,
    title: 'Web Development',
    description:
      'Custom websites and web applications built with modern frameworks for performance, scalability, and great user experience.',
    link: '/services/web-development',
  },
  {
    id: 2,
    image: Image2,
    title: 'Artificial Intelligence',
    description:
      'Intelligent automation and data-driven solutions that help businesses work smarter and make better decisions.',
    link: '/technology/aiml',
  },
  {
    id: 3,
    image: Image3,
    title: 'Cloud Services',
    description:
      'Secure cloud infrastructure, deployment pipelines, and DevOps practices designed for reliability and growth.',
    link: '/services/cloudservice',
  },
  {
    id: 4,
    image: Image4,
    title: 'Application Development',
    description:
      'End-to-end mobile and enterprise application development tailored to your business workflows and goals.',
    link: '/services/application-development',
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section" aria-labelledby="services-title">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">Our Services</span>
          <h2 id="services-title" className="section-title mt-2">
            Solutions That Drive Your Business Forward
          </h2>
          <div className="title-line mx-auto" aria-hidden="true" />
        </div>

        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className="col-xl-3 col-lg-6 col-md-6">
              <article className="service-card">
                <div className="service-card-image">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={260}
                  />
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-text">{service.description}</p>
                  <Link to={service.link} className="service-card-btn">
                    View More
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="text-center services-view-all-wrap">
          <Link to="/services" className="theme-btn">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
