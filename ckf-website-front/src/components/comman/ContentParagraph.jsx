import { Link } from 'react-router-dom';
import { compareContentIcons } from '../icons/Icons';
import { parseStringParagraph } from '../../utils/parseContentParagraph';

function CompareRowIcon({ iconKey, variant, delay = 0 }) {
  const Icon = compareContentIcons[iconKey] ?? compareContentIcons[variant === 'new' ? 'pipeline' : 'clock'];
  return (
    <span
      className={`service-content-compare-icon service-content-compare-icon--${variant}`}
      style={{ '--compare-icon-delay': `${delay}s` }}
      aria-hidden="true"
    >
      <Icon />
    </span>
  );
}

export function renderSegments(segments) {
  return segments.map((segment, index) => {
    if (segment.href) {
      const isInternal = segment.href.startsWith('/');

      if (isInternal) {
        return (
          <Link key={`${segment.text}-${index}`} to={segment.href} className="service-inline-link">
            {segment.text}
          </Link>
        );
      }

      return (
        <a key={`${segment.text}-${index}`} href={segment.href} className="service-inline-link">
          {segment.text}
        </a>
      );
    }

    return <span key={`${segment.text.slice(0, 24)}-${index}`}>{segment.text}</span>;
  });
}

function StructuredContent({ content, compareAnimationIndex = 0 }) {
  if (content.type === 'compare') {
    const cardDelay = compareAnimationIndex * 0.15;

    return (
      <div
        className="service-content-compare"
        style={{ '--compare-card-delay': `${cardDelay}s` }}
      >
        <div className="service-content-compare-row">
          <div className="service-content-compare-copy">
            <span className="service-content-item-label mb-0">Old Way</span>
            <p className="service-detail-text mb-0">{content.oldWay}</p>
          </div>
          <CompareRowIcon iconKey={content.oldIcon} variant="old" delay={cardDelay} />
        </div>
        <div className="service-content-compare-row service-content-compare-row--new">
          <div className="service-content-compare-copy">
            <span className="service-content-item-label mb-0">New Way</span>
            <p className="service-detail-text mb-0">{content.newWay}</p>
          </div>
          <CompareRowIcon iconKey={content.newIcon} variant="new" delay={cardDelay + 0.2} />
        </div>
      </div>
    );
  }

  return (
    <div className="service-content-item">
      <h5 className="service-content-item-label">{content.label}</h5>
      {content.text && <p className="service-detail-text mb-0">{content.text}</p>}
      {content.subItems?.length > 0 && (
        <ul className="service-content-subitems">
          {content.subItems.map((subItem) => (
            <li key={subItem.label} className="service-content-subitem">
              <span className="service-content-subitem-label">{subItem.label}</span>
              <p className="service-detail-text mb-0">{subItem.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function RichText({ content, compareAnimationIndex }) {
  if (typeof content === 'string') {
    const parsed = parseStringParagraph(content);
    if (parsed) {
      return <StructuredContent content={parsed} compareAnimationIndex={compareAnimationIndex} />;
    }
    return content;
  }

  if (content?.segments?.length) {
    return renderSegments(content.segments);
  }

  if (content?.label || content?.type === 'compare') {
    return <StructuredContent content={content} compareAnimationIndex={compareAnimationIndex} />;
  }

  return null;
}

export default function ContentParagraph({
  content,
  className = 'service-detail-text mb-0',
  compareAnimationIndex,
}) {
  if (content?.segments?.length) {
    return <p className={className}>{renderSegments(content.segments)}</p>;
  }

  if (typeof content === 'string') {
    const parsed = parseStringParagraph(content);
    if (parsed) {
      return (
        <ContentParagraph
          content={parsed}
          className={className}
          compareAnimationIndex={compareAnimationIndex}
        />
      );
    }
    return <p className={className}>{content}</p>;
  }

  if (content?.label || content?.type === 'compare') {
    return <StructuredContent content={content} compareAnimationIndex={compareAnimationIndex} />;
  }

  return null;
}
