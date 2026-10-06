import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const cache = new Map();

function request(key, url, pick) {
  if (!cache.has(key)) {
    cache.set(
      key,
      fetch(url)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => pick(data))
        .catch(() => pick(null)),
    );
  }
  return cache.get(key);
}

export function getCaseStudies() {
  return request(
    'list',
    `${API_URL}/casestudy/list`,
    (data) => data?.caseStudies || [],
  );
}

export function getCaseStudy(slug) {
  if (!slug) return Promise.resolve(null);
  return request(
    `slug:${slug}`,
    `${API_URL}/casestudy/slug/${slug}`,
    (data) => data?.caseStudy || null,
  );
}

export function useCaseStudies() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let live = true;
    getCaseStudies().then((data) => {
      if (live) setList(data);
    });
    return () => {
      live = false;
    };
  }, []);

  return list;
}

export function useCaseStudy(slug) {
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(Boolean(slug));

  useEffect(() => {
    if (!slug) {
      setStudy(null);
      setLoading(false);
      return undefined;
    }

    setStudy(null);
    setLoading(true);
    let live = true;

    getCaseStudy(slug).then((data) => {
      if (!live) return;
      setStudy(data);
      setLoading(false);
    });

    return () => {
      live = false;
    };
  }, [slug]);

  return { study, loading };
}
