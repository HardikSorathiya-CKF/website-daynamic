import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const cache = new Map();

export function getService(slug) {
  if (!slug) return Promise.resolve(null);

  const key = `slug:${slug}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      fetch(`${API_URL}/service/slug/${slug}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => data?.service || null)
        .catch(() => null),
    );
  }

  return cache.get(key);
}

export function useService(slug) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(Boolean(slug));

  useEffect(() => {
    if (!slug) {
      setService(null);
      setLoading(false);
      return undefined;
    }

    setService(null);
    setLoading(true);
    let live = true;

    getService(slug).then((data) => {
      if (!live) return;
      setService(data);
      setLoading(false);
    });

    return () => {
      live = false;
    };
  }, [slug]);

  return { service, loading };
}
