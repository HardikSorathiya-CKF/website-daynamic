import Breadcrumb from '../components/comman/Breadcrumb';
import AboutSection from '../components/about/About';
import AboutMVO from '../components/about/AboutMVO';
import AboutStats from '../components/about/AboutStats';
import WhyUs from '../components/about/WhyUs';

export default function AboutPage() {
  return (
    <main className="about-page">
      <Breadcrumb />
      <AboutSection />
      <AboutMVO />
      <AboutStats />
      <WhyUs />
    </main>
  );
}
