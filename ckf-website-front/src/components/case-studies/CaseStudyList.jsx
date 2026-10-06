import { Link } from 'react-router-dom';
import { useCaseStudies } from '../../api/caseStudy';
import '../../assets/css/Service.css';

export default function CaseStudyList() {
  const studies = useCaseStudies();

  return (
    <section className="services-page-grid" aria-label="Case studies">
      <div className="container">
        <div className="row g-4">
          {studies.map((study) => (
            <div key={study.slug} className="col-xl-4 col-lg-4 col-md-6">
              <article className="service-card">
                {study.featureImage ? (
                  <div className="service-card-image">
                    <img src={study.featureImage} alt={study.title} loading="lazy" />
                  </div>
                ) : null}
                <div className="service-card-body">
                  <h2 className="service-card-title">{study.title}</h2>
                  {study.expertContent ? (
                    <p className="service-card-text">{study.expertContent}</p>
                  ) : null}
                  <Link to={`/case-studies/${study.slug}`} className="service-card-btn">
                    View Case Study
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
