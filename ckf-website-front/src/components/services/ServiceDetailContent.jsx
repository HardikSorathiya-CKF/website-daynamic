import { Link } from 'react-router-dom';
import { getServiceDetail } from '../../data/serviceDetailData';
import { getServiceContent } from '../../data/serviceContentData';
import ContentParagraph from '../comman/ContentParagraph';
import { getContentKey } from '../../utils/parseContentParagraph';
import '../../assets/css/Service.css';

function ServiceSectionText({ section }) {
  let compareIndex = 0;

  return (
    <>
      <h4 className="service-content-block-title">{section.title}</h4>
      <div className="service-block-line" aria-hidden="true" />
      <div className="service-content-body">
        {section.paragraphs?.map((paragraph, index) => {
          const isCompare = typeof paragraph === 'object' && paragraph.type === 'compare';
          const compareAnimationIndex = isCompare ? compareIndex++ : undefined;

          return (
            <ContentParagraph
              key={getContentKey(paragraph, index)}
              content={paragraph}
              compareAnimationIndex={compareAnimationIndex}
            />
          );
        })}
      </div>
    </>
  );
}

function ServiceSectionBlock({ section }) {
  const hasImage = Boolean(section.image);
  const hasParagraphs = section.paragraphs?.some(Boolean);

  if (!hasImage) {
    return <ServiceSectionText section={section} />;
  }

  if (!hasParagraphs) {
    return (
      <>
        <h4 className="service-content-block-title">{section.title}</h4>
        <div className="service-block-line" aria-hidden="true" />
        <div className="service-block-image service-block-image--full">
          <img src={section.image} alt={section.title} loading="lazy" />
        </div>
      </>
    );
  }

  const imageCol = (
    <div className="col-lg-4">
      <div className="service-block-image">
        <img src={section.image} alt={section.title} loading="lazy" />
      </div>
    </div>
  );

  const textCol = (
    <div className="col-lg-8">
      <ServiceSectionText section={section} />
    </div>
  );

  return (
    <div className="row align-items-center g-4">
      {section.imagePosition === 'right' ? (
        <>
          {textCol}
          {imageCol}
        </>
      ) : (
        <>
          {imageCol}
          {textCol}
        </>
      )}
    </div>
  );
}
export default function ServiceDetailContent({ slug }) {
  const service = getServiceDetail(slug);
  const content = getServiceContent(slug);

  if (!service) {
    return null;
  }

  const { intro, image } = service;

  return (
    <section className="service-detail-section" aria-labelledby="service-detail-title">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-6">
            <h2 id="service-detail-title" className="service-detail-title">
              {intro.title}
            </h2>
            <div className="service-block-line" aria-hidden="true" />
            <p className="service-detail-text">{intro.description}</p>
            {intro.description2 && (
              <p className="service-detail-text">{intro.description2}</p>
            )}
            {intro.points?.length > 0 && (
            <ul className="service-detail-list">
              {intro.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            )}
            {intro.footer?.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="service-detail-text">
                {paragraph}
              </p>
            ))}
            <Link to="/contact" className="theme-btn">
              Get Started
            </Link>
          </div>

          <div className="col-lg-6">
            <div className="service-block-image">
              <img src={image} alt={intro.title} loading="lazy" />
            </div>
          </div>
        </div>

        {content && (
          <div className="service-detail-body">
            {(content.heading ||
              content.intro?.length ||
              content.introPoints?.length ||
              content.introAfter?.length) && (
            <div className="service-detail-body-intro text-center">
              {content.heading && (
                <>
                  <h3 className="service-detail-body-heading">{content.heading}</h3>
                  <div className="title-line mx-auto" aria-hidden="true" />
                </>
              )}
              {content.intro?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="service-detail-text">
                  {paragraph}
                </p>
              ))}

              {content.introPoints?.length > 0 && (
                <ul className="service-detail-list service-detail-body-list">
                  {content.introPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}

              {content.introAfter?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="service-detail-text">
                  {paragraph}
                </p>
              ))}
            </div>
            )}

            <div className="row g-4">
              {content.sections.map((section) => (
                <div key={section.title} className="col-12">
                  <article className="service-content-block h-100">
                    <ServiceSectionBlock section={section} />
                  </article>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
