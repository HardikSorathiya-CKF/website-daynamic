import { Link } from 'react-router-dom';
import { servicesList } from '../../data/servicesData';
import '../../assets/css/Service.css';

export default function ServiceList() {
  return (
    <section className="services-page-grid" aria-label="Our services">
      <div className="container">
        <div className="row g-4">
          {servicesList.map((service) => (
            <div key={service.id} className="col-xl-3 col-lg-4 col-md-6">
              <article className="service-card" id={service.slug}>
                <div className="service-card-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <div className="service-card-body">
                  <h2 className="service-card-title">{service.title}</h2>
                  <p className="service-card-text">{service.description}</p>
                  <Link to={service.link} className="service-card-btn">
                    View More
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
