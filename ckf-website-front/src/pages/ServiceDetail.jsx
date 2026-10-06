import { Navigate, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../components/comman/Breadcrumb';
import CaseStudyDetailContent from '../components/case-studies/CaseStudyDetailContent';
import { useService } from '../api/service';

const SLUG_ALIASES = {
  'cloud-services': 'cloudservice',
  'devops-solutions': 'devops',
  'microservices-architecture': 'micro',
  'artificial-intelligence': 'aiml',
};

const TECHNOLOGY_SLUGS = new Set(['aiml']);

function getCanonicalPath(slug) {
  if (TECHNOLOGY_SLUGS.has(slug)) {
    return `/technology/${slug}`;
  }

  return `/services/${slug}`;
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const canonicalSlug = SLUG_ALIASES[slug] ?? slug;
  const canonicalPath = getCanonicalPath(canonicalSlug);
  const { service, loading } = useService(pathname === canonicalPath ? canonicalSlug : '');

  if (pathname !== canonicalPath) {
    return <Navigate to={canonicalPath} replace />;
  }

  if (loading) return null;
  if (!service) return <Navigate to="/services" replace />;

  return (
    <main className="service-detail-page">
      <Breadcrumb />
      <CaseStudyDetailContent
        study={{
          title: service.heading || service.title,
          description: service.content,
        }}
      />
    </main>
  );
}
