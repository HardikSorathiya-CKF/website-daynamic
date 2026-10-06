import '../assets/css/home/Home.css';
import Hero from '../components/home/Hero';
import WhoWeAre from '../components/home/WhoWeAre';
import LazyWhenVisible from '../components/comman/LazyWhenVisible';
import { lazy, Suspense } from 'react';

const Services = lazy(() => import('../components/home/Services'));
const AboutCT = lazy(() => import('../components/home/Aboutct'));
const Bannerh = lazy(() => import('../components/home/Bannerh'));
const About = lazy(() => import('../components/home/About'));
const CaseStudies = lazy(() => import('../components/home/CaseStudies'));
const Faq = lazy(() => import('../components/home/Faq'));
const WorkTogether = lazy(() => import('../components/home/WorkTogether'));
const Clients = lazy(() => import('../components/home/Clients'));

function DeferredSection({ children, minHeight = 0 }) {
  return (
    <LazyWhenVisible minHeight={minHeight}>
      <Suspense fallback={null}>{children}</Suspense>
    </LazyWhenVisible>
  );
}

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <WhoWeAre />
      <DeferredSection minHeight={520}>
        <Services />
      </DeferredSection>
      <DeferredSection minHeight={360}>
        <AboutCT />
      </DeferredSection>
      <DeferredSection minHeight={280}>
        <Bannerh />
      </DeferredSection>
      <DeferredSection minHeight={420}>
        <About />
      </DeferredSection>
      <DeferredSection minHeight={420}>
        <CaseStudies />
      </DeferredSection>
      <DeferredSection minHeight={360}>
        <Faq />
      </DeferredSection>
      <DeferredSection minHeight={180}>
        <Clients />
      </DeferredSection>
      <DeferredSection minHeight={280}>
        <WorkTogether />
      </DeferredSection>
    </main>
  );
}
