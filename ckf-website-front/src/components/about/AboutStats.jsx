import { useEffect, useRef, useState } from 'react';
import '../../assets/css/About.css';

const stats = [
  {
    value: 92,
    suffix: '%',
    title: 'Client Satisfaction',
    text: 'Clients report improved efficiency and confidence after working with our team.',
  },
  {
    value: 88,
    suffix: '%',
    title: 'Project Success Rate',
    text: 'Projects delivered on time with quality solutions tailored to business goals.',
  },
  {
    value: 82,
    suffix: '%',
    title: 'Long-Term Partnerships',
    text: 'Businesses continue with us for support, upgrades, and ongoing innovation.',
  },
];

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;
        const start = performance.now();
        const duration = 1800;

        const animate = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          setCount(Math.round(progress * value));
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="about-stat-value">
      {count}
      {suffix}
    </span>
  );
}

export default function AboutStats() {
  return (
    <section className="about-stats-section" aria-label="Company statistics">
      <div className="container">
        <div className="row g-4 g-lg-5 text-center">
          {stats.map((item) => (
            <div key={item.title} className="col-md-4">
              <Counter value={item.value} suffix={item.suffix} />
              <h3 className="about-stat-title">{item.title}</h3>
              <p className="about-stat-text mb-0">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
