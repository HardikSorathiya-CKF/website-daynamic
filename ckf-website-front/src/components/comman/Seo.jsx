import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { caseStudySlugFromPath, slugFromPath, useRouteContent } from '../../api/page';
import { SITE_URL } from '../../data/siteRoutes';
import { getServiceFaqs } from '../../data/serviceFaqData';

const CANONICAL_LINK_ID = 'seo-canonical';
const JSON_LD_IDS = {
  organization: 'seo-jsonld-organization',
  page: 'seo-jsonld-page',
  faq: 'seo-jsonld-faq',
  breadcrumb: 'seo-jsonld-breadcrumb',
};

function upsertMeta(name, content) {
  if (!content) return;

  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href) {
  const existing = document.getElementById(CANONICAL_LINK_ID);

  if (!href) {
    existing?.remove();
    return;
  }

  let element = existing;
  if (!element) {
    element = document.createElement('link');
    element.id = CANONICAL_LINK_ID;
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  const existing = document.getElementById(id);

  if (!data) {
    existing?.remove();
    return;
  }

  let script = existing;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function buildFaqSchema(faqs) {
  if (!faqs?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function parseSchema(value) {
  if (!value) return null;
  if (typeof value === 'object') return value;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function buildCrumbs(pathname, page) {
  const crumbs = [{ name: 'Home', item: `${SITE_URL}/` }];
  if (pathname !== '/') {
    crumbs.push({
      name: page.title,
      item: `${SITE_URL}${pathname}`,
    });
  }
  return crumbs;
}

function buildBreadcrumbSchema(breadcrumbs) {
  if (!breadcrumbs?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

export default function Seo() {
  const { pathname } = useLocation();
  const slug = caseStudySlugFromPath(pathname) || slugFromPath(pathname);
  const page = useRouteContent(pathname);

  useEffect(() => {
    if (!page || page.slug !== slug) return;

    const title = page.seoTitle || page.title;
    if (title) document.title = title;
    upsertMeta('description', page.seoDescription);
    upsertMeta('keywords', page.seoKeywords);
    upsertCanonical(`${SITE_URL}${pathname === '/' ? '/' : pathname}`);

    const pageSchema = parseSchema(page.seoSchema);
    const isOrgSchema = pageSchema?.['@type'] === 'Organization';
    upsertJsonLd(JSON_LD_IDS.organization, isOrgSchema ? pageSchema : null);
    upsertJsonLd(JSON_LD_IDS.page, isOrgSchema ? null : pageSchema);
    upsertJsonLd(JSON_LD_IDS.faq, buildFaqSchema(getServiceFaqs(slug)));
    upsertJsonLd(JSON_LD_IDS.breadcrumb, buildBreadcrumbSchema(buildCrumbs(pathname, page)));
  }, [pathname, slug, page]);

  return null;
}
