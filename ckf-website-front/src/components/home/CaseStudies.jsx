import { Link } from 'react-router-dom';
import { useCaseStudies } from '../../api/caseStudy';

export default function CaseStudies() {
  const studies = useCaseStudies().slice(0, 3);

  return (
    <section id="case-studies" className="blog-section py-5" aria-labelledby="case-studies-title">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">Case Studies</span>
          <h2 id="case-studies-title" className="section-title mt-2">
            Real Projects, Practical Insights
          </h2>
          <div className="title-line mx-auto" aria-hidden="true" />
        </div>

        <div className="row g-4">
          {studies.map((study) => (
            <div key={study.slug} className="col-lg-4 col-md-6">
              <article className="blog-card">
                {study.featureImage ? (
                  <div className="blog-card-image">
                    <img src={study.featureImage} alt={study.title} loading="lazy" />
                  </div>
                ) : null}
                <div className="blog-card-body">
                  <h3 className="blog-card-title">{study.title}</h3>
                  {study.expertContent ? (
                    <p className="blog-card-text">{study.expertContent}</p>
                  ) : null}
                  <Link to={`/case-studies/${study.slug}`} className="blog-card-btn">
                    Read Case Study
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="text-center services-view-all-wrap">
          <Link to="/case-studies" className="theme-btn">
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
