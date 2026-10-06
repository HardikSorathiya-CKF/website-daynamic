import Image1 from '../assets/images/home/hero1.webp';
import CloudImage from '../assets/images/services/cloud1.webp';
import ApplicationImage from '../assets/images/services/appdevelopmentservice1.webp';
import SystemMigrationImage from '../assets/images/services/migration1.webp';
import devOpsImage from '../assets/images/services/devops1.webp';
import Imageai from '../assets/images/services/aiservice1.webp';
import MicroservicesImage from '../assets/images/services/microservices1.webp';
import Image8 from '../assets/images/home/about.webp';
import InternshipImage from '../assets/images/services/internship1.webp';
import ItConsultingImage from '../assets/images/services/itsupport1.webp';
import Imageux from '../assets/images/services/uiux1.webp';

export const serviceDetails = {
  'web-development': {
    slug: 'web-development',
    breadcrumbKey: 'web-development',
    intro: {
      title: 'Web Development Services Built for Performance, Not Just Appearances',
      description:
        'Your website isn\'t an art project—it\'s the engine behind your digital business. If it doesn\'t load instantly, display perfectly on mobile, and clearly show customers what you do, you are losing revenue to your competitors every day.',
      description2:
        'At CloudKodeForm Technologies, we skip the generic templates to build fast, secure, and reliable digital platforms. Based in India, our engineering team works with modern frameworks to deliver web applications that look sharp, run smoothly under heavy traffic, and scale as your business grows.',
      points: [
        'Responsive Architecture: Layouts that adjust instantly to smartphones, tablets, and laptops.',
        'Performance & SEO Focused: Clean, lightweight code designed to load fast and rank well on Google.',
        'Secure & Scalable: Enterprise-grade security frameworks built to protect your data and handle traffic spikes.',
      ],
    },
    image: Image1,
  },
  'application-development': {
    slug: 'application-development',
    breadcrumbKey: 'application-development',
    intro: {
      title: 'Custom Application Development Services: We Build Apps That Solve Business Problems',
      description:
        'Let\'s be completely honest: building software isn\'t just about writing code. It\'s about making your business run smoother. A slow app, a glitchy checkout, or a system that crashes when too many people log in will drive your customers straight to your competitors. You don\'t need generic, off-the-shelf templates—you need reliable software that fits your exact workflow.',
      description2:
        'At CloudKodeForm Technologies, we focus on building digital tools that actually help your business grow. We don\'t do fluff, and we don\'t overcomplicate things with confusing tech jargon. As an experienced application development company in India, we handle everything from the initial design to the final cloud launch, making sure your software is secure, fast, and ready to scale.',
    },
    image: ApplicationImage,
  },
  cloudservice: {
    slug: 'cloudservice',
    breadcrumbKey: 'cloudservice',
    intro: {
      title: 'Cloud Infrastructure in Cloud Computing: Engineering for Scale',
      description:
        'A poorly configured server setup doesn\'t just slow down your application—it leaks revenue through unoptimized resource waste and creates massive security gaps. If you are evaluating cloud infrastructure in cloud computing, you need a setup that balances high-performance processing with a sustainable, predictable budget.',
      description2:
        'At CloudKodeForm Technologies, we skip the generic corporate talk. We design, deploy, and manage production-ready environments across the top cloud companies in India—including AWS, Azure, and Google Cloud. Whether your goal is to find the cheapest cloud service provider in India for basic raw compute, or you need complex automation from premier cloud infrastructure companies, we build systems that handle massive traffic spikes without breaking a sweat.',
      points: [
        'Scalable Architecture Design & Setup: We write clean, automated scripts to deploy public, private, and hybrid environments that scale seamlessly alongside your user growth.',
        'Strategic Cost Control & Audits: We actively stop budget bleeding—cleaning idle server slots, setting strict memory limits, and tuning auto-scaling rules to cut monthly hosting bills by up to 40%.',
        'High-Availability Performance: We align your application with the best-performing cloud server providers in India to drop latency, speed up page loads, and guarantee strict data sovereignty compliance.',
        'Modern App Development & Containers: We modernize your software with Docker and Kubernetes, setting up automated pipelines so your team can deploy updates safely with a single click.',
      ],
      footer: [
        'We make cloud adoption predictable, transparent, and secure. With CloudKodeForm Technologies, you aren\'t just moving your files to a remote server—you are building a stable, enterprise-grade digital asset.',
      ],
    },
    image: CloudImage,
  },
  aiml: {
    slug: 'aiml',
    breadcrumbKey: 'aiml',
    intro: {
      title: 'Smarter Solutions Begin with Intelligent Systems.',
      description:
        'At CloudKodeForm Technologies, we are a premier AI solutions provider company in India using artificial intelligence to transform data into decisions — helping businesses automate, optimize, and lead with confidence.',
      description2:
        'For modern enterprises, deploying advanced AI solutions and services is no longer optional — it\'s the driving force behind smarter business strategies, automated workflows, and deeper customer insights.',
      points: [
        'Machine learning models tailored to your domain using advanced MLOps frameworks',
        'NLP-driven chatbots, semantic search, and sentiment tools for real-time customer intent',
        'Predictive analytics for informed, data-backed enterprise decision-making',
        'Intelligent automation that actively streamlines complex operations and reduces overhead cost',
        'Seamless integration of AI systems with your existing cloud and data infrastructure',
      ],
      footer: [
        'Whether you\'re exploring an AI solutions website for the first time or scaling legacy models — our engineering experts in India guide you from initial concept to full production deployment. With CloudKodeForm Technologies, AI isn\'t just smart — it\'s strategic.',
      ],
    },
    image: Imageai,
  },
  'system-migration-integration': {
    slug: 'system-migration-integration',
    breadcrumbKey: 'system-migration-integration',
    intro: {
      title: 'Seamless System Migration & Modern Integration',
      description:
        'When a business grows, its software infrastructure eventually hits a wall. Systems that worked perfectly fine five years ago start slowing down, departments become isolated because their tools don\'t talk to each other, and keeping old setups alive starts draining your engineering budget.',
      description2:
        'Moving your systems isn\'t just about an IT upgrade; it\'s a business necessity to keep things fast, secure, and ready to scale. Shifting critical enterprise workflows, modernizing legacy software, and syncing complex data structures requires more than a simple file copy. It takes a practical, well-thought-out engineering approach to prevent data loss, avoid massive business downtime, and make sure your team can keep working without interruption.',
      points: [
        'Moving data out of legacy systems with clean, validated pipelines — not simple file copies',
        'Code migration for distributed cloud setups across AWS, Azure, or GCP',
        'Active process migration that keeps live user sessions running during the shift',
        'Full system tracking and monitoring from day one of the transition',
      ],
    },
    image: SystemMigrationImage,
  },
  devops: {
    slug: 'devops',
    breadcrumbKey: 'devops',
    intro: {
      title: 'High-Stakes DevOps: Engineering Infrastructure That Doesn\'t Break.',
      description:
        'At CloudKodeForm Technologies, we build resilient DevOps platforms that stay stable under real-world pressure, reduce developer friction, and keep cloud costs under control.',
      description2:
        'Let\'s be blunt: most cloud setups are a fragile web of band-aid scripts, custom YAML, and "hope." You\'ve probably seen the cycle before—a typical DevOps services company or general IT contractor comes in, sets up a handful of Jenkins pipelines, throws together some Terraform files, and hands over the keys. Six months down the line, your core developers are spending 30% of their work week debugging infrastructure and fixing failed builds instead of writing features. To make matters worse, your monthly cloud bill has bloated into a total, unpredictable mystery.',
      footer: [
        'At CloudKodeForm Technologies, we know that deployment "speed" is completely useless if your underlying infrastructure cannot withstand a massive traffic spike at 3:00 AM.',
        'In today\'s fast-paced cloud-native market, the hype surrounding "automation for the sake of automation" is officially over. True business value lies in resilience, predictability, and efficiency. If your software team is still manually provisioning staging environments, copying configuration files over SSH, or sweating during a major production release, your previous devops transformation services have simply failed to hit the mark. We are here to change that, transforming your infrastructure into a silent, invisible, and highly productive business asset through elite devops services.',
      ],
    },
    image: devOpsImage,
  },
  micro: {
    slug: 'micro',
    breadcrumbKey: 'micro',
    intro: {
      title: 'Simplify. Scale. Innovate — with Microservices Architecture.',
      description:
        'At CloudKodeForm Technologies, we break monolithic systems into modular, independent components that help your business build faster, run smoother, and scale smarter.',
      description2:
        'Microservices empower agility by allowing you to develop, deploy, and scale individual features without impacting your entire system.',
      points: [
        'Modular components for independent development & scaling',
        'Simplified testing and faster release cycles',
        'Improved fault isolation and system reliability',
        'Polyglot programming and tech stack flexibility',
        'Easy integration with APIs and third-party services',
      ],
      footer: [
        'We work with you to modernize your infrastructure step by step — ensuring performance, flexibility, and future-readiness. With CloudKodeForm, microservices fuel your digital evolution.',
      ],
    },
    image: MicroservicesImage,
  },
  'custom-software-development': {
    slug: 'custom-software-development',
    breadcrumbKey: 'custom-software-development',
    intro: {
      title: 'Custom Software Development Services',
      description:
        'We build custom software, mobile apps, and enterprise systems that scale with your business. Whether you need to fix a broken operational workflow, bring a new mobile product to market, or scale an engineering team with remote developers, we deliver clean, reliable code without the overhead.',
      description2:
        'Most off-the-shelf software forces you to change how your business runs just to fit their rigid layout. We don\'t believe in changing your workflows for an app. Instead, we build software around the exact way your team operates.',
      points: [
        'Custom software development services for web systems, dashboards, and consumer-facing tools',
        'Software development consulting services to choose the right stack before you spend on code',
        'AI software development to automate tasks and analyse customer behaviour data',
        'Bespoke software development tailored to your internal rules and unique supply chains',
      ],
      footer: [
        'As a dedicated custom software development company, CloudKodeform Technologies creates tailored digital tools that solve your specific operational bottlenecks. By basing our development hubs in major tech markets, we operate as a highly competitive custom software development company in India—delivering high-quality, secure code at a price point that makes financial sense for growing businesses.',
      ],
    },
    image: Image8,
  },
  'internship-programs': {
    slug: 'internship-programs',
    breadcrumbKey: 'internship-programs',
    intro: {
      title: 'Tech Internships at CloudKodeForm Technologies: Stop Doing Tutorials, Start Building Real Software',
      description:
        'Let\'s be honest for a second. Passing your college exams is great, but it doesn\'t automatically mean you are ready to write software for a real business. When tech companies hire, they don\'t look at your grades anymore. They want to know one simple thing: Can you actually code?',
      description2:
        'That is exactly why standard university courses can leave you feeling stuck. They teach you the theory, but they rarely show you how to handle a live system. We built CloudKodeForm Technologies to change that.',
      footer: [
        'Whether you need a flexible online internship for students that fits around your classes, or you want to find the most practical internship programs in India to jumpstart your career, we are here to help you build things that matter.',
      ],
    },
    image: InternshipImage,
  },
  'it-consulting-support': {
    slug: 'it-consulting-support',
    breadcrumbKey: 'it-consulting-support',
    intro: {
      title: 'Enterprise IT Consulting, System Migration & Integration Services',
      description:
        'Let\'s be honest: very few people look forward to a system migration. Moving your entire business operation from an old setup to a new cloud platform, or trying to force three different software systems to share data without breaking, is stressful. If it\'s done poorly, you end up with missing data, unexpected downtime, and a massive bill that you didn\'t plan for.',
      description2:
        'At CloudKodeForm Technologies, we handle the heavy lifting so you don\'t have to deal with the headache. As a practical it consulting services company, we don\'t just hand you a generic PDF report full of technical jargon and walk away. We get into the trenches with your team, audit your code, map out your data dependencies, and build a migration plan that actually works.',
      points: [
        'Move away from slow legacy servers without disrupting daily operations',
        'Connect CRM, accounting, and internal tools with secure custom APIs',
        'Modernize infrastructure with migration plans built for real business continuity',
        'it consulting and support services designed to make transitions invisible to customers',
      ],
    },
    image: ItConsultingImage,
  },
  'ui-ux-design': {
    slug: 'ui-ux-design',
    breadcrumbKey: 'ui-ux-design',
    intro: {
      title: 'Design Experiences Users Love — and Businesses Trust',
      description:
        'At CloudKodeform, we craft intuitive layouts that turn complex ideas into clear, engaging digital experiences across websites, web apps, and mobile products.',
      description2:
        'Great design is more than aesthetics. As a focused ui ux design agency, we know that an interface must guide users, reduce friction, and build trust. Every button placement and menu shift directly impacts your customer retention and brand perception.',
      points: [
        'In-depth user research and journey mapping',
        'Clear wireframes, clickable prototypes, and crisp visual layouts',
        'Complete user interface design services tailored for web and mobile screens',
        'Scalable design systems for consistent brand experiences',
        'Usability-focused layouts backed by our conversion rate optimization service',
      ],
      footer: [
        'We collaborate closely with your team to understand your audience, business goals, and technical setups—then design systems that feel completely effortless to use. Partner with CloudKodeform to turn your product layout into a real growth lever, with the backing of one of the top UI/UX companies in India.',
      ],
    },
    image: Imageux,
  },
};

export function getServiceDetail(slug) {
  return serviceDetails[slug] ?? null;
}
