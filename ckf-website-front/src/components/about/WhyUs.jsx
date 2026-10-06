import { Link } from 'react-router-dom';
import whyUsImage from '../../assets/images/common/about12.webp';
import '../../assets/css/About.css';

export default function WhyUs() {
  return (
    <section className="about-why-section" aria-labelledby="about-why-title">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">

        <div className="col-lg-6">
            <div className="about-why-image">
              <img
                src={whyUsImage}
                alt="CloudKodeForm team consultation"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="col-lg-6">
            <h2 id="about-why-title" className="about-why-title">
              Why Work With Us
            </h2>
            <p className="about-why-text">
              We combine technical expertise with a practical, business-first
              approach. From strategy to delivery, our team builds solutions that
              are scalable, reliable, and aligned with your goals.
            </p>
            <Link to="/contact" className="theme-btn">
              Connect With Us
            </Link>
          </div>

          
        </div>
      </div>
    </section>
  );
}
