import Breadcrumb from '../components/comman/Breadcrumb';
import ServiceList from '../components/services/ServiceList';

export default function ServicesPage() {
  return (
    <main className="services-page">
      <Breadcrumb />
      <ServiceList />
    </main>
  );
}
