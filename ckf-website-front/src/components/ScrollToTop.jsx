import { useEffect, useState } from 'react';
import { IconChevronUp } from './icons/Icons';
import { scrollToTop, subscribeScroll } from '../utils/scrollApi';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => subscribeScroll((y) => setVisible(y > 300)), []);

  return (
    <button
      type="button"
      className={`scroll-to-top${visible ? ' is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <IconChevronUp aria-hidden="true" />
    </button>
  );
}
