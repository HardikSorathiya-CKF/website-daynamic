import { IconCode, serviceFeatureIcons } from '../icons/Icons';
import { getServiceFeatures } from '../../data/serviceFeatureData';
import '../../assets/css/Service.css';

export default function ServiceFeatures({ slug }) {
  const features = getServiceFeatures(slug);

  if (!features.length) {
    return null;
  }

  return (
    <section className="service-features-section" aria-labelledby={`${slug}-features-title`}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">Features</span>
          <h2 id={`${slug}-features-title`} className="section-title mt-2">
            Key Service Features
          </h2>
          <div className="title-line mx-auto" aria-hidden="true" />
        </div>

        <div className="row g-4">
          {features.map((item) => {
            const Icon = serviceFeatureIcons[item.icon] ?? IconCode;

            return (
              <div key={item.title} className="col-xl-4 col-lg-6 col-md-6">
                <div className="card service-feature-card h-100 border-0 text-center">
                  <div className="card-body">
                    <div className="service-feature-icon">
                      <Icon className="service-feature-icon-svg" aria-hidden="true" />
                    </div>
                    <h3 className="service-feature-title">{item.title}</h3>
                    <p className="service-feature-text mb-0">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
