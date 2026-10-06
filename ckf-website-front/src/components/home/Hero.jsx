import { useCallback, useEffect, useRef, useState } from 'react';
import heroImage from '../../assets/images/home/webdevelopment.webp';
import Image2 from '../../assets/images/home/awshero.webp';
import Image3 from '../../assets/images/home/appdevelopment.webp';
import Image4 from '../../assets/images/home/crmdevelopment.webp';
import Image6 from '../../assets/images/home/internship.webp';
import { preloadImage } from '../../utils/preloadImage';
import '../../assets/css/home/Hero.css';

const heroLcpImage = '/images/home/hero-lcp.webp';

const slides = [
  { src: heroLcpImage, alt: 'AI-powered solutions' },
  { src: Image2, alt: 'AWS cloud solutions' },
  { src: Image4, alt: 'CRM development services' },
  { src: heroImage, alt: 'Web development services by CloudKodeForm' },
  { src: Image3, alt: 'Application development' },
  { src: Image6, alt: 'Internship and training programs' },
];

const BOX_COLS = 6;
const BOX_ROWS = 5;
const AUTOPLAY_MS = 10000;
const BOX_ANIM_MS = 1000;
const COL_STAGGER_MS = 110;
const ROW_STAGGER_MS = 16;
const MAX_STAGGER_MS =
  (BOX_COLS - 1) * COL_STAGGER_MS + (BOX_ROWS - 1) * ROW_STAGGER_MS;
const GRID_FADE_MS = 200;
const REVEAL_MS = MAX_STAGGER_MS + BOX_ANIM_MS;
const TRANSITION_MS = REVEAL_MS + GRID_FADE_MS;

function getBoxDelay(col, row, direction) {
  const orderedCol = direction >= 0 ? col : BOX_COLS - 1 - col;
  return orderedCol * COL_STAGGER_MS + row * ROW_STAGGER_MS;
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [boxesAnimating, setBoxesAnimating] = useState(false);
  const [gridHidden, setGridHidden] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const transitionLock = useRef(false);
  const timersRef = useRef([]);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    preloadImage(slides[0].src);

    const schedule =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb) => window.setTimeout(cb, 1200);

    const scheduleId = schedule(() => {
      slides.slice(1).forEach(({ src }) => preloadImage(src));
    });

    return () => {
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(scheduleId);
      } else {
        window.clearTimeout(scheduleId);
      }
    };
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const goToSlide = useCallback(
    (targetIndex) => {
      if (transitionLock.current || targetIndex === activeIndex) return;

      const slideCount = slides.length;
      const forwardSteps = (targetIndex - activeIndex + slideCount) % slideCount;
      const backwardSteps = (activeIndex - targetIndex + slideCount) % slideCount;
      const nextDirection = forwardSteps <= backwardSteps ? 1 : -1;

      clearTimers();
      transitionLock.current = true;
      setDirection(nextDirection);
      setIncomingIndex(targetIndex);
      setGridHidden(false);

      if (prefersReducedMotion.current) {
        setActiveIndex(targetIndex);
        setIncomingIndex(null);
        transitionLock.current = false;
        return;
      }

      setIsTransitioning(true);
      setBoxesAnimating(false);

      timersRef.current.push(
        window.setTimeout(() => setGridHidden(true), REVEAL_MS),
      );
      timersRef.current.push(
        window.setTimeout(() => {
          setActiveIndex(targetIndex);
          setIsTransitioning(false);
          setBoxesAnimating(false);
          setGridHidden(false);
          setIncomingIndex(null);
          transitionLock.current = false;
        }, TRANSITION_MS),
      );
    },
    [activeIndex, clearTimers],
  );

  useEffect(() => {
    if (!isTransitioning) return undefined;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setBoxesAnimating(true));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isTransitioning, incomingIndex]);

  const goNext = useCallback(() => {
    goToSlide((activeIndex + 1) % slides.length);
  }, [activeIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((activeIndex - 1 + slides.length) % slides.length);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (isPaused || isTransitioning) return undefined;

    const timer = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused, isTransitioning, activeIndex]);

  const currentSlide = slides[activeIndex];
  const incomingSlide =
    incomingIndex !== null ? slides[incomingIndex] : currentSlide;
  const displaySlide = isTransitioning ? incomingSlide : currentSlide;

  return (
    <section
      className="hero-section"
      aria-label="Hero slider"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-slider">
        <img
          className={`hero-slide-img${
            isTransitioning ? ' hero-slide-img--revealing' : ''
          }`}
          src={displaySlide.src}
          alt={displaySlide.alt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={810}
          style={
            isTransitioning ? { '--reveal-ms': `${REVEAL_MS}ms` } : undefined
          }
        />

        {isTransitioning && (
          <div
            className={`hero-boxes-grid${boxesAnimating ? ' is-animating' : ''}${
              gridHidden ? ' is-hidden' : ''
            }${direction < 0 ? ' is-reverse' : ''}`}
            style={{
              '--box-cols': BOX_COLS,
              '--box-rows': BOX_ROWS,
              '--box-anim-ms': `${BOX_ANIM_MS}ms`,
              '--grid-fade-ms': `${GRID_FADE_MS}ms`,
              gridTemplateColumns: `repeat(${BOX_COLS}, 1fr)`,
              gridTemplateRows: `repeat(${BOX_ROWS}, 1fr)`,
            }}
            aria-hidden="true"
          >
            {Array.from({ length: BOX_COLS * BOX_ROWS }, (_, index) => {
              const col = index % BOX_COLS;
              const row = Math.floor(index / BOX_COLS);

              return (
                <div
                  key={`${activeIndex}-${col}-${row}`}
                  className="hero-box"
                  style={{
                    '--box-delay': `${getBoxDelay(col, row, direction)}ms`,
                  }}
                >
                  <img
                    className="hero-box-img"
                    src={currentSlide.src}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    style={{ '--box-col': col, '--box-row': row }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        type="button"
        className="hero-arrow hero-arrow--prev"
        aria-label="Previous slide"
        onClick={goPrev}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow--next"
        aria-label="Next slide"
        onClick={goNext}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path fill="currentColor" d="m10 6-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>

      <div className="hero-pagination" role="tablist" aria-label="Hero slides">
        {slides.map((slide, index) => (
          <button
            key={slide.alt}
            type="button"
            role="tab"
            className={`hero-pagination-bullet${index === activeIndex ? ' is-active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === activeIndex}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
