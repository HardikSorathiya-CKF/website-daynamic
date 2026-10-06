import {
  IconCloud,
  IconCode,
  IconHandshake,
  IconRobot,
} from '../icons/Icons';

const features = [
  {
    Icon: IconRobot,
    title: 'AI-Powered Innovation',
    description:
      'Transform ideas into intelligent digital products using AI, automation, and modern technologies.',
  },
  {
    Icon: IconCode,
    title: 'Custom Development',
    description:
      'Tailored web, mobile, and enterprise solutions designed specifically for your business needs.',
  },
  {
    Icon: IconCloud,
    title: 'Cloud & DevOps',
    description:
      'Scalable cloud infrastructure, deployment automation, and secure hosting solutions.',
  },
  {
    Icon: IconHandshake,
    title: 'Dedicated Support',
    description:
      'Long-term technical support and maintenance to ensure smooth business operations.',
  },
];

export default function About() {
  return (
    <section className="why-choose-section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">WHY CLOUDKODEFORM</span>

          <h2 className="section-title mt-2">Why Businesses Choose Us</h2>

          <div className="title-line mx-auto" />
        </div>

        <div className="row g-4">
          {features.map((item) => (
            <div className="col-xl-3 col-lg-6 col-md-6" key={item.title}>
              <div className="feature-card text-center">
                <div className="feature-icon">
                  <item.Icon className="feature-icon-svg" aria-hidden="true" />
                </div>

                <h4>{item.title}</h4>

                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
