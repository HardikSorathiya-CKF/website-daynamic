import bannerImage from '../../assets/images/home/banner1.webp';

export default function Bannerh() {
  return (
    <section className="bannerh-section my-4" aria-labelledby="bannerh-title">
      <img
        className="bannerh-image"
        src={bannerImage}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="bannerh-overlay" aria-hidden="true" />

      <div className="container bannerh-content">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-9">
            <h2 id="bannerh-title" className="bannerh-title text-white fw-bold mb-0">
              We Build Software
              <br />
              That Helps Businesses
              <br />
              Grow Faster
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
