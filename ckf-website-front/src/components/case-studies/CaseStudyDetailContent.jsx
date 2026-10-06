import { useEffect, useRef } from 'react';
import '../../assets/css/Service.css';
import '../../assets/css/case-study-layout.css';

const TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

function getLayout(description) {
  if (!description) return { html: '', css: '', theme: null };

  try {
    const data = JSON.parse(description);
    if (data && typeof data === 'object' && data.html != null) {
      return { html: data.html || '', css: data.css || '', theme: data.theme || null };
    }
  } catch {
    // plain HTML
  }

  return { html: description, css: '', theme: null };
}

function themeToCss(theme) {
  const font = theme?.fontFamily || "Nunito, 'Segoe UI', Arial, sans-serif";
  const colors = theme?.colors || {};
  const typography = theme?.typography || {};

  const typeCss = TAGS.map((tag) => {
    const style = typography[tag] || {};
    return `.case-study-layout ${tag} {
  font-family: ${style.fontFamily || 'var(--ckf-font)'};
  font-size: ${style.fontSize || (tag === 'p' ? '16px' : '22px')};
  font-weight: ${style.fontWeight || (tag === 'p' ? '400' : '700')};
  line-height: ${style.lineHeight || '1.5'};
}`;
  }).join('\n');

  return `.case-study-layout {
  --ckf-font: ${font};
  --ckf-color-primary: ${colors.primary || '#062d67'};
  --ckf-color-secondary: ${colors.secondary || '#f58020'};
  --ckf-color-text: ${colors.text || '#575757'};
  --ckf-color-background: ${colors.background || '#ffffff'};
  font-family: var(--ckf-font);
  color: var(--ckf-color-text);
  background: var(--ckf-color-background);
}
${typeCss}`;
}

function scopeSavedCss(css) {
  return String(css || '')
    .replace(/\/\*ckf-theme-start\*\/[\s\S]*?\/\*ckf-theme-end\*\//g, '')
    .replace(/\bhtml\s*,\s*body\b/g, '.case-study-layout')
    .replace(/(^|})\s*:root\s*\{/g, '$1.case-study-layout{')
    .trim();
}

export default function CaseStudyDetailContent({ study }) {
  const { html, css, theme } = getLayout(study.description);
  const layoutCss = `${themeToCss(theme)}\n${scopeSavedCss(css)}`.trim();
  const layoutRef = useRef(null);

  useEffect(() => {
    const root = layoutRef.current;
    if (!root) return undefined;

    const setItemOpen = (item, open) => {
      const body = item.querySelector(':scope > .ckf-accordion-body');
      item.classList.toggle('is-open', open);
      if (!body) return;
      body.style.maxHeight = open ? `${body.scrollHeight}px` : '0px';
    };

    root.querySelectorAll('.ckf-accordion').forEach((accordion) => {
      accordion.querySelectorAll(':scope > .ckf-accordion-item').forEach((item, index) => {
        setItemOpen(item, index === 0);
      });
    });

    const onClick = (event) => {
      const title = event.target.closest('.ckf-accordion-title');
      if (!title || !root.contains(title)) return;

      const item = title.closest('.ckf-accordion-item');
      const accordion = title.closest('.ckf-accordion');
      if (!item || !accordion) return;

      const shouldOpen = !item.classList.contains('is-open');
      accordion.querySelectorAll(':scope > .ckf-accordion-item').forEach((entry) => {
        setItemOpen(entry, shouldOpen && entry === item);
      });
    };

    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [html]);

  if (html) {
    return (
      <section className="case-study-layout" aria-label={study.title} ref={layoutRef}>
        {layoutCss ? <style>{layoutCss}</style> : null}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    );
  }

  return (
    <section className="service-detail-section" aria-labelledby="case-study-title">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-6">
            <h2 id="case-study-title" className="service-detail-title">
              {study.subtitle || study.title}
            </h2>
            <div className="service-block-line" aria-hidden="true" />
            {study.expertContent ? (
              <p className="service-detail-text">{study.expertContent}</p>
            ) : null}
          </div>
          {study.featureImage ? (
            <div className="col-lg-6">
              <div className="service-block-image">
                <img src={study.featureImage} alt={study.title} loading="lazy" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
