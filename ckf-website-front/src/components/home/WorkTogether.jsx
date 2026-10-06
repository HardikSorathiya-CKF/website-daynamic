import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ctaImage from '../../assets/images/home/what.webp';

const rotatingWords = ['work', 'build'];

export default function WorkTogether() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="work-together-section parallax-bg"
      style={{ backgroundImage: `url(${ctaImage})` }}
      aria-labelledby="work-together-title"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <h2 id="work-together-title" className="work-together-title mb-0">
              Ready to{' '}<br/>
              <span className="work-together-rotate" aria-live="polite">
                <span key={rotatingWords[wordIndex]} className="work-together-word">
                  {rotatingWords[wordIndex]}
                </span>
              </span>{' '}
              together?
            </h2>
            <div className="work-together-actions mt-3">
              <Link to="/contact" className="theme-btn">
                Build a Project With Us
              </Link>
              {/* <Link to="/careers" className="theme-btn">
                Build a Career With Us
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
