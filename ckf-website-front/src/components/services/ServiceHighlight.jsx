import { Link } from 'react-router-dom';
import { getServiceHighlight } from '../../data/serviceHighlightData';
import '../../assets/css/Service.css';

export default function ServiceHighlight({ slug }) {
  const highlight = getServiceHighlight(slug);

  if (!highlight) {
    return null;
  }

  const { title, description, steps, points, closing, image, ctaText = 'Start With Us' } = highlight;

  return (
    <section className="service-highlight-section" aria-labelledby={`${slug}-highlight-title`}>
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-6">
            <div className="service-block-image">
              <img src={image} alt={title} loading="lazy" />
            </div>
          </div>

          <div className="col-lg-6">
            <h2 id={`${slug}-highlight-title`} className="service-detail-title">
              {title}
            </h2>
            <div className="service-block-line" aria-hidden="true" />
            <p className="service-detail-text">{description}</p>

            {steps?.length > 0 && (
              <ul className="service-highlight-steps">
                {steps.map((step) => (
                  <li key={step.title}>
                    <strong>{step.title}</strong>
                    <span> – {step.text}</span>
                  </li>
                ))}
              </ul>
            )}

            {points?.length > 0 && (
              <ul className="service-highlight-steps">
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}

            {closing && <p className="service-detail-text">{closing}</p>}

            <Link to="/contact" className="theme-btn">
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
