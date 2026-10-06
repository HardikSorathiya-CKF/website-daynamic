import { RichText } from '../comman/RichText';
import { useBootstrap } from '../../utils/useBootstrap';
import '../../assets/css/Service.css';

export default function CaseStudyFaq({ slug, faqs }) {
  useBootstrap();
  if (!faqs?.length) {
    return null;
  }

  const accordionId = `case-study-faq-${slug}`;

  return (
    <section className="service-faq-section" aria-labelledby={`${accordionId}-title`}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">FAQs</span>
          <h2 id={`${accordionId}-title`} className="section-title mt-2">
            Frequently Asked Questions
          </h2>
          <div className="title-line mx-auto" aria-hidden="true" />
        </div>

        <div className="accordion service-faq-accordion mx-auto" id={accordionId}>
          {faqs.map((faq, index) => {
            const itemId = `${accordionId}-item-${index}`;

            return (
              <div key={faq.question} className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className={`accordion-button${index ? ' collapsed' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${itemId}`}
                    aria-expanded={!index}
                    aria-controls={itemId}
                  >
                    {faq.question}
                  </button>
                </h3>
                <div
                  id={itemId}
                  className={`accordion-collapse collapse${index ? '' : ' show'}`}
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className="accordion-body">
                    <RichText content={faq.answer} />
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
