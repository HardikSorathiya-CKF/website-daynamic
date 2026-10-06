const whoWeAreImage = '/images/home/about.webp';

export default function WhoWeAre() {
  return (
    <section className="who-we-are-section" aria-labelledby="who-we-are-title">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-6">
            <div className="who-we-are-image">
              <img
                src={whoWeAreImage}
                alt="CloudKodeForm team collaborating on digital solutions"
                width={800}
                height={600}
                decoding="async"
                fetchPriority="high"
                loading="eager"
              />
            </div>
          </div>

          <div className="col-lg-6">
            <span className="section-subtitle">Who We Are</span>
            <h2 id="who-we-are-title" className="section-title mt-2">
              Building Smart Digital Solutions for Growing Businesses
            </h2>
            <div className="title-line" aria-hidden="true" />
            <p className="who-we-are-description mt-4 mb-0">
              CloudKodeForm is a technology partner focused on helping businesses
              transform with AI, custom software, and cloud engineering. We combine
              technical expertise with a practical approach to deliver solutions that
              improve efficiency, scalability, and long-term growth.
            </p>
            <p className="who-we-are-description mb-0">
              From startups to enterprises, our team works closely with clients to
              understand their goals and build reliable digital products that create
              real business value.
            </p>
            <a className="theme-btn mt-3" href="/about">
              <span>Read More</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
