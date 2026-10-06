import cognesolLogo from '../../assets/images/home/cognesol.webp';
import satinLogo from '../../assets/images/home/satin.webp';

const clients = [
  { id: 'cognesol', image: cognesolLogo, alt: 'Cogneesol' },
  { id: 'satin', image: satinLogo, alt: 'Satin' },
];

const marqueeLogos = [...clients, ...clients, ...clients, ...clients];
const marqueeTrack = [...marqueeLogos, ...marqueeLogos];

export default function Clients() {
  return (
    <section className="clients-section py-5" aria-labelledby="clients-title">
      <div className="container text-center mb-4">
        <h2 id="clients-title" className="clients-heading mb-0">
          Our Clients
        </h2>
      </div>

      <div className="clients-marquee overflow-hidden">
        <div className="clients-marquee-track d-flex align-items-center">
          {marqueeTrack.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="client-logo-item flex-shrink-0"
            >
              <img src={client.image} alt={client.alt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
