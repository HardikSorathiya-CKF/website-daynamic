import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Home = lazy(() => import('../pages/Home'));
const AboutPage = lazy(() => import('../pages/About'));
const ContactPage = lazy(() => import('../pages/Contact'));
const ServicesPage = lazy(() => import('../pages/Service'));
const ServiceDetailPage = lazy(() => import('../pages/ServiceDetail'));
const CaseStudiesPage = lazy(() => import('../pages/CaseStudies'));
const CaseStudyDetailPage = lazy(() => import('../pages/CaseStudyDetail'));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/technology/:slug" element={<ServiceDetailPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
