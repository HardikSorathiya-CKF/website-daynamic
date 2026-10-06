import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'What services does CloudKodeForm provide?',
    answer:
      'We offer AI/ML solutions, custom web and application development, cloud engineering, DevOps, enterprise software, and ongoing support tailored to your business goals.',
  },
  {
    id: 2,
    question: 'How long does a typical project take?',
    answer:
      'Project timelines depend on scope and complexity. Smaller websites may take a few weeks, while larger enterprise platforms can take several months. We share a clear timeline after discovery.',
  },
  {
    id: 3,
    question: 'Do you work with startups and enterprises?',
    answer:
      'Yes. We partner with startups, growing businesses, and enterprises. Our team adapts the process, technology stack, and delivery plan based on your size and requirements.',
  },
  {
    id: 4,
    question: 'Can you help migrate our existing system to the cloud?',
    answer:
      'Absolutely. We plan and execute cloud migrations with minimal downtime, including infrastructure setup, security, monitoring, and post-migration optimization.',
  },
  {
    id: 5,
    question: 'Do you provide support after project delivery?',
    answer:
      'Yes. We offer maintenance, performance monitoring, feature updates, and dedicated support packages so your product stays secure, stable, and up to date.',
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">FAQs</span>
          <h2 id="faq-title" className="section-title mt-2">
            Frequently Asked Questions
          </h2>
          <div className="title-line mx-auto" aria-hidden="true" />
        </div>

        <div className="faq-accordion mx-auto">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  className="faq-answer-wrap"
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer mb-0">{faq.answer}</p>
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
