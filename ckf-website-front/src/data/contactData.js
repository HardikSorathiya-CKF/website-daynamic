import contactBg from '../assets/images/common/contact.webp';

export const contactContent = {
  subtitle: 'Contact Us',
  title: 'Let’s Build Something Great Together',
  description:
    'Have a project in mind or need expert guidance? Reach out to our team and we’ll get back to you shortly.',
  backgroundImage: contactBg,
};

export const contactDetails = [
  {
    id: 'phone',
    type: 'phone',
    phones: [
      { label: '+91 96507 92424', href: 'tel:+919650792424' },
      { label: '06112-32966090', href: 'tel:+91611232966090' },
    ],
  },
  {
    id: 'email',
    type: 'email',
    label: 'info@cloudkodeform.com',
    href: 'mailto:info@cloudkodeform.com',
  },
  {
    id: 'address-mau',
    type: 'address',
    label: 'Mau, Uttar Pradesh, India - 221603',
    href: 'https://maps.app.goo.gl/EQw6Zu62owxgrEFr5',
  },
  {
    id: 'address-rajgir',
    type: 'address',
    label: 'Panditpur, Nr. Hanuman Mandir, Rajgir, Bihar, India',
    href: 'https://www.google.com/maps/search/?api=1&query=Panditpur,+Nr.+Hanuman+Mandir,+Rajgir,+Bihar,+India',
  },
];

export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61566566795061' },
  { label: 'Twitter', href: 'https://x.com/cloudkodeform' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cloudkodeform-technologies/' },
  { label: 'Instagram', href: 'https://www.instagram.com/cloudkodeform/?hl=en' },
];

export const branches = [
  {
    id: 1,
    name: 'Head Office',
    city: 'Mau, Uttar Pradesh',
    address: 'Mau, Uttar Pradesh, India - 221603',
    phone: '+91 96507 92424',
    phoneHref: 'tel:+919650792424',
  },
  {
    id: 2,
    name: 'Branch Office',
    city: 'Rajgir, Bihar',
    address: 'Panditpur, Nr. Hanuman Mandir, Rajgir, Bihar, India',
    phone: '06112-32966090',
    phoneHref: 'tel:+91611232966090',
  },
];
