import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import WhatsAppFloat from '../components/WhatsAppFloat';
import Seo from '../components/comman/Seo';
import { useParallax } from '../utils/useParallax';
import { useSmoothScroll } from '../utils/useSmoothScroll';

export default function MainLayout() {
  const { pathname } = useLocation();
  useSmoothScroll(pathname);
  useParallax(pathname);

  return (
    <>
      <Seo />
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
      <WhatsAppFloat />
    </>
  );
}
