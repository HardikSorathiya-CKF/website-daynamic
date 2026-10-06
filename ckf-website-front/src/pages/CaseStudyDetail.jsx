import { Navigate, useParams } from 'react-router-dom';
import Breadcrumb from '../components/comman/Breadcrumb';
import CaseStudyDetailContent from '../components/case-studies/CaseStudyDetailContent';
import { useCaseStudy } from '../api/caseStudy';

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const { study, loading } = useCaseStudy(slug);

  if (loading) return null;
  if (!study) return <Navigate to="/case-studies" replace />;

  return (
    <main className="case-study-detail-page">
      <Breadcrumb />
      <CaseStudyDetailContent study={study} />
    </main>
  );
}
