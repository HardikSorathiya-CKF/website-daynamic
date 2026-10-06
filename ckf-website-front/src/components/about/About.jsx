import '../../assets/css/About.css';

export default function About() {
  return (
    <section className="about-intro-section" aria-labelledby="about-intro-title">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-start">
          <div className="col-lg-5">
            <h2 id="about-intro-title" className="about-intro-title">
              Taking a smart, tailored approach to digital growth.
            </h2>
          </div>

          <div className="col-lg-7">
            <p className="about-intro-lead">
              We help businesses build scalable solutions, work smarter, and grow
              with confidence.
            </p>
            <p className="about-intro-text mb-0">
              CloudKodeForm is a technology partner focused on AI, custom software,
              and cloud engineering. We work closely with teams to understand their
              goals, solve real challenges, and deliver digital products that create
              long-term business value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
