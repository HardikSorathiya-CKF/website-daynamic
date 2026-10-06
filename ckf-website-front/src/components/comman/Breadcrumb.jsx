import { useLocation } from 'react-router-dom';
import { useRouteContent } from '../../api/page';
import '../../assets/css/comman/Breadcrumb.css';

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const page = useRouteContent(pathname);

  if (!page?.breadcrumbImage) {
    return null;
  }

  return (
    <section className="page-breadcrumb" aria-labelledby="page-breadcrumb-title">
      <img
        className="page-breadcrumb-image"
        src={page.breadcrumbImage}
        alt=""
        loading="eager"
        decoding="async"
      />
      <div className="page-breadcrumb-overlay" aria-hidden="true" />

      <div className="container page-breadcrumb-content">
        <p className="page-breadcrumb-label">{page.title}</p>
        <h1 id="page-breadcrumb-title" className="page-breadcrumb-title">
          {page.heading || page.subtitle || page.seoTitle || page.title}
        </h1>
      </div>
    </section>
  );
}
