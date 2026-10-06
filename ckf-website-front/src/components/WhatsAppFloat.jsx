import { IconWhatsapp } from './icons/Icons';
import './WhatsAppFloat.css';

const WHATSAPP_URL = 'https://wa.me/919650792424';

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <IconWhatsapp aria-hidden="true" />
    </a>
  );
}
