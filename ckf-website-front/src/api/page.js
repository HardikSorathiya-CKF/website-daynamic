import { useEffect, useState } from 'react';
import { useCaseStudy } from './caseStudy';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const cache = new Map();

const PATH_SLUGS = {
  '/': 'home',
  '/about': 'about-us',
};

export function slugFromPath(pathname) {
  if (PATH_SLUGS[pathname]) return PATH_SLUGS[pathname];
  const parts = String(pathname || '').split('/').filter(Boolean);
  return parts[parts.length - 1] || 'home';
}

export function caseStudySlugFromPath(pathname) {
  const match = String(pathname || '').match(/^\/case-studies\/([^/]+)$/);
  return match?.[1] || '';
}

export function serviceSlugFromPath(pathname) {
  const path = String(pathname || '');
  if (path === '/services' || path.startsWith('/services/') || path === '/technology/aiml') {
    return slugFromPath(path);
  }
  return '';
}

export function getPage(slug) {
  if (!slug) return Promise.resolve(null);

  if (!cache.has(slug)) {
    cache.set(
      slug,
      fetch(`${API_URL}/page/slug/${slug}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => data?.page || null)
        .catch(() => null),
    );
  }

  return cache.get(slug);
}

export function usePage(slug) {
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (!slug) {
      setPage(null);
      return undefined;
    }

    setPage(null);
    let live = true;

    getPage(slug).then((data) => {
      if (live) setPage(data);
    });

    return () => {
      live = false;
    };
  }, [slug]);

  return page;
}

function useService(slug) {
  const [service, setService] = useState(null);

  useEffect(() => {
    if (!slug) {
      setService(null);
      return undefined;
    }

    setService(null);
    let live = true;
    const key = `service:${slug}`;

    if (!cache.has(key)) {
      cache.set(
        key,
        fetch(`${API_URL}/service/slug/${slug}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => data?.service || null)
          .catch(() => null),
      );
    }

    cache.get(key).then((data) => {
      if (live) setService(data);
    });

    return () => {
      live = false;
    };
  }, [slug]);

  return service;
}

export function useRouteContent(pathname) {
  const studySlug = caseStudySlugFromPath(pathname);
  const serviceSlug = studySlug ? '' : serviceSlugFromPath(pathname);
  const page = usePage(studySlug || serviceSlug ? '' : slugFromPath(pathname));
  const service = useService(serviceSlug);
  const { study } = useCaseStudy(studySlug);

  if (studySlug) return study;
  if (serviceSlug) return service;
  return page;
}
